import { useState, useRef, type ChangeEvent, useEffect } from 'react'
import Fuse, { type FuseResult } from 'fuse.js'
import clsx from 'clsx'
import { type MarkdownRecord } from '@/types'
import SearchResults from '@/components/navigation/SearchResults'
import { type LanguageKeys, SEARCH } from '@/i18n/ui'

export default function Search({
  docs,
  lang,
  onSearchStateChange,
}: {
  docs: MarkdownRecord[]
  lang: LanguageKeys
  onSearchStateChange?: (isSearching: boolean) => void
}) {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false)
  const [matchedItems, setMatchedItems] = useState<MarkdownRecord[]>([])
  const [message, setMessage] = useState<string | null>('')
  const [inputValue, setInputValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  // Debug: Log the docs data
  console.log('Search component docs:', docs)
  console.log('Search component lang:', lang)

  const options = {
    keys: ['title', 'description', 'content'],
    isCaseSensitive: false,
    threshold: 0.3, // Lower threshold for more accurate results
    ignoreLocation: true, // Search anywhere in the text
    useExtendedSearch: false,
    minMatchCharLength: 1, // Allow single character matches
    includeScore: true, // Include match scores for debugging
    includeMatches: true, // Include match details for debugging
  }

  const fuse = new Fuse(docs, options)

  // Custom search function for better Japanese support
  const customSearch = (query: string) => {
    const results: MarkdownRecord[] = []
    
    docs.forEach(doc => {
      const title = doc.title.toLowerCase()
      const description = doc.description.toLowerCase()
      const content = (doc.content || '').toLowerCase()
      const queryLower = query.toLowerCase()
      
      // Check if query appears in title, description, or content
      if (title.includes(queryLower) || description.includes(queryLower) || content.includes(queryLower)) {
        results.push(doc)
      }
      
      // For Japanese text, also check partial matches
      if (query.length >= 2) {
        // Check if any part of the query matches
        for (let i = 0; i <= query.length - 2; i++) {
          const partial = query.slice(i, i + 2).toLowerCase()
          if (title.includes(partial) || description.includes(partial) || content.includes(partial)) {
            if (!results.find(r => r.url === doc.url)) {
              results.push(doc)
            }
            break
          }
        }
      }
    })
    
    return results
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    console.log('Search input:', value, 'Length:', value.length) // Debug log
    console.log('Available docs:', docs.map(d => ({ 
      title: d.title, 
      description: d.description, 
      content: d.content,
      lang: d.lang,
      url: d.url 
    }))) // Debug log

    if (value.length === 0) {
      setMatchedItems([])
      if (message) setMessage(null)
      setIsSearchActive(false)
    } else if (value.length > 0 && value.length < 3) {
      setMessage(SEARCH[lang].keepTyping)
      setIsSearchActive(true)
    } else {
      try {
        // Try Fuse.js first
        let searchResult: FuseResult<MarkdownRecord>[] = fuse.search(value)
        console.log('Fuse.js results:', searchResult) // Debug log
        
        // If Fuse.js returns no results, try custom search
        if (searchResult.length === 0) {
          console.log('Fuse.js returned no results, trying custom search...') // Debug log
          const customResults = customSearch(value)
          console.log('Custom search results:', customResults) // Debug log
          
          if (customResults.length > 0) {
            setMatchedItems(customResults)
            setMessage(null)
            setIsSearchActive(true)
            return
          }
        }
        
        // Use Fuse.js results if available, but with stricter filtering
        const filteredResults = searchResult.filter(result => {
          // Only include results with good match scores
          if (!result.score) return false
          
          // For exact matches, include them
          if (result.score === 0) return true
          
          // For partial matches, only include if score is good enough
          return result.score < 0.4
        })
        
        console.log('Filtered Fuse.js results:', filteredResults) // Debug log
        
        const items: MarkdownRecord[] = filteredResults.map((result) => result.item)
        setMatchedItems(items)

        if (items.length === 0) {
          setMessage(SEARCH[lang].noResults)
        } else {
          setMessage(null)
        }
        setIsSearchActive(true)
      } catch (error) {
        console.error('Search error:', error) // Debug log
        // Fallback to custom search
        const customResults = customSearch(value)
        if (customResults.length > 0) {
          setMatchedItems(customResults)
          setMessage(null)
        } else {
          setMessage(SEARCH[lang].noResults)
        }
        setIsSearchActive(true)
      }
    }
  }

  const handleInputFocus = () => {
    if (inputValue.length > 0) {
      setIsSearchActive(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setIsSearchActive(false)
    }, 200)
  }

  const closeMobileSearch = () => {
    setIsMobileSearchExpanded(false)
    setIsSearchActive(false)
    setInputValue('')
    setMatchedItems([])
  }

  // Notify parent component about search state changes
  useEffect(() => {
    // Dispatch custom event for MobileNav to listen to
    const event = new CustomEvent('searchStateChange', {
      detail: { isSearching: isMobileSearchExpanded }
    })
    window.dispatchEvent(event)
    
    // Also call the callback if provided
    if (onSearchStateChange) {
      onSearchStateChange(isMobileSearchExpanded)
    }
  }, [isMobileSearchExpanded, onSearchStateChange])

  // Also dispatch search state for desktop overlay
  useEffect(() => {
    const event = new CustomEvent('searchStateChange', {
      detail: { isSearching: isSearchActive }
    })
    window.dispatchEvent(event)
    
    // Populate desktop search results if available
    if (isSearchActive && (window as any).populateDesktopSearchResults) {
      (window as any).populateDesktopSearchResults(matchedItems, message, lang)
    }
  }, [isSearchActive, matchedItems, message, lang])

  // Render search results in mobile search results area
  useEffect(() => {
    if (isMobileSearchExpanded && isSearchActive) {
      const searchResultsArea = document.getElementById('mobile-search-results')
      if (searchResultsArea) {
        // Clear previous content
        searchResultsArea.innerHTML = ''
        
        // Create results container
        const resultsContainer = document.createElement('div')
        resultsContainer.className = 'w-full h-[calc(100dvh-188px)] overflow-y-auto p-4'
        
        // Add results count if available
        if (matchedItems.length > 0 && !message) {
          const countElement = document.createElement('p')
          countElement.className = 'mb-3 text-base text-[#6b7280] dark:text-[#9ca3af]'
          countElement.textContent = `${matchedItems.length} ${SEARCH[lang].results}`
          resultsContainer.appendChild(countElement)
        }
        
        // Add search results
        const searchResultsElement = document.createElement('div')
        // For now, just show a simple list of results
        if (matchedItems.length > 0) {
          matchedItems.forEach(item => {
            const resultItem = document.createElement('div')
            resultItem.className = 'p-3 border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-all duration-200'
            resultItem.innerHTML = `
              <div class="flex items-center gap-2">
                <h3 class="font-medium text-black/80 dark:text-white/80">${item.title}</h3>
                ${item.lang ? `<span class="text-xs px-2 py-1 rounded-full ${
                  item.lang === 'jp' 
                    ? 'bg-[#C7D9DD] text-[#2D3748] dark:bg-[#2D6E7E] dark:text-[#e5e7eb]' 
                    : 'bg-[#ADB2D4] text-[#2D3748] dark:bg-[#9290C3] dark:text-[#e5e7eb]'
                }">${item.lang === 'jp' ? 'JP' : 'EN'}</span>` : ''}
              </div>
              <p class="text-sm text-black/60 dark:text-white/60 mt-1">${item.description}</p>
            `
            
            // Add hover effect with rounded corners
            resultItem.addEventListener('mouseenter', () => {
              resultItem.classList.add('rounded-lg', 'bg-black/5', 'dark:bg-white/5')
            })
            
            resultItem.addEventListener('mouseleave', () => {
              resultItem.classList.remove('rounded-lg', 'bg-black/5', 'dark:bg-white/5')
            })
            
            resultItem.addEventListener('click', () => {
              window.location.href = item.url || '#'
            })
            resultsContainer.appendChild(resultItem)
          })
        } else if (message) {
          const messageElement = document.createElement('p')
          messageElement.className = 'text-center text-base text-black/60 dark:text-white/60 py-8'
          messageElement.textContent = message
          resultsContainer.appendChild(messageElement)
        }
        
        searchResultsArea.appendChild(resultsContainer)
      }
    }
  }, [isMobileSearchExpanded, isSearchActive, matchedItems, message, lang])

  return (
    <>
      {/* Desktop search input */}
      <div className="relative w-full w400:hidden">
        <div className="relative">
          <input
            ref={inputRef}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={inputValue}
            className={clsx(
              "rounded-base backdrop-blur-xl border border-black/20 pl-12 pr-6 py-2 text-black/80 placeholder-black/60 transition-all duration-500 ease-out focus:outline-none dark:border-white/20 dark:text-white/80 dark:placeholder-white/60",
              inputValue.length === 0 ? "w-32 bg-transparent hover:bg-black/5 hover:w-3/4" : "w-3/4 bg-black/5",
              "dark:bg-transparent dark:hover:bg-white/5"
            )}
            placeholder={SEARCH[lang].search}
            type="text"
          />
          {/* Search icon inside input - positioned to the left */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg 
              className="h-4 w-4 text-[#6b7280] dark:text-[#9ca3af]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          {/* Close button (X) - positioned to the right, only visible when there's text */}
          {inputValue.length > 0 && (
            <button
              onClick={() => {
                setInputValue('')
                setMatchedItems([])
                setMessage(null)
                setIsSearchActive(false)
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300/50 hover:bg-gray-400/70 dark:bg-gray-600/50 dark:hover:bg-gray-500/70 transition-all duration-200 ease-out hover:scale-110 active:scale-95"
              aria-label="Clear search"
            >
              <svg className="h-3 w-3 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Desktop dropdown results - completely hidden to show only fullscreen results */}
      </div>

      {/* Mobile search button */}
      {!isMobileSearchExpanded && (
        <button
          onClick={() => setIsMobileSearchExpanded(true)}
          className="hidden w400:inline-block"
        >
          <svg 
            className="h-5 w-5 text-black/80 dark:text-white/80" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      )}

      {/* Mobile expanded search bar */}
      {isMobileSearchExpanded && (
        <div className="hidden w400:flex items-center w-full gap-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={inputValue}
              className={clsx(
                "w-full rounded-lg border border-black/20 dark:border-white/20 pl-10 pr-4 py-2 text-base text-black/80 dark:text-white/80 placeholder-black/60 dark:placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ease-out",
                inputValue.length === 0 ? "bg-white/30 dark:bg-black/30 hover:bg-black/5 dark:hover:bg-white/5" : "bg-white/5 dark:bg-black/5"
              )}
              placeholder={SEARCH[lang].search}
              type="text"
              autoFocus
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="h-4 w-4 text-[#6b7280] dark:text-[#9ca3af]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
          
          {/* Clear button (X) for mobile - positioned outside the search input, clears content and closes search */}
          {inputValue.length > 0 && (
            <button
              onClick={() => {
                setInputValue('')
                setMatchedItems([])
                setMessage(null)
                setIsSearchActive(false)
                closeMobileSearch()
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300/50 hover:bg-gray-400/70 dark:bg-gray-600/50 dark:hover:bg-gray-500/70 transition-all duration-200 ease-out hover:scale-110 active:scale-95"
              aria-label="Clear search and close"
            >
              <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
          
          {/* Close mobile search button - only shown when no text to clear */}
          {inputValue.length === 0 && (
            <button
              onClick={closeMobileSearch}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300/50 hover:bg-gray-400/70 dark:bg-gray-600/50 dark:hover:bg-gray-500/70 transition-all duration-200 ease-out hover:scale-110 active:scale-95"
              aria-label="Close search"
            >
              <svg className="h-4 w-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
