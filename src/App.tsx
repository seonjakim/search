import './App.css';

import {
  useEffect,
  useState,
} from 'react';

import useIntersect from './hooks/useIntersect';

const OFFSET = 10;
function App() {
  const [count, setCount] = useState([]);
  const [page, setPage] = useState(1);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    setPage((prev) => prev + 1);
  });

  useEffect(() => {
    fetch("https://api.json-generator.com/templates/ePNAVU1sgGtQ/data", {
      method: "GET",
      headers: {
        Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
      },
    })
      .then((res) => res.json())
      .then((res) => setCount(res));
  }, []);

  return (
    <div className="App">
      {count.slice(0, OFFSET * page).map((el, i) => (
        <div style={{ width: "80vw", border: "1px solid red" }} key={i}>
          {JSON.stringify(el)}
        </div>
      ))}
      <div ref={ref}>observer</div>
    </div>
  );
}

export default App;
