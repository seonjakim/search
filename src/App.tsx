import './App.css';

import {
  useEffect,
  useState,
} from 'react';

import { ProductList } from './api/ProductList';
import { ProductListType } from './api/ProductList.type';
import Filter from './components/Filter';
import {
  clubTypes,
  places,
} from './constants/Filter';
import useFilter from './hooks/useFilter';
import useIntersect from './hooks/useIntersect';

const OFFSET = 10;
function App() {
  type FilterKeyType = "place" | "type";
  const [initialProductList, setInitialProductList] = useState<
    Array<ProductListType>
  >([]);
  const [page, setPage] = useState(1);
  const [filteredProductList, setFilteredProductList] = useState<
    Array<ProductListType>
  >([]);
  const {
    filterKeywords,
    onFilterKeywordsHandler,
    hasFilterKeywords,
    filterKeywordsKeys,
  } = useFilter();

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (OFFSET * page < filteredProductList.length) {
      setPage((prev) => prev + 1);
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
  useEffect(() => {
    let newFilteredProductList = initialProductList;
    if (hasFilterKeywords) {
      newFilteredProductList = initialProductList.filter((productList) => {
        const existKeywords = filterKeywordsKeys.filter((keyword) =>
          filterKeywords
            .get(keyword)
            ?.has(productList.club[keyword as FilterKeyType])
        );
        if (existKeywords.length) return productList;
      });
    }
    setFilteredProductList(newFilteredProductList);
    setPage(1);
  }, [filterKeywords]);

  const productListInView = <T,>(
    productList: T[],
    numberOfProduct: number
  ): T[] => productList.slice(0, numberOfProduct);

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
      {productListInView(filteredProductList, OFFSET * page).map((el, i) => (
        <div style={{ width: "80vw", border: "1px solid red" }} key={i}>
          {JSON.stringify(el)}
        </div>
      ))}
      {/* TODO: 리스트가 없을 때 발생할 수 있는 오류 해결 */}
      {filteredProductList.length && <div ref={ref}>observer</div>}
    </div>
  );
}

export default App;
