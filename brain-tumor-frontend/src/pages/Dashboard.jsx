import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUpload, FaHistory, FaInfoCircle, FaChartBar } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ predictions }) => {
    const [recentPredictions, setRecentPredictions] = useState([]);
    const [statsData, setStatsData] = useState(null);

    useEffect(() => {
        // Get the 5 most recent predictions
        setRecentPredictions(predictions.slice(0, 5));

        // Calculate prediction statistics
        const stats = predictions.reduce((acc, prediction) => {
            const className = prediction.predictedClass;
            if (!acc[className]) {
                acc[className] = 0;
            }
            acc[className]++;
            return acc;
        }, {});

        if (Object.keys(stats).length > 0) {
            const labels = Object.keys(stats);
            const data = Object.values(stats);

            setStatsData({
                labels,
                datasets: [
                    {
                        label: 'Number of Predictions',
                        data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [predictions]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Prediction Distribution',
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card gradient-border p-6 shadow-soft floating-card">
                    <div className="flex items-center">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-3 rounded-full shadow-sm">
                            <FaUpload className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold gradient-text">Upload MRI Scan</h3>
                            <p className="text-gray-600">Upload a brain MRI scan for analysis</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link
                            to="/upload"
                            className="btn-gradient block py-2.5 px-4 bg-primary-600 text-white text-center rounded-lg hover:text-white transition-all shadow-sm"
                        >
                            Upload Now
                        </Link>
                    </div>
                </div>

                <div className="glass-card gradient-border p-6 shadow-soft floating-card">
                    <div className="flex items-center">
                        <div className="bg-gradient-to-br from-secondary-500 to-secondary-700 p-3 rounded-full shadow-sm">
                            <FaHistory className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold gradient-text">Prediction History</h3>
                            <p className="text-gray-600">View your previous prediction results</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link
                            to="/history"
                            className="btn-gradient block py-2.5 px-4 bg-secondary-600 text-white text-center rounded-lg hover:text-white transition-all shadow-sm"
                        >
                            View History
                        </Link>
                    </div>
                </div>

                <div className="glass-card gradient-border p-6 shadow-soft floating-card">
                    <div className="flex items-center">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-full shadow-sm">
                            <FaInfoCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold gradient-text">About</h3>
                            <p className="text-gray-600">Learn more about this project</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link
                            to="/about"
                            className="btn-gradient block py-2.5 px-4 bg-gray-600 text-white text-center rounded-lg hover:text-white transition-all shadow-sm"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 shadow-soft">
                    <h3 className="text-lg font-semibold gradient-text mb-4">Recent Predictions</h3>

                    {recentPredictions.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No predictions yet. Upload an MRI scan to get started.</p>
                            <div className="mt-5">
                                <Link
                                    to="/upload"
                                    className="btn-gradient inline-block py-2.5 px-6 bg-primary-600 text-white rounded-lg hover:text-white transition-all shadow-sm"
                                >
                                    Upload an MRI Scan
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentPredictions.map((prediction) => (
                                <div
                                    key={prediction.id}
                                    className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                                >
                                    {prediction.imageUrl ? (
                                        <img
                                            src={prediction.imageUrl}
                                            alt="MRI Scan"
                                            className="h-16 w-16 object-cover rounded-lg shadow-sm"
                                        />
                                    ) : (
                                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                                            <span className="text-xs text-gray-500">No image</span>
                                        </div>
                                    )}

                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${prediction.predictedClass === 'notumor'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {prediction.predictedClass}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(prediction.timestamp)}
                                            </span>
                                        </div>

                                        <div className="mt-2">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                                    <div
                                                        className="bg-gradient-to-r from-primary-500 to-primary-700 h-2.5 rounded-full"
                                                        style={{ width: `${prediction.confidence * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                                                    {(prediction.confidence * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="text-center mt-6">
                                <Link
                                    to="/history"
                                    className="text-primary-600 hover:text-primary-800 font-medium inline-flex items-center"
                                >
                                    <span>View All Predictions</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="glass-card p-6 shadow-soft">
                    <h3 className="text-lg font-semibold gradient-text mb-4">Statistics</h3>

                    {!statsData ? (
                        <div className="text-center py-10">
                            <FaChartBar className="mx-auto h-16 w-16 text-gray-300 pulse" />
                            <p className="text-gray-500 mt-4">
                                No data available for statistics. Make predictions to see stats.
                            </p>
                        </div>
                    ) : (
                        <div className="h-64">
                            <Bar data={statsData} options={chartOptions} />
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500">Total Predictions</h4>
                            <p className="text-2xl font-bold text-gray-900">{predictions.length}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500">Tumor Detected</h4>
                            <p className="text-2xl font-bold text-gray-900">
                                {predictions.filter(p => p.predictedClass !== 'notumor').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
