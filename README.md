# BrainScan.ai - Smart Tumor Detection

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://python.org)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange.svg)](https://tensorflow.org)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)](https://vitejs.dev)

##  About the Project

BrainScan.ai is a next-gen medical imaging analysis system that leverages AI to detect and classify brain tumors from MRI scans. Built with cutting-edge tech by Gen Z developers, this project makes medical analysis accessible and user-friendly.

##  Team

### Core Development Team
- **Rakshith Ganjimut** ([@Rakshi2609](https://github.com/Rakshi2609))
  - Project Lead
  - Backend Development
  - Model Architecture

- **Tanush Bhootra** ([@tanushbhootra576](https://github.com/tanushbhootra576))
  - Frontend Development
  - UI/UX Design
  - Integration Testing

##  Project Status

This project is actively maintained by the team. We're continuously working on:
- Improving model accuracy
- Adding new features
- Enhancing the user interface
- Implementing feedback from healthcare professionals

##  Contributing

We welcome contributions! Please feel free to submit Pull Requests or open Issues for any bugs/improvements.

### How to Contribute
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Acknowledgments

- TJSO Initiative for supporting the project
- Dataset provided by [Dataset Source]
- TensorFlow team for the excellent deep learning framework
- Medical professionals who helped in validating the model's performance
- Open source community for various tools and libraries used in this projectields.io/badge/TensorFlow-2.15-orange.svg)](https://tensorflow.org)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)](https://vitejs.dev)

## About the Project

BrainScan is an advanced medical imaging analysis system that leverages deep learning to assist in the detection and classification of brain tumors from MRI scans. Developed by [Tanush Bhootra](https://github.com/tanushbhootra576) and [Raksh](https://github.com/raksh), this project aims to provide healthcare professionals with a reliable tool for preliminary tumor analysis.

### Key Highlights
-  Medical-grade classification system
-  State-of-the-art deep learning model
-  Modern web interface for easy access
-  Detailed analysis and reporting
-  Privacy-focused design

The system can analyze MRI scans and classify them into four distinct categories:
- 🔴 Glioma
- 🟡 Meningioma
- 🟢 No tumor
- 🔵 Pituitary

##  Features

- **Advanced Deep Learning Model**: Utilizes transfer learning with VGG16 architecture
- **Multi-Class Classification**: Detects four types of brain conditions with high accuracy
- **Modern Web Interface**: Built with React and Vite for a smooth user experience
- **Real-time Processing**: Instant classification results with confidence scores
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

##  Project Structure

```
├── Backend/
│   ├── brain_tumor_classification.py    # Training script
│   ├── predict_brain_tumor.py           # Prediction script
│   ├── brain_tumor_app.py              # GUI application
│   ├── brain_tumor_model.h5            # Trained model
│   └── requirements.txt                # Python dependencies
│
├── Frontend/
│   ├── src/
│   │   ├── components/                 # React components
│   │   ├── pages/                     # Application pages
│   │   └── services/                  # API services
│   ├── public/                        # Static assets
│   └── package.json                   # Node.js dependencies
```

##  Technical Architecture

### Backend Model Architecture
- Pre-trained VGG16 network as feature extractor
- Custom classification layers:
  - Flatten layer
  - Dropout (30%)
  - Dense layer (256 neurons, ReLU)
  - Dropout (20%)
  - Softmax output (4 classes)

### Frontend Architecture
- React 18 with Vite for fast development
- Tailwind CSS for responsive styling
- RESTful API integration
- Real-time image processing and display

##  Getting Started

### Backend Setup

1. Create and activate the virtual environment:
   ```powershell
   python -m venv brain_tumor_env
   .\brain_tumor_env\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd brain-tumor-frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   ```

### Training the Model

Run the training script:
```powershell
python brain_tumor_classification.py
```

The script will:
- Load and preprocess the brain MRI images
- Display sample images from the training set
- Train the model using transfer learning with VGG16
- Save the trained model as 'brain_tumor_model.h5'
- Evaluate the model on the test set

##  Model Performance

The model achieves approximately 80% accuracy on the test set, demonstrating strong performance in medical image classification. Performance metrics include:

- Accuracy: ~80%
- Precision: ~78%
- Recall: ~76%
- F1-Score: ~77%

## 🌐 Web Interface Preview

### Upload Interface
![Upload Page](./public/screenshots/Screenshot 2025-08-24 221902.png)
*Intuitive drag-and-drop interface for MRI scan uploads*

### Analysis Dashboard
![Results Page](./public/screenshots/Screenshot_25-8-2025_1279_localhost.jpeg)
*AI-powered analysis with detailed classification results*

> Note: Screenshots are for illustration. The actual interface may vary slightly based on the latest updates.

##  Usage Examples

### API Endpoint Usage
```python
import requests

url = 'http://localhost:5000/predict'
files = {'image': open('mri_scan.jpg', 'rb')}
response = requests.post(url, files=files)
prediction = response.json()
```

### Web Interface
1. Open the application in your browser
2. Click "Upload Image" or drag and drop an MRI scan
3. View the classification results and confidence scores
4. Export or save the results as needed

## Important Notes

- This model is intended for research and educational purposes only
- Always consult healthcare professionals for medical diagnoses
- Model performance may vary with different MRI equipment and scan qualities
- Regular model updates and retraining are recommended for optimal performance

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


##  Acknowledgments

- Dataset provided by [Dataset Source]
- TensorFlow team for the excellent deep learning framework
- Medical professionals who helped in validating the model's performance
- For medical applications, this should be considered a research tool rather than a diagnostic tool
- Always consult medical professionals for actual diagnoses

## Future Improvements

- Implement cross-validation to ensure model robustness
- Add image preprocessing for better feature extraction
- Include more detailed metrics (precision, recall, F1 score)
- Add explainability features (heatmaps to show which regions influenced the prediction)
- Deploy as a web application for easier access
