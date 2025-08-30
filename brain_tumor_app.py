import os
import numpy as np
import tkinter as tk
from tkinter import filedialog, Label, Button, Frame
from PIL import Image, ImageTk
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img

class BrainTumorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Brain Tumor Classification")
        self.root.geometry("800x600")
        
        # Load the model
        try:
            self.model = load_model('brain_tumor_model.h5')
            self.class_names = sorted(os.listdir('Training/'))
            print(f"Model loaded successfully. Classes: {self.class_names}")
        except Exception as e:
            print(f"Error loading model: {e}")
            self.model = None
            self.class_names = []
        
        # Create UI elements
        self.create_widgets()
    
    def create_widgets(self):
        # Top frame for title and instructions
        top_frame = Frame(self.root)
        top_frame.pack(fill=tk.X, padx=10, pady=10)
        
        title = Label(top_frame, text="Brain Tumor MRI Classifier", font=("Arial", 18, "bold"))
        title.pack(pady=5)
        
        instructions = Label(top_frame, text="Select a brain MRI image to classify")
        instructions.pack(pady=5)
        
        # Middle frame for image display and results
        self.middle_frame = Frame(self.root)
        self.middle_frame.pack(expand=True, fill=tk.BOTH, padx=10, pady=10)
        
        # Image display area
        self.image_label = Label(self.middle_frame, text="No image selected", height=15)
        self.image_label.pack(expand=True, fill=tk.BOTH)
        
        # Results display
        self.result_label = Label(self.middle_frame, text="", font=("Arial", 12))
        self.result_label.pack(pady=10)
        
        # Confidence scores
        self.confidence_frame = Frame(self.middle_frame)
        self.confidence_frame.pack(fill=tk.X, pady=5)
        
        # Bottom frame for buttons
        bottom_frame = Frame(self.root)
        bottom_frame.pack(fill=tk.X, padx=10, pady=10)
        
        # Select image button
        select_button = Button(bottom_frame, text="Select Image", command=self.select_image)
        select_button.pack(side=tk.LEFT, padx=5)
        
        # Exit button
        exit_button = Button(bottom_frame, text="Exit", command=self.root.quit)
        exit_button.pack(side=tk.RIGHT, padx=5)
    
    def select_image(self):
        # Open file dialog to select an image
        file_path = filedialog.askopenfilename(
            title="Select Brain MRI Image",
            filetypes=[("Image files", "*.jpg *.jpeg *.png")]
        )
        
        if file_path:
            self.display_and_predict(file_path)
    
    def display_and_predict(self, image_path):
        # Display the selected image
        img = Image.open(image_path)
        img = img.resize((300, 300), Image.LANCZOS)
        img_tk = ImageTk.PhotoImage(img)
        
        self.image_label.config(image=img_tk, text="")
        self.image_label.image = img_tk  # Keep a reference
        
        if self.model is None:
            self.result_label.config(text="Error: Model not loaded")
            return
        
        # Preprocess image for prediction
        input_img = load_img(image_path, target_size=(128, 128))
        input_arr = np.array(input_img) / 255.0
        input_arr = np.expand_dims(input_arr, axis=0)
        
        # Make prediction
        try:
            predictions = self.model.predict(input_arr, verbose=0)
            predicted_class_index = np.argmax(predictions[0])
            predicted_class = self.class_names[predicted_class_index]
            confidence = float(predictions[0][predicted_class_index])
            
            # Update result label
            self.result_label.config(
                text=f"Prediction: {predicted_class}\nConfidence: {confidence:.2f}",
                fg="green" if confidence > 0.7 else "orange"
            )
            
            # Clear previous confidence scores
            for widget in self.confidence_frame.winfo_children():
                widget.destroy()
            
            # Display all class confidences
            for i, class_name in enumerate(self.class_names):
                conf_text = f"{class_name}: {predictions[0][i]:.4f}"
                color = "black"
                if i == predicted_class_index:
                    conf_text += " ✓"
                    color = "blue"
                
                conf_label = Label(self.confidence_frame, text=conf_text, fg=color)
                conf_label.pack(anchor=tk.W)
                
        except Exception as e:
            self.result_label.config(text=f"Error during prediction: {e}")
            print(f"Prediction error: {e}")

if __name__ == "__main__":
    root = tk.Tk()
    app = BrainTumorApp(root)
    root.mainloop()
