import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TrendChart = ({ data, labels, title }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: !!title,
                text: title,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#f0f0f0'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Price (₹/Quintal)',
                data: data,
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.4,
            },
        ],
    };

    return <Line options={options} data={chartData} />;
};

export default TrendChart;
