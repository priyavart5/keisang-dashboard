import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "./app/inventorySlice";
import Stats from "./components/Stats";
import Chart from "./components/Chart";
import Filters from "./components/Filters";
import HistoryLog from "./components/HistoryLog";
import Header from './components/Header';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.inventory);
  const [filters, setFilters] = useState({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchInventory(filters));
  }, [dispatch, filters]);

  const mostRecentDate = data.reduce((latest, current) => {
    const currentDate = new Date(current.timestamp.split(" ")[0]);
    return currentDate > latest ? currentDate : latest;
  }, new Date(0));

  const formattedDate = mostRecentDate.toLocaleDateString("en-GB");

  const stats = [
    { title: "New Units", value: data.filter((d) => d.condition === "new").length },
    { title: "Used Units", value: data.filter((d) => d.condition === "used").length },
    { title: "CPO Units", value: data.filter((d) => d.condition === "cpo").length },
  ];

  return (
    <>
      <div className="app">
        <Header />
        <div className="innerContainer">
          <div className="Inventory_Top_Section">
            <p className="Inventory_Top_Text">Inventory</p>
            <div
              className="Inventory_Top_Filter_CTA"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              <img
                className="Inventory_Top_Filter_Img"
                src="/assets/filter.png"
                alt="filter"
              />
              <p className="Inventory_Top_Filter_text">FILTER DATA BY</p>
            </div>
          </div>
          {isFilterVisible && (
            <Filters
              data={data}
              onApply={setFilters}
              onClose={() => setIsFilterVisible(false)}
            />
          )}
          <Stats stats={stats} recentDate={formattedDate} />
          <Chart data={data} title="Inventory Count" valueKey="count" />
          <Chart data={data} title="Average MSRP in USD" valueKey="msrp" />
          <HistoryLog data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
