import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaImage, FaTimesCircle } from 'react-icons/fa';

const ImageUploader = ({ onImageSelected }) => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setError('');

        if (acceptedFiles.length === 0) {
            return;
        }

        const file = acceptedFiles[0];

        // Check file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPEG, PNG, etc.)');
            return;
        }

        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size too large (max 5MB)');
            return;
        }

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        // Pass the file to parent component
        onImageSelected(file);

        // Clean up preview URL when component unmounts
        return () => URL.revokeObjectURL(previewUrl);
    }, [onImageSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
        },
        maxFiles: 1,
    });

    const removeImage = () => {
        setPreview(null);
        onImageSelected(null);
    };

    return (
        <div className="mt-4">
            {!preview ? (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                        }`}
                >
                    <input {...getInputProps()} />
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-lg font-medium text-gray-700">
                        {isDragActive
                            ? 'Drop the image here...'
                            : 'Drag & drop an MRI image, or click to select'}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Supports JPG, JPEG, PNG and GIF up to 5MB
                    </p>
                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>
            ) : (
                <div className="relative">
                    <div className="flex items-center justify-center border rounded-lg overflow-hidden">
                        <img
                            src={preview}
                            alt="Brain MRI preview"
                            className="max-h-96 object-contain"
                        />
                    </div>
                    <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition-colors"
                        aria-label="Remove image"
                    >
                        <FaTimesCircle className="h-6 w-6 text-red-500" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
