const express = require('express');
const multer = require('multer');
const { preprocessImage } = require('./preprocess'); // Import the preprocessing function
const { performOCR } = require('./ocr'); // Import the OCR function

const router = express.Router();

// Configure multer for in-memory storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Endpoint for image upload
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Preprocess the image using the buffer from memory
    const processedImagePath = await preprocessImage(req.file.buffer);

    // Perform OCR on the processed image
    const recognizedText = await performOCR(processedImagePath);

    // Send the recognized text and path of the processed image in the response
    res.status(200).send({
      message: 'File uploaded, processed, and text recognized successfully!',
      processedImagePath, // Path of the processed image
      recognizedText, // Recognized text from the image
    });
  } catch (error) {
    console.error('Error processing the image:', error);
    res.status(500).send('Error processing the image.');
  }
});

module.exports = router;
