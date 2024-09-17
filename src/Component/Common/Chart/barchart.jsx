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

const BarChartNo = ({barData}) => {
  console.log('barData: ', barData);
  const data = [
    {
      name: "Micr",
      Products: 2,
      // fees: "4%",
    },
    {
      name: "Minromix",
      Products: 1,
      fees: "4%",
    },
    {
      name: "vita",
      Products: 1,
      fees: "1%",
    },
    {
      name: "Neonato",
      Products: 2,
      fees: "1%",
    },
    {
      name: "Mukti",
      Products: 1,
      fees: "1%",
    },
    {
      name: "Energico",
      Products: 1,
      fees: "1%",
    },
    {
      name: "Digesto",
      Products: 3,
      fees: "1%",
    },
    {
      name: "Liverofine",
      Products: 5,
      fees: "1%",
    },
    {
      name: "D-Cox",
      Products: 4,
      fees: "2%",
    },
    {
      name: "Rumeno Micro Flora",
      Products: 1,
      fees: "3%",
    },
    {
      name: "Lacto-Pup Milk Replacer",
      Products: 2,
      fees: "4%",
    },
    {
      name: "Lr",
      Products: 2,
      fees: "4%",
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" aspect={3} height="100%">
        <BarChart
          width={400}
          height={400}
          data={barData}
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
