import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultChart = ({ prediction }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!prediction || !prediction.confidences) return;

        // Define colors for each class
        const backgroundColors = {
            glioma: 'rgba(255, 99, 132, 0.7)',
            meningioma: 'rgba(54, 162, 235, 0.7)',
            notumor: 'rgba(75, 192, 192, 0.7)',
            pituitary: 'rgba(255, 206, 86, 0.7)',
        };

        const borderColors = {
            glioma: 'rgba(255, 99, 132, 1)',
            meningioma: 'rgba(54, 162, 235, 1)',
            notumor: 'rgba(75, 192, 192, 1)',
            pituitary: 'rgba(255, 206, 86, 1)',
        };

        // Extract labels and data from prediction
        const labels = Object.keys(prediction.confidences);
        const data = Object.values(prediction.confidences).map(
            confidence => parseFloat((confidence * 100).toFixed(2))
        );

        // Prepare chart background and border colors
        const backgroundColor = labels.map(label => backgroundColors[label] || 'rgba(153, 102, 255, 0.7)');
        const borderColor = labels.map(label => borderColors[label] || 'rgba(153, 102, 255, 1)');

        setChartData({
            labels,
            datasets: [
                {
                    data,
                    backgroundColor,
                    borderColor,
                    borderWidth: 1,
                },
            ],
        });
    }, [prediction]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                    },
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        },
    };

    if (!chartData) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    return (
        <div className="h-64">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default ResultChart;
