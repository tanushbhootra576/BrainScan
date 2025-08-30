import axios from 'axios';

// Define the base URL for your Flask API
const API_URL = 'http://localhost:5000';

// Create an instance of axios with baseURL
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const predictImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await api.post('/predict', formData);
        return response.data;
    } catch (error) {
        console.error('Error predicting image:', error);
        throw error;
    }
};

export const getClassDistribution = async () => {
    try {
        const response = await api.get('/stats/distribution');
        return response.data;
    } catch (error) {
        console.error('Error fetching class distribution:', error);
        throw error;
    }
};

export const getAccuracyMetrics = async () => {
    try {
        const response = await api.get('/stats/accuracy');
        return response.data;
    } catch (error) {
        console.error('Error fetching accuracy metrics:', error);
        throw error;
    }
};

export default {
    predictImage,
    getClassDistribution,
    getAccuracyMetrics,
};
