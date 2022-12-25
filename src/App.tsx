import { useEffect, useRef, useState } from 'react'

import { ProductList } from './api/ProductList'
import ProductCard from './components/ProductList/ProductCard'
import SearchBar from './components/SearchBar'
import useIntersect from './hooks/useIntersect'
import { useProductListContext } from './providers/ProductListProvider'
import { useInfiniteScroll } from './utils/infiniteScroll'

const OFFSET = 10
const FIRST_PAGE = 1
function App() {
  const [pageNumber, setPageNumber] = useState(FIRST_PAGE)
  const topEl = useRef(null)
  const bottomEl = useRef(null)

  const {
    setInitialProductList,
    filteredProductList,
    setFilteredProductList,
    initialProductList,
  } = useProductListContext()

  const { topObserver, bottomObserver } = useInfiniteScroll({
    listLength: initialProductList.length,
    page: pageNumber,
    updatePage: setPageNumber,
    apiCall: setFilteredProductList,
    topElement: topEl.current,
    bottomElement: bottomEl.current,
  })
  // const ref = useIntersect(async (entry, observer) => {
  //   observer.unobserve(entry.target)
  //   if (OFFSET * pageNumber < filteredProductList.length) {
  //     setPageNumber((prevPage) => prevPage + 1)
  //   }
  // })

  useEffect(() => {
    console.log('page', pageNumber)
  }, [pageNumber])
  useEffect(() => {
    const apiCall = async () => {
      const response = await ProductList.getProductList()
      if (response?.data) {
        setInitialProductList(response.data)
      }
    }
    apiCall()
  }, [])
  // page 1로 변경하는거는 filteredProductList 바뀌면 무조건 바뀌게 하자?? string으로 변환해서 비교하면 괜찮을수도?

  // 적용버튼을 눌러서 적용되게 한다면 useCallback이나 useMemo으로 변경하기
  // useEffect(() => {
  //   let newFilteredProductList = initialProductList;
  //   if (hasFilterKeywords) {
  //     newFilteredProductList = initialProductList.filter((productList) => {
  //       const existKeywords = Array.from(filterKeywords.keys()).filter(
  //         (keyword) =>
  //           filterKeywords
  //             .get(keyword)
  //             ?.has(productList.club[keyword as FilterKeyType])
  //       );
  //       if (existKeywords.length) return productList;
  //     });
  //   }
  //   setFilteredProductList(newFilteredProductList);
  //   setPageNumber(FIRST_PAGE);
  // }, [filterKeywords, initialProductList, hasFilterKeywords]);

  const productListInView = <T,>(
    productList: T[],
    numberOfProducts: number
  ): T[] => productList.slice(0, numberOfProducts)

  // const isSubString = (
  //   originString: string,
  //   compareString: string
  // ): boolean => {
  //   return originString.toLowerCase().includes(compareString);
  // };

  // const filterProductName = useCallback(
  //   (currentInput: string) => {
  //     // input이 empty string일때 filter만 적용된 값으로 다시 되돌려놔야 함
  //     const newFilteredProductList = filteredProductList.filter((product) =>
  //       isSubString(product.club.name, currentInput)
  //     );
  //     setFilteredProductList(newFilteredProductList);
  //   },
  //   [filteredProductList]
  // );

  return (
    <div className="App">
      <SearchBar />
      <div ref={topEl}></div>
      {productListInView(filteredProductList, OFFSET * pageNumber).map(
        (product) => (
          <ProductCard key={product.club.id} product={product} />
        )
      )}
      {/* TODO: 리스트가 없을 때 발생할 수 있는 오류 해결 */}
      {/* {filteredProductList.length > 0 && <div ref={ref}>observer</div>} */}
      {filteredProductList.length > 0 && <div ref={bottomEl}></div>}
    </div>
  )
}

export default App
