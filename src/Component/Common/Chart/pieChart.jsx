import React from "react";
import { PieChart, Pie,Tooltip } from 'recharts';

const PieChartNo = () => {
    const data   = [
        { name: 'July', value: 400 },
        { name: 'August', value: 300 },
        { name: 'September', value: 300 },
        { name: 'October', value: 200 },
        { name: 'November', value: 278 },
        { name: 'December', value: 189 },
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