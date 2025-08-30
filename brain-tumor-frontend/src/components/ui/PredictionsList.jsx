import { useState } from 'react';
import { FaSearch, FaFilter, FaTrash, FaDownload } from 'react-icons/fa';

const PredictionsList = ({ predictions, onDelete, onClearAll }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    // Filter predictions based on search term and filter type
    const filteredPredictions = predictions.filter(prediction => {
        const matchesSearch = prediction.predictedClass.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || prediction.predictedClass === filterType;
        return matchesSearch && matchesFilter;
    });

    // Get unique tumor types for the filter dropdown
    const tumorTypes = [...new Set(predictions.map(p => p.predictedClass))];

    // Format date for display
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    // Export predictions as CSV
    const exportToCsv = () => {
        if (filteredPredictions.length === 0) return;

        const headers = ['Date', 'Predicted Class', 'Confidence', 'Image Name'];

        const csvContent = [
            headers.join(','),
            ...filteredPredictions.map(p => [
                formatDate(p.timestamp),
                p.predictedClass,
                p.confidence.toFixed(2),
                p.imageName || 'Unknown'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `brain-tumor-predictions-${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search predictions..."
                        className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaFilter className="text-gray-400" />
                        </div>
                        <select
                            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            {tumorTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={exportToCsv}
                        disabled={filteredPredictions.length === 0}
                        className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaDownload className="mr-2" />
                        Export
                    </button>

                    <button
                        onClick={onClearAll}
                        disabled={predictions.length === 0}
                        className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaTrash className="mr-2" />
                        Clear All
                    </button>
                </div>
            </div>

            {filteredPredictions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No prediction records found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prediction
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Confidence
                                </th>
                                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPredictions.map((prediction) => (
                                <tr key={prediction.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {prediction.imageUrl ? (
                                            <img
                                                src={prediction.imageUrl}
                                                alt="MRI Scan"
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                                                <span className="text-xs text-gray-500">No image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {formatDate(prediction.timestamp)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${prediction.predictedClass === 'notumor'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {prediction.predictedClass}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-primary-600 h-2.5 rounded-full"
                                                style={{ width: `${prediction.confidence * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600">
                                            {(prediction.confidence * 100).toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onDelete(prediction.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PredictionsList;
