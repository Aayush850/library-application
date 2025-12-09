"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


const BarChartComponent = ({data}:{data:{date:string, total:number}[]}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="date" /> 
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, "Books Borrowed"]} /> 
        <Bar dataKey="total" fill="#7f22fe" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
