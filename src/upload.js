const express = require('express');
const multer = require('multer');
const { preprocessImage } = require('./preprocess'); // Import the preprocessing function
const { performOCR } = require('./ocr'); // Import the OCR function

const router = express.Router();

// Configure multer for in-memory storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Function to detect the language of the recognized text
function detectLanguage(code) {
  const pythonKeywords = ['def', 'import', 'print', 'self', 'lambda', 'async', 'await'];
  const javaKeywords = ['class', 'public', 'static', 'void', 'new', 'extends', 'implements'];
  const cppKeywords = ['#include', 'cout', 'cin', 'std', '->', '::', 'template', 'int main'];


  if (javaKeywords.some((keyword) => code.includes(keyword))) {
    return 'Java';
  }

  if (cppKeywords.some((keyword) => code.includes(keyword))) {
    return 'C++';
  }

  if (pythonKeywords.some((keyword) => code.includes(keyword))) {
    return 'Python';
  }

  return 'Unknown';
}

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

    // Validate the language of the recognized text
    const detectedLanguage = detectLanguage(recognizedText);

    // Send the recognized text, detected language, and path of the processed image in the response
    res.status(200).send({
      message: 'File uploaded, processed, and text recognized successfully!',
      processedImagePath, // Path of the processed image
      recognizedText, // Recognized text from the image
      detectedLanguage, // Detected programming language
    });
  } catch (error) {
    console.error('Error processing the image:', error);
    res.status(500).send('Error processing the image.');
  }
});

module.exports = router;
