import os
import numpy as np
import random
from PIL import Image, ImageEnhance
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Dense, Flatten, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.applications import VGG16
from sklearn.utils import shuffle

# Update paths to your local directory structure
train_dir = 'Training/'
test_dir = 'Testing/'

# Get training paths and labels
train_path = []
train_label = []

for label in os.listdir(train_dir):
    for image in os.listdir(os.path.join(train_dir, label)):
        train_path.append(os.path.join(train_dir, label, image))
        train_label.append(label)

train_path, train_label = shuffle(train_path, train_label)

# Get testing paths and labels
test_path = []
test_label = []

for label in os.listdir(test_dir):
    for image in os.listdir(os.path.join(test_dir, label)):
        test_path.append(os.path.join(test_dir, label, image))
        test_label.append(label)

test_path, test_label = shuffle(test_path, test_label)

# Visualize random images from training set
def visualize_samples():
    random_indices = random.sample(range(len(train_path)), 10)
    fig, axes = plt.subplots(2, 5, figsize=(15, 6))
    axes = axes.ravel()

    for i, index in enumerate(random_indices):  
        image_path = train_path[index]
        label = train_label[index]
        img = Image.open(image_path)
        axes[i].imshow(img)
        axes[i].set_title(f"Label: {label}")
        axes[i].axis('off')

    plt.tight_layout()
    plt.show()

# Image augmentation function
def augment_image(image):
    image = Image.fromarray(np.uint8(image))
    image = ImageEnhance.Brightness(image).enhance(random.uniform(0.8, 1.2))
    image = ImageEnhance.Contrast(image).enhance(random.uniform(0.8, 1.2))
    image = ImageEnhance.Sharpness(image).enhance(random.uniform(0.8, 1.2))
    image = np.array(image) / 255.0
    return image

def open_images(paths):
    images = []
    for path in paths:
        image = load_img(path, target_size=(128, 128))
        image = np.array(image) / 255.0
        images.append(image)
    return np.array(images)

def encode_label(label):
    unique_labels = sorted(os.listdir(train_dir))
    encoded = [unique_labels.index(l) for l in label]  # Use 'l' for clarity
    return encoded

def datagen(path, label, batch_size=12, epochs=1):
    unique_labels = sorted(os.listdir(train_dir))
    for _ in range(epochs):
        for i in range(0, len(path), batch_size):
            batch_path = path[i:i+batch_size]
            batch_images = open_images(batch_path)
            batch_labels = np.array(encode_label(label[i:i+batch_size])).reshape(-1, 1)
            yield batch_images, batch_labels

# Model definition
IMAGE_SIZE = 128
def create_model():
    base_model = VGG16(input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3), include_top=False, weights='imagenet')
    for layer in base_model.layers:
        layer.trainable = False
    # Fine-tune the last few layers
    base_model.layers[-2].trainable = True
    base_model.layers[-3].trainable = True
    base_model.layers[-4].trainable = True

    model = Sequential()
    model.add(Input(shape=(IMAGE_SIZE, IMAGE_SIZE, 3)))
    model.add(base_model)
    model.add(Flatten())
    model.add(Dropout(0.3))
    model.add(Dense(256, activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(len(os.listdir(train_dir)), activation='softmax'))
    
    model.compile(
        optimizer=Adam(learning_rate=0.0001), 
        loss='sparse_categorical_crossentropy', 
        metrics=['sparse_categorical_accuracy']
    )
    return model

def train_model():
    model = create_model()
    # Print model summary
    model.summary()
    
    batch_size = 20
    steps = int(len(train_path) / batch_size)
    epochs = 5

    # Train the model
    history = model.fit(
        datagen(train_path, train_label, batch_size), 
        epochs=epochs, 
        steps_per_epoch=steps
    )
    
    # Save the model
    model.save('brain_tumor_model.h5')
    return history, model

def evaluate_model(model):
    # Evaluate the model on test data
    test_images = open_images(test_path)
    test_labels = np.array(encode_label(test_label)).reshape(-1, 1)
    
    loss, accuracy = model.evaluate(test_images, test_labels)
    print(f"Test accuracy: {accuracy:.4f}")
    return loss, accuracy

if __name__ == "__main__":
    print("Visualizing sample images...")
    visualize_samples()
    
    print("Training model...")
    history, model = train_model()
    
    print("Evaluating model...")
    evaluate_model(model)
