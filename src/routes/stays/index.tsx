import Footer from '@/components/footer'
import Header from '@/components/header'
import PageTitle from '@/components/page-title'
import { createFileRoute } from '@tanstack/react-router'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useRef, useMemo, useState, useEffect } from 'react'
import BookableCard from '@/components/bookable-card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import useBreakpoint from '@/hooks/useBreakpoint'

export const Route = createFileRoute('/stays/')({
  component: RouteComponent,
})

// Utility to chunk array into rows
function chunk<T>(array: T[], size: number): T[][] {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Hook to detect responsive columns matching Tailwind breakpoints
function useNumColumns() {
  const breakpoint = useBreakpoint()

  const numColumns = useMemo(() => {
    switch (breakpoint) {
      case 'xs':
      case 'xsPlus':
        return 1
      case 'sm':
        return 2
      case 'md':
        return 3
      case 'lg':
      case 'xl':
      case '2xl':
        return 4
      default:
        return 4
    }
  }, [breakpoint])

  return numColumns
}

// Example fetch function; replace with your API
async function fetchProperties({ pageParam = 1 }) {
  console.log("fetching page", pageParam)
  const res = await fetch(`https://api.oneclickstays.com/stays/search?page=${pageParam}&limit=16`)
  return await res.json();
}

function RouteComponent() {
  // Example infinite query; adjust queryKey, queryFn, getNextPageParam to your API
  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : null,
  })

  const properties = useMemo(() => data?.pages.flatMap((page) => page.stays) ?? [], [data])

  const numColumns = useNumColumns()
  const rows = useMemo(() => chunk(properties, numColumns), [properties, numColumns])

  const parentRef = useRef<HTMLDivElement>(null)
  const [scrollMargin, setScrollMargin] = useState(0)

  useEffect(() => {
    if (parentRef.current) {
      setScrollMargin(parentRef.current.getBoundingClientRect().top)
    }
  }, [])

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    // getScrollElement: () => document.documentElement,
    estimateSize: () => 500, // Rough estimate; actual measured if using measureElement
    overscan: 1,
    paddingEnd: 16,
    // scrollMargin,
    gap: 16
    // For dynamic row heights (recommended if card content varies)
    // measureElement: (el) => el.getBoundingClientRect().height,
  })

  // Infinite scroll trigger
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems()
    const lastVirtualRow = virtualItems[virtualItems.length - 1]
    if (!lastVirtualRow) return

    if (
      lastVirtualRow.index >= rows.length - (numColumns % 5) && // Adjust threshold as needed
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, rowVirtualizer.getVirtualItems(), rows.length])

  return (
    <>
      <Header filterSheetSide={numColumns > 2 ? 'right' : 'bottom'} />
      <div className="px-4 pt-12 pb-16 lg:px-22">
        <PageTitle className="mb-3">Lowest Prices. <br className="sm:hidden" /> Guaranteed.</PageTitle>
        <p className="text-muted-foreground sm:max-w-[65ch] mx-auto text-center mb-12">Find the perfect stay for every occassion.</p>
        <div ref={parentRef} className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
                {rows[virtualRow.index].map((property) => (
                  <BookableCard key={property._id} item={property} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {(isFetching || isFetchingNextPage) && <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
          {new Array(numColumns * 4).fill(0).map((_) => <Skeleton key={Math.random()} className='h-[500px] w-full' />)}
        </div>}
      </div>
      <Footer />
    </>
  )
}