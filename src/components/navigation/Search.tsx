import { useState, useRef, type ChangeEvent, useEffect } from 'react'
import Fuse, { type FuseResult } from 'fuse.js'
import clsx from 'clsx'
import { type MarkdownRecord } from '@/types'
import SearchResults from '@/components/navigation/SearchResults'
import { type LanguageKeys, SEARCH } from '@/i18n/ui'

export default function Search({
  docs,
  lang,
}: {
  docs: MarkdownRecord[]
  lang: LanguageKeys
}) {
  const [isSearchActive, setIsSearchActive] = useState(false)
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

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={inputValue}
          className={clsx(
            "rounded-base backdrop-blur-xl border border-black/20 pl-12 pr-6 py-2 text-black/80 placeholder-black/60 transition-all duration-500 ease-out focus:outline-none dark:border-white/20 dark:text-white/80 dark:placeholder-white/60 w400:hidden",
            inputValue.length === 0 ? "w-32 bg-transparent hover:bg-white/90 hover:w-full" : "w-full bg-white/90",
            "dark:bg-transparent dark:hover:bg-black/90"
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
      </div>

      {/* Mobile search button */}
      <button
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
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

      {/* Dropdown results */}
      {isSearchActive && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-[100px] border border-black/20 dark:border-white/20 rounded-xl shadow-xl max-h-[400px] overflow-y-auto z-50 dark:bg-black/90">
          <div className="p-4">
            {matchedItems.length > 0 && !message && (
              <p className="mb-3 text-sm text-[#6b7280] dark:text-[#9ca3af]">
                {matchedItems.length} {SEARCH[lang].results}
              </p>
            )}
            <SearchResults message={message} matchedItems={matchedItems} />
          </div>
        </div>
      )}
    </div>
  )
}
