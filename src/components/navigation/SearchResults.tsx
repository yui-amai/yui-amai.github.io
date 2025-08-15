import type { MarkdownRecord } from '@/types'

export default function SearchResults({
  message,
  matchedItems,
}: {
  message: string | null
  matchedItems: MarkdownRecord[]
}) {
  return (
    <div className="mt-2 h-[calc(100%-60px)] w-full shrink rounded-base p-2">
      {message ? (
        <div className="mb-2 px-3 py-1">
          <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{message}</p>
        </div>
      ) : (
        <div className="search-list flex h-full w-full flex-col gap-0 overflow-y-auto p-0">
          {matchedItems.map((item, index) => {
            return (
              <div key={item.url}>
                <a
                  href={location.origin + item.url}
                  className="block w-full rounded-base p-2 transition-all hover:bg-black/10 dark:hover:bg-white/10 w600:p-1.5"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-base w600:text-sm">{item.title}</h4>
                    {item.lang && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.lang === 'jp' 
                          ? 'bg-[#C7D9DD] text-[#2D3748] dark:bg-[#2D6E7E] dark:text-[#e5e7eb]' 
                          : 'bg-[#ADB2D4] text-[#2D3748] dark:bg-[#9290C3] dark:text-[#e5e7eb]'
                      }`}>
                        {item.lang === 'jp' ? 'JP' : 'EN'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 opacity-80 text-xs w600:text-xs">
                    {item.description}
                  </p>
                </a>
                {index < matchedItems.length - 1 && (
                  <div className="mx-2 h-px bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
