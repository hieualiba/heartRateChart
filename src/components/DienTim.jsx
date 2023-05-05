import React, { useRef } from "react";
import { data1, data2, data3 } from "./data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const HeartRateChart = ({ data }) => {
  const data1 = data.slice(0, 2500);
  const data2 = data.slice(2500, 5000);
  const data3 = data.slice(5000, 7500);
  return (
    <>
      <LineChart
        width={800}
        height={200}
        data={data1}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line dataKey="uv" stroke="blue" dot={false} />
        <Line dataKey="ux" stroke="red" dot={false} />
        <Line dataKey="ui" stroke="black" dot={false} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
      </LineChart>
      <LineChart
        width={800}
        height={200}
        data={data2}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line dataKey="uv" stroke="blue" dot={false} />
        <Line dataKey="ux" stroke="red" dot={false} />
        <Line dataKey="ui" stroke="black" dot={false} />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
      </LineChart>
      <LineChart
        width={800}
        height={200}
        data={data3}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line dataKey="uv" stroke="blue" dot={false} />
        <Line dataKey="ux" stroke="red" dot={false} />
        <Line dataKey="ui" stroke="black" dot={false} />
        <XAxis dataKey="time" />
        <YAxis />
      </LineChart>
    </>
  );
};

const PDFGenerator = ({}) => {
  const chartRef = useRef(null);
  const handleClick = () => {
    // Chuyển đổi div chứa biểu đồ thành hình ảnh
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Tạo file PDF từ hình ảnh
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save("chart.pdf");
    });
  };
  const convertData = [];
  let j = 0;
  let time = 0;
  for (let i = 0; i < data1.length; i++) {
    if (i % 10 === 0) j++;
    if (i % 250 === 0) time++;
    convertData.push({
      name: "heart",
      time: i % 250 === 249 ? time + 's' : null,
      uv: data1[i],
      ux: data2[j],
      ui: data3[j],
    });
  }
  return (
    <>
      <div ref={chartRef} style={{ margin: "auto", backgroundColor: "#ccc" }}>
        <h1>Điện tâm đồ</h1>
        <HeartRateChart data={convertData} />
      </div>
      <button onClick={handleClick}>Tạo file PDF</button>
    </>
  );
};

export default PDFGenerator;
