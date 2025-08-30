import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Styles
import './App.css';
import './styles/components.css';

// Pages
import Dashboard from './pages/Dashboard';
import ImageUpload from './pages/ImageUpload';
import History from './pages/History';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predictions, setPredictions] = useState([]);

    // Load predictions from localStorage on initial render
    useEffect(() => {
        const savedPredictions = localStorage.getItem('brainTumorPredictions');
        if (savedPredictions) {
            setPredictions(JSON.parse(savedPredictions));
        }
    }, []);

    // Save predictions to localStorage when they change
    useEffect(() => {
        localStorage.setItem('brainTumorPredictions', JSON.stringify(predictions));
    }, [predictions]);

    const addPrediction = (prediction) => {
        const newPrediction = {
            ...prediction,
            id: Date.now(),
            timestamp: new Date().toISOString(),
        };
        setPredictions(prev => [newPrediction, ...prev]);
    };

    const deletePrediction = (id) => {
        setPredictions(prev => prev.filter(prediction => prediction.id !== id));
    };

    const clearHistory = () => {
        setPredictions([]);
    };

    return (
        <div className="flex h-screen bg-pattern">
            <div className="md:w-64 flex-shrink-0">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white bg-opacity-60 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard predictions={predictions} />} />
                            <Route
                                path="/upload"
                                element={<ImageUpload addPrediction={addPrediction} />}
                            />
                            <Route
                                path="/history"
                                element={
                                    <History
                                        predictions={predictions}
                                        onDelete={deletePrediction}
                                        onClearAll={clearHistory}
                                    />
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/404" element={<NotFound />} />
                            <Route path="*" element={<Navigate to="/404" replace />} />
                        </Routes>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default App;
