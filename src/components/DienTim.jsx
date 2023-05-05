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
import { useEffect } from "react";

const HeartRateChart = ({ data }) => {
  const data1 = data.slice(0, 2500);
  const data2 = data.slice(2500, 5000);
  const data3 = data.slice(5000, 7500);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 640;

    let numLines = 20;
    let lineSpacing = 20;
    let numCol = 50;

    // code vẽ biểu đồ ở đây
    const xScale = canvas.width / data1.length;
    const yScale = 1 / 5;
    const xOffset = 0;
    const marginTop = 20;
    let yOffset = 100 + marginTop;

    // Vẽ lưới giá trị
    ctx.beginPath();
    ctx.strokeStyle = "pink";
    ctx.lineWidth = 1;

    // Vẽ đường thẳng cho trục x
    for (let i = marginTop; i <= canvas.height; i += 4) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
    }

    // Vẽ đường thẳng cho trục y
    for (let i = 0; i <= canvas.width; i += 4) {
      ctx.moveTo(i, marginTop);
      ctx.lineTo(i, canvas.height);
    }

    ctx.stroke();

    // Vẽ trục tọa độ
    ctx.beginPath();
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "red";
    for (let i = 1; i < canvas.height / lineSpacing; i++) {
      let y = i * lineSpacing;
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < numCol; i++) {
      let x = i * lineSpacing;
      ctx.moveTo(x, marginTop);
      ctx.lineTo(x, canvas.height);
    }
    ctx.stroke();

    // Vẽ các trục
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    // Vẽ trục x
    for (let i = marginTop; i <= canvas.height; i += lineSpacing * 5) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
    }

    // Vẽ trục y
    for (let i = 0; i <= canvas.width; i += lineSpacing * 5) {
      ctx.moveTo(i, marginTop);
      ctx.lineTo(i, canvas.height);
    }

    ctx.stroke();

    // Vẽ các giá trị trên trục x và y
    ctx.font = "12px Arial";
    ctx.fillStyle = "red";

    // Giá trị trên trục x
    for (let i = 0; i <= 1000; i += 100) {
      ctx.fillText(i / 100 + "s", i, 12);
    }

    // Vẽ biểu đồ điện tim cho mảng dữ liệu thứ nhất
    ctx.beginPath();
    ctx.moveTo(xOffset, yOffset - data1[0].uv * yScale);

    for (let i = 1; i < data1.length; i++) {
      ctx.lineTo(i * xScale + xOffset, yOffset - data1[i].uv * yScale);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Vẽ biểu đồ điện tim cho mảng dữ liệu thứ hai
    ctx.beginPath();
    const yOffset2 = 200 + marginTop;
    ctx.moveTo(xOffset, yOffset2 - data2[0].uv * yScale);

    for (let i = 1; i < data2.length; i++) {
      ctx.lineTo(i * xScale + xOffset, yOffset2 - data2[i].uv * yScale);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Vẽ biểu đồ điện tim cho mảng dữ liệu thứ ba
    ctx.beginPath();
    const yOffset3 = 300 + marginTop;
    ctx.moveTo(xOffset, yOffset3 - data3[0].uv * yScale);

    for (let i = 1; i < data2.length; i++) {
      ctx.lineTo(i * xScale + xOffset, yOffset3 - data3[i].uv * yScale);
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, []);
  return (
    <>
      <canvas ref={canvasRef} />
      {/* <LineChart
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
      </LineChart> */}
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
      time: i % 250 === 249 ? time + "s" : null,
      uv: data1[i],
      ux: data2[j],
      ui: data3[j],
    });
  }
  return (
    <>
      <div ref={chartRef} style={{ margin: "auto", padding: "40px" }}>
        <h1>Điện tâm đồ</h1>
        <HeartRateChart data={convertData} />
      </div>
      <button onClick={handleClick}>Tạo file PDF</button>
    </>
  );
};

export default PDFGenerator;
