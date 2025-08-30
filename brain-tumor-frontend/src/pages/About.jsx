import { FaBrain, FaGithub, FaCode } from 'react-icons/fa';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <FaBrain className="h-8 w-8 text-primary-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">About This Project</h2>
                    </div>
                </div>

                <div className="p-6">
                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                        <p className="text-gray-600 mb-4">
                            This application uses deep learning to classify brain MRI scans into four categories:
                            Glioma, Meningioma, No Tumor, and Pituitary tumors. The model is based on a VGG16
                            convolutional neural network that has been fine-tuned on a dataset of brain MRI images.
                        </p>
                        <p className="text-gray-600">
                            The system provides an easy-to-use interface for uploading MRI scans, obtaining instant
                            classifications with confidence scores, and keeping track of prediction history.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border rounded-lg p-4">
                                <div className="bg-primary-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-primary-600 font-bold text-xl">1</span>
                                </div>
                                <h4 className="font-bold mb-2">Upload MRI Scan</h4>
                                <p className="text-gray-600 text-sm">
                                    Upload a brain MRI scan image through the web interface.
                                </p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <div className="bg-primary-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-primary-600 font-bold text-xl">2</span>
                                </div>
                                <h4 className="font-bold mb-2">AI Analysis</h4>
                                <p className="text-gray-600 text-sm">
                                    The deep learning model processes the image and extracts features to make a prediction.
                                </p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <div className="bg-primary-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-primary-600 font-bold text-xl">3</span>
                                </div>
                                <h4 className="font-bold mb-2">View Results</h4>
                                <p className="text-gray-600 text-sm">
                                    Receive classification results with confidence scores and save to your history.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Model Information</h3>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Base Architecture</dt>
                                    <dd className="mt-1 text-gray-900">VGG16 (Transfer Learning)</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Training Dataset</dt>
                                    <dd className="mt-1 text-gray-900">Brain MRI Image Dataset</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Classification Categories</dt>
                                    <dd className="mt-1 text-gray-900">Glioma, Meningioma, No Tumor, Pituitary</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Accuracy</dt>
                                    <dd className="mt-1 text-gray-900">~80% on Test Set</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Input Size</dt>
                                    <dd className="mt-1 text-gray-900">128x128x3 (RGB Image)</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Framework</dt>
                                    <dd className="mt-1 text-gray-900">TensorFlow/Keras</dd>
                                </div>
                            </dl>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="border rounded-lg p-4 text-center">
                                <h4 className="font-bold mb-2">Frontend</h4>
                                <p className="text-gray-600 text-sm">React, Vite, TailwindCSS</p>
                            </div>

                            <div className="border rounded-lg p-4 text-center">
                                <h4 className="font-bold mb-2">Backend</h4>
                                <p className="text-gray-600 text-sm">Flask API</p>
                            </div>

                            <div className="border rounded-lg p-4 text-center">
                                <h4 className="font-bold mb-2">ML Model</h4>
                                <p className="text-gray-600 text-sm">TensorFlow, Keras</p>
                            </div>

                            <div className="border rounded-lg p-4 text-center">
                                <h4 className="font-bold mb-2">Deployment</h4>
                                <p className="text-gray-600 text-sm">Local or Cloud-based</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Disclaimer</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <p className="text-sm text-yellow-700">
                                This application is for educational and research purposes only. It should not be used
                                for medical diagnosis. Always consult with qualified healthcare professionals for
                                proper medical advice and diagnosis.
                            </p>
                        </div>
                    </section>

                    <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <FaGithub className="mr-2 h-5 w-5" />
                            View on GitHub
                        </a>
                        <span className="mx-4 text-gray-300">|</span>
                        <a
                            href="#"
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <FaCode className="mr-2 h-5 w-5" />
                            Technical Documentation
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
