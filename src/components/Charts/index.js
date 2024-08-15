import { Line, Pie } from "@ant-design/charts";
import React from "react";
function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  let spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  let finalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    width: 800,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width: 650,
    angleField: "amount",
    colorField: "tag",
  };
  let chart;
  let pieChart;
  return (
    <div className="charts-wrapper">
      <div>
        {" "}
        <h2>Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div>
        {" "}
        <h2>Your Spendings</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
}
export default ChartComponent;
