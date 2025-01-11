import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../styles/chart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart = ({ data, title, valueKey}) => {
  const [selectedCondition, setSelectedCondition] = useState("new");

  const formatMonthYear = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const cleanPrice = (price) => {
    const numericValue = parseFloat(price?.replace(/[^\d.-]/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  };

  const filteredData = data.filter(
    (item) => item.condition === selectedCondition
  );

  const labels = [...new Set(filteredData.map((item) => formatMonthYear(item.timestamp)))];

  const values = labels.map((label) => {
    const itemsForMonth = filteredData.filter(
      (item) => formatMonthYear(item.timestamp) === label
    );
    if (valueKey === "count") {
      return itemsForMonth.length;
    } else if (valueKey === "msrp") {
      const totalPrice = itemsForMonth.reduce(
        (acc, item) => acc + cleanPrice(item.price),
        0
      );
      return itemsForMonth.length ? totalPrice / itemsForMonth.length : 0;
    }
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: `${title} (${selectedCondition.toUpperCase()})`,
        data: values,
        backgroundColor: "#FFA726",
      },
    ],
  };

  return (
    <div className="Inventory_Count">
      <div className="Inventory_Count_filters">
        <h3 className="Inventory_Count_head">{title}</h3>
        <div className="Inventory_Count_buttons">
          {["new", "used", "cpo"].map((condition, index) => (
            <button
              key={index}
              className={`Inventory_Count_button ${
                selectedCondition === condition ? "Inventory_Count_button_active" : ""
              }`}
              onClick={() => setSelectedCondition(condition)}
            >
              {condition.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <Bar data={chartData} className="chart" />
    </div>
  );
};

export default Chart;
