import {
  useEffect,
  useState,
} from 'react';

import { ProductList } from './api/ProductList';
import { ProductListType } from './api/ProductList.type';
import Filter from './components/Filter';
import ProductCard from './components/ProductList/ProductCard';
import {
  clubTypes,
  places,
} from './constants/Filter';
import useFilter from './hooks/useFilter';
import useIntersect from './hooks/useIntersect';

const OFFSET = 10;
const FIRST_PAGE = 1;
function App() {
  type FilterKeyType = "place" | "type";
  const [initialProductList, setInitialProductList] = useState<
    Array<ProductListType>
  >([]);
  const [pageNumber, setPageNumber] = useState(FIRST_PAGE);
  const [filteredProductList, setFilteredProductList] = useState<
    Array<ProductListType>
  >([]);
  const { filterKeywords, onFilterKeywordsHandler, hasFilterKeywords } =
    useFilter();

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (OFFSET * pageNumber < filteredProductList.length) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  });

  useEffect(() => {
    const apiCall = async () => {
      const response = await ProductList.getProductList();
      if (response?.data) {
        setInitialProductList(response.data);
        setFilteredProductList(response.data);
      }
    };
    apiCall();
  }, []);
  // 적용버튼을 눌러서 적용되게 한다면 useCallback이나 useMemo으로 변경하기
  useEffect(() => {
    let newFilteredProductList = initialProductList;
    if (hasFilterKeywords) {
      newFilteredProductList = initialProductList.filter((productList) => {
        const existKeywords = Array.from(filterKeywords.keys()).filter(
          (keyword) =>
            filterKeywords
              .get(keyword)
              ?.has(productList.club[keyword as FilterKeyType])
        );
        if (existKeywords.length) return productList;
      });
    }
    setFilteredProductList(newFilteredProductList);
    setPageNumber(FIRST_PAGE);
  }, [filterKeywords, initialProductList, hasFilterKeywords]);

  const productListInView = <T,>(
    productList: T[],
    numberOfProducts: number
  ): T[] => productList.slice(0, numberOfProducts);

  return (
    <div className="App">
      <Filter
        filterName="place"
        filterList={places}
        onFilterKeywordsHandler={onFilterKeywordsHandler}
      />
      <Filter
        filterName="type"
        filterList={clubTypes}
        onFilterKeywordsHandler={onFilterKeywordsHandler}
      />
      {productListInView(filteredProductList, OFFSET * pageNumber).map(
        (product) => (
          <ProductCard key={product.club.id} product={product} />
        )
      )}
      {/* TODO: 리스트가 없을 때 발생할 수 있는 오류 해결 */}
      {filteredProductList.length && <div ref={ref}>observer</div>}
    </div>
  );
}

export default App;
