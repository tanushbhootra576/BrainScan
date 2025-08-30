# Python backend API for Brain Tumor Classification

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = 'brain_tumor_model.h5'

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

# Classes for prediction
CLASSES = ['glioma', 'meningioma', 'notumor', 'pituitary']

# Load model
model = None
try:
    model = load_model(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")

def allowed_file(filename):
    """Check if the file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """Preprocess the image for model prediction"""
    img = load_img(image_path, target_size=(128, 128))
    img_array = img_to_array(img)
    img_array = img_array / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    # Check if model is loaded
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    # Check if the post request has the file part
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400
    
    file = request.files['image']
    
    # If user doesn't select file, browser might also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No image selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Preprocess and predict
            processed_image = preprocess_image(filepath)
            predictions = model.predict(processed_image)[0]
            
            # Get predicted class and confidence
            predicted_class_index = np.argmax(predictions)
            predicted_class = CLASSES[predicted_class_index]
            confidence = float(predictions[predicted_class_index])
            
            # Format all class confidences
            class_confidences = {}
            for i, class_name in enumerate(CLASSES):
                class_confidences[class_name] = float(predictions[i])
            
            # Return result
            result = {
                'class': predicted_class,
                'confidence': confidence,
                'class_confidences': class_confidences
            }
            
            return jsonify(result), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            # Clean up the uploaded file
            try:
                os.remove(filepath)
            except Exception as e:
                print(f"Error removing file: {e}")
    
    return jsonify({'error': 'Invalid file format. Please upload a valid image file (png, jpg, jpeg)'}), 400

@app.route('/stats/distribution', methods=['GET'])
def class_distribution():
    """Return mock statistics about class distribution"""
    # This would be replaced with actual statistics in a real app
    return jsonify({
        'glioma': 35,
        'meningioma': 28,
        'notumor': 22,
        'pituitary': 15
    }), 200

@app.route('/stats/accuracy', methods=['GET'])
def accuracy_metrics():
    """Return mock accuracy metrics"""
    # This would be replaced with actual metrics in a real app
    return jsonify({
        'overall_accuracy': 0.82,
        'class_accuracy': {
            'glioma': 0.85,
            'meningioma': 0.79,
            'notumor': 0.88,
            'pituitary': 0.76
        }
    }), 200

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({'status': 'healthy', 'model_loaded': model is not None}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
