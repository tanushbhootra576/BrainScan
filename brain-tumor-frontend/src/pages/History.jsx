import PredictionsList from '../components/ui/PredictionsList';

const History = ({ predictions, onDelete, onClearAll }) => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Prediction History</h2>
                    <p className="text-gray-600 mt-2">
                        View all your previous MRI scan predictions. You can search, filter, and export your prediction history.
                    </p>
                </div>

                <div className="p-6">
                    <PredictionsList
                        predictions={predictions}
                        onDelete={onDelete}
                        onClearAll={onClearAll}
                    />
                </div>
            </div>
        </div>
    );
};

export default History;
