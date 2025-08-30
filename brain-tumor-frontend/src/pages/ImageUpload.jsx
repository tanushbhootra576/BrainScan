import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import ImageUploader from '../components/ui/ImageUploader';
import ResultChart from '../components/ui/ResultChart';
import { predictImage } from '../services/api';

const ImageUpload = ({ addPrediction }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleImageSelected = (file) => {
        setSelectedImage(file);
        setPrediction(null);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            setError('Please select an image to analyze');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Make API call to predict
            const result = await predictImage(selectedImage);

            // Process result
            const newPrediction = {
                predictedClass: result.class,
                confidence: result.confidence,
                confidences: result.class_confidences,
                imageName: selectedImage.name,
                imageUrl: URL.createObjectURL(selectedImage),
            };

            setPrediction(newPrediction);

            // Add to history
            addPrediction(newPrediction);
        } catch (err) {
            console.error('Error during prediction:', err);
            setError(
                err.response?.data?.error ||
                'An error occurred during prediction. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    // For demo purposes, simulate API response if no backend
    const handleDemoPredict = () => {
        if (!selectedImage) {
            setError('Please select an image to analyze');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate API delay
        setTimeout(() => {
            // Generate random result (for demo purposes)
            const classes = ['glioma', 'meningioma', 'notumor', 'pituitary'];
            const randomIndex = Math.floor(Math.random() * classes.length);
            const predictedClass = classes[randomIndex];

            // Generate random confidences that sum to 1
            const baseConfidences = {
                glioma: Math.random() * 0.2,
                meningioma: Math.random() * 0.2,
                notumor: Math.random() * 0.2,
                pituitary: Math.random() * 0.2,
            };

            // Ensure the predicted class has highest confidence
            const totalBase = Object.values(baseConfidences).reduce((a, b) => a + b, 0);
            const normalizedConfidences = {};

            for (const [key, value] of Object.entries(baseConfidences)) {
                normalizedConfidences[key] = value / totalBase * 0.4; // Scale to 40%
            }

            // Add 60% to the predicted class
            normalizedConfidences[predictedClass] += 0.6;

            const newPrediction = {
                predictedClass,
                confidence: normalizedConfidences[predictedClass],
                confidences: normalizedConfidences,
                imageName: selectedImage.name,
                imageUrl: URL.createObjectURL(selectedImage),
            };

            setPrediction(newPrediction);
            addPrediction(newPrediction);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass-card p-6 shadow-soft">
                <h2 className="text-2xl font-semibold gradient-text mb-4">Upload Brain MRI Scan</h2>

                <div className="border-b border-gray-200 mb-6 pb-6">
                    <p className="text-gray-600">
                        Upload a brain MRI scan image to analyze for tumor classification.
                        The system will classify the image into one of four categories: Glioma, Meningioma, No Tumor, or Pituitary.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <ImageUploader onImageSelected={handleImageSelected} />

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                            <div className="flex items-center">
                                <FaExclamationTriangle className="mr-2" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={handleDemoPredict}
                            disabled={isLoading || !selectedImage}
                            className="btn-gradient py-2.5 px-6 bg-primary-600 text-white rounded-lg hover:text-white transition-all shadow-sm flex-1 flex justify-center items-center"
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <FaBrain className="mr-2" />
                                    Analyze Image (Demo)
                                </>
                            )}
                        </button>

                        <Link
                            to="/"
                            className="py-2.5 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all shadow-sm flex-1 text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>

                {prediction && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center mb-4">
                                        <FaCheckCircle className="text-green-500 mr-2" />
                                        <h4 className="text-lg font-medium">Prediction</h4>
                                    </div>

                                    <div className="text-center p-4">
                                        <div className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${prediction.predictedClass === 'notumor'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {prediction.predictedClass.toUpperCase()}
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-gray-600">Confidence</p>
                                            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                                                <div
                                                    className={`h-4 rounded-full ${prediction.confidence > 0.7
                                                        ? 'bg-green-600'
                                                        : prediction.confidence > 0.4
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${prediction.confidence * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-2 text-xl font-bold">
                                                {(prediction.confidence * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="bg-gray-50 rounded-lg p-4 h-full">
                                    <h4 className="text-lg font-medium mb-4">Confidence Distribution</h4>
                                    <ResultChart prediction={prediction} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => {
                                    setSelectedImage(null);
                                    setPrediction(null);
                                }}
                                className="btn btn-outline"
                            >
                                Upload Another Image
                            </button>

                            <Link
                                to="/history"
                                className="btn btn-primary"
                            >
                                View History
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
