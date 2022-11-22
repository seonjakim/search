import './App.css';

import {
  useEffect,
  useState,
} from 'react';

function App() {
  const [count, setCount] = useState([]);

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
      {count.map((el, i) => (
        <div style={{ width: "80vw", border: "1px solid red" }} key={i}>
          {JSON.stringify(el)}
        </div>
      ))}
    </div>
  );
}

export default App;
