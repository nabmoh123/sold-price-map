import React, { useEffect, useState } from 'react';
import NeWPointForm from './components/NewPointForm';
import MapGrid from './components/MapGrid';
import { getAllPoints } from "./utils/api";
import './App.css';

function App() {
  const [price2DArray, setPrice2DArray] = useState(Array(101).fill(null).map(
      () => Array(101).fill(0)
  ));

  // Update Grid once the backend response has been received
  useEffect(() => {
    getAllPoints()
        .then(data => {
          const newPrice2DArray = [...price2DArray];

          // Update the prices for all entries in points
          data.forEach(point => {
            newPrice2DArray[point.x][point.y] = parseInt(point.price, 10);
          });

          setPrice2DArray(newPrice2DArray);
        });
  }, []);


  return (
      <div>
        <h1 className="main-title">Representation of House Selling prices</h1>
        <h5 className="sub-title">(Hover over each coloured square for the price)</h5>
        <NeWPointForm price2DArray={price2DArray} setPrice2DArray={setPrice2DArray} />
        <MapGrid price2DArray={price2DArray}/>
      </div>
  );
}

export default App;
