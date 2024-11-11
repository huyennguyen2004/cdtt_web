// src/pages/backend/Dashboard.js
import React from 'react';
import { Pie } from 'react-chartjs-2'; // Biểu đồ hình tròn
import { Bar } from 'react-chartjs-2'; // Biểu đồ cột
import 'chart.js/auto';

const Dashboard = () => {
  // Dữ liệu cho biểu đồ hình tròn
  const pieData = {
    labels: ['Bán hàng', 'Orders', 'Khách ghé thăm'],
    datasets: [
      {
        data: [300, 200, 400],
        backgroundColor: ['#00FF00', '#33FFFF', '#FFFF33'],
      },
    ],
  };

  // Dữ liệu cho biểu đồ cột
  const barData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [
      {
        label: 'Tổng bán hàng (triệu VND)',
        data: [65, 59, 80, 81, 56],
        backgroundColor: '#FF9900',
      },
    ],
  };

  return (
    <div className="container mx-auto">
      {/* Phần phân tích */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-cyan-300 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold mb-2">Tổng bán hàng</h3>
          <p className="text-4xl font-bold">500 triệu</p>
        </div>
        <div className="bg-lime-300 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold mb-2">Tổng đơn hàng</h3>
          <p className="text-4xl font-bold">300</p>
        </div>
        <div className="bg-red-500 p-6 rounded shadow">
          <h3 className="text-2xl font-semibold mb-2">Khách ghé thăm</h3>
          <p className="text-4xl font-bold">1200</p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Phân tích tổng thể</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Doanh thu theo tháng</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
