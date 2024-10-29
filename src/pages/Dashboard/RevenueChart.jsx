// src/components/RevenueChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ monthlySales }) => {
    const revenueData = Array(12).fill(0);
    monthlySales.forEach(sale => {
        const monthIndex = parseInt(sale._id.split('-')[1], 10)
        revenueData[monthIndex] = sale.totalSales;
    })
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue (IND)',
                data: revenueData,
                backgroundColor: 'rgba(34, 197, 94, 0.7)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
            <div className='hidden md:block'>
                <Bar data={data} options={options} className='' />
            </div>
        </div>
    );
};

export default RevenueChart;