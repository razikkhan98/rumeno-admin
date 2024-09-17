import React from "react";
import { PieChart, Pie,Tooltip } from 'recharts';

const PieChartNo = ({pieData}) => {
    const data   = [
        { value: 400 },
        { value: 300 },
        { value: 300 },
        { value: 200 },
        { value: 278 },
        { value: 189 },
      ];
    return(
        <>
 
        <PieChart width={270} height={250}>
          <Pie
            dataKey="value"
            startAngle={360}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          
          <Tooltip/>
        </PieChart>
        </>
    )
}

export default PieChartNo;