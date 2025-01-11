import React from "react";
import { Table } from "antd";

const parsePrice = (price) => {
  const priceValue = price.replace(" USD", "").replace(",", "");
  return parseFloat(priceValue);
};

const getAggregatedData = (data) => {
  const aggregatedData = {};

  data.forEach((item) => {
    const date = new Date(item.timestamp.split(" ")[0]).toLocaleDateString("en-GB");
    const condition = item.condition;
    const price = parsePrice(item.price);

    if (!aggregatedData[date]) {
      aggregatedData[date] = {
        date,
        newCount: 0,
        usedCount: 0,
        cpoCount: 0,
        newPriceTotal: 0,
        usedPriceTotal: 0,
        cpoPriceTotal: 0,
      };
    }

    const entry = aggregatedData[date];

    if (condition === "new") {
      entry.newCount += 1;
      entry.newPriceTotal += price;
    } else if (condition === "used") {
      entry.usedCount += 1;
      entry.usedPriceTotal += price;
    } else if (condition === "cpo") {
      entry.cpoCount += 1;
      entry.cpoPriceTotal += price;
    }
  });

  Object.values(aggregatedData).forEach((entry) => {
    if (entry.newCount > 0) {
      entry.newAvgPrice = entry.newPriceTotal / entry.newCount;
    } else {
      entry.newAvgPrice = 0;
    }
    if (entry.usedCount > 0) {
      entry.usedAvgPrice = entry.usedPriceTotal / entry.usedCount;
    } else {
      entry.usedAvgPrice = 0;
    }
    if (entry.cpoCount > 0) {
      entry.cpoAvgPrice = entry.cpoPriceTotal / entry.cpoCount;
    } else {
      entry.cpoAvgPrice = 0;
    }
  });

  return Object.values(aggregatedData);
};

const HistoryLog = ({ data }) => {
  const aggregatedData = getAggregatedData(data);

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "New Inventory Count", dataIndex: "newCount", key: "newCount" },
    { title: "New Total MSRP", dataIndex: "newPriceTotal", key: "newPriceTotal" },
    { title: "New Average MSRP", dataIndex: "newAvgPrice", key: "newAvgPrice" },
    { title: "Used Inventory Count", dataIndex: "usedCount", key: "usedCount" },
    { title: "Used Total MSRP", dataIndex: "usedPriceTotal", key: "usedPriceTotal" },
    { title: "Used Average MSRP", dataIndex: "usedAvgPrice", key: "usedAvgPrice" },
    { title: "CPO Inventory Count", dataIndex: "cpoCount", key: "cpoCount" },
    { title: "CPO Total MSRP", dataIndex: "cpoPriceTotal", key: "cpoPriceTotal" },
    { title: "CPO Average MSRP", dataIndex: "cpoAvgPrice", key: "cpoAvgPrice" },
  ];

  return <Table dataSource={aggregatedData} columns={columns} />;
};

export default HistoryLog;
