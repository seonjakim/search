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
  const [count, setCount] = useState<Array<ProductListType>>([]);
  const [page, setPage] = useState(1);
  const [selectedList, setSelectedList] = useState<Array<ProductListType>>([]);
  const { filter, filterHandler } = useFilter();

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    // TODO: 총 리스트 숫자 이상 넘지 않도록!
    setPage((prev) => prev + 1);
  });

  useEffect(() => {
    const apiCall = async () => {
      const response = await ProductList.getProductList();
      if (response?.data) {
        setCount(response.data);
        setSelectedList(response.data);
      }
    };
    apiCall();
  }, []);

  useEffect(() => {
    if (filter.size) {
      const newList = count.filter((data) => {
        for (let key of filter.keys()) {
          const selectedValue = filter.get(key);
          if (
            selectedValue &&
            selectedValue.has(data.club[key as FilterKeyType])
          )
            return data;
        }
      });
      setSelectedList(newList);
    } else {
      setSelectedList(count);
    }
    setPage(1);
  }, [filter]);

  return (
    <div className="App">
      <Filter
        filterName="place"
        filterList={places}
        filterHandler={filterHandler}
      />
      <Filter
        filterName="type"
        filterList={clubTypes}
        filterHandler={filterHandler}
      />
      {selectedList.slice(0, OFFSET * page).map((el, i) => (
        <div style={{ width: "80vw", border: "1px solid red" }} key={i}>
          {JSON.stringify(el)}
        </div>
      ))}
      {/* TODO: 리스트가 없을 때 발생할 수 있는 오류 해결 */}
      {selectedList.length && <div ref={ref}>observer</div>}
    </div>
  );
}

export default App;
