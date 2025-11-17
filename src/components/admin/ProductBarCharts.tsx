import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ProductBarChartProps = {
  data: { name: string; value: number }[];
  title: string;
};

const ProductBarChart: React.FC<ProductBarChartProps> = ({ data, title }) => {
  const [displayData, setDisplayData] = useState<
    { name: string; value: number }[]
  >([]);

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    const updateDataLimit = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setAngle(45);
        // Mobile
        setDisplayData(sortedData.slice(0, 4));
      } else if (width < 1024) {
        // Tablet
        setAngle(35);
        setDisplayData(sortedData.slice(0, 6));
      } else {
        // Desktop
        setAngle(20);
        setDisplayData(sortedData);
      }
    };

    updateDataLimit(); // Run on mount
    window.addEventListener("resize", updateDataLimit);
    return () => window.removeEventListener("resize", updateDataLimit);
  }, [data]);

  return (
    <div className="bg-white p-2 rounded shadow-2xl w-full h-[80vh] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <h2 className="font-medium text-2xl mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={displayData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-`${angle}`}
            textAnchor="end"
            interval={0}
            height={100}
            tick={{ fontSize: 14 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductBarChart;
