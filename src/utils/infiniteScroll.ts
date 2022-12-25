interface InfiniteScrollProps {
  listLength: number
  page: number
  updatePage: any
  apiCall: unknown
  topElement: HTMLElement | null
  bottomElement: HTMLElement | null
}

export function useInfiniteScroll({
  listLength,
  page,
  updatePage,
  apiCall,
  topElement,
  bottomElement,
}: InfiniteScrollProps) {
  let topObserver
  let bottomObserver

  if (topElement && page > 2 && !topObserver) {
    topObserver = new IntersectionObserver((entries) => {
      const firstElement = entries[0]
      if (firstElement.isIntersecting) updatePage(page - 1)
    })
    topObserver.observe(topElement)
  }

  if (bottomElement) {
    bottomObserver = new IntersectionObserver((entries) => {
      const lastElement = entries[0]

      if (lastElement.isIntersecting) updatePage(page + 1)
    })
    bottomObserver.observe(bottomElement)
  }

  return { topObserver, bottomObserver }
}
