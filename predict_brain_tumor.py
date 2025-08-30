import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img
from PIL import Image
import matplotlib.pyplot as plt

# Load the trained model
model = load_model('brain_tumor_model.h5')

# Define the class names based on your training data
class_names = sorted(os.listdir('Training/'))
print(f"Class names: {class_names}")

def predict_image(image_path):
    """
    Predict the class of a brain MRI image
    """
    # Load and preprocess the image
    img = load_img(image_path, target_size=(128, 128))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    
    # Make prediction
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_index]
    confidence = float(predictions[0][predicted_class_index])
    
    # Display results
    plt.figure(figsize=(8, 6))
    plt.imshow(img)
    plt.title(f"Prediction: {predicted_class} (Confidence: {confidence:.2f})")
    plt.axis('off')
    plt.show()
    
    print(f"Predicted class: {predicted_class}")
    print(f"Confidence: {confidence:.2f}")
    
    # Show all class probabilities
    for i, class_name in enumerate(class_names):
        print(f"{class_name}: {predictions[0][i]:.4f}")
    
    return predicted_class, confidence

# Example usage:
if __name__ == "__main__":
    import sys
    
    # Allow command line arguments for image path
    if len(sys.argv) > 1:
        test_image_path = sys.argv[1]
        print(f"Using provided image path: {test_image_path}")
    else:
        # Default test image if no argument is provided
        test_image_path = "Testing/glioma/Te-gl_0010.jpg"
        print(f"Using default test image: {test_image_path}")
    
    # Check if the file exists
    if not os.path.exists(test_image_path):
        print(f"File {test_image_path} not found. Please provide a valid image path.")
        # List some available test images
        print("\nAvailable test images:")
        for label in os.listdir("Testing/"):
            files = os.listdir(os.path.join("Testing/", label))
            if files:
                print(f"- Testing/{label}/{files[0]}")
                if len(files) > 1:
                    print(f"- Testing/{label}/{files[1]}")
        
        print("\nUsage: python predict_brain_tumor.py [image_path]")
        print("Example: python predict_brain_tumor.py Testing/meningioma/Te-me_0013.jpg")
    else:
        predict_image(test_image_path)
