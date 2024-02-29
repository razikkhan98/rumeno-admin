import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const BarChartNo = () => {
  const data = [
    {
      name: "Micr",
      Products: 13,
      fees: "40%",
    },
    {
      name: "Minromix",
      Products: 15,
      fees: "12%",
    },
    {
      name: "vita",
      Products: 28,
      fees: "14%",
    },
    {
      name: "Neonato",
      Products: 13,
      fees: "70%",
    },
    {
      name: "Mukti",
      Products: 13,
      fees: "30%",
    },
    {
      name: "Energico",
      Products: 13,
      fees: "30%",
    },
    {
      name: "Digesto",
      Products: 19,
      fees: "30%",
    },
    {
      name: "Liverofine",
      Products: 13,
      fees: "30%",
    },
    {
      name: "D-Cox",
      Products: 13,
      fees: "30%",
    },
    {
      name: "Rumeno Micro Flora",
      Products: 13,
      fees: "30%",
    },
    {
      name: "Lacto-Pup Milk Replacer",
      Products: 13,
      fees: "30%",
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" aspect={3} height="100%">
        <BarChart
          width={400}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Products" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartNo;
