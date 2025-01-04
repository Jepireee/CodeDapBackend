const Tesseract = require('tesseract.js');

// Function to perform OCR on a processed image
async function performOCR(imagePath) {
  try {
    // Call Tesseract OCR on the imagePath, specifying the language ('eng' for English)
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
      
      // Optional logger to monitor OCR progress (prints to console)
      logger: (m) => console.log(m),

      // Whitelist the characters that OCR should recognize, ensuring code characters like brackets are included
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789();{}<>+-*/=% \t\n',

      // Page segmentation mode 4: assumes a single column of text with varying font sizes (ideal for code)
      psm: 4,
    });
    
    // Output the raw text recognized by Tesseract
    console.log('Raw OCR text:', text);

    // Return the OCR text as is, without any trimming or modification to indentation
    console.log('Formatted text:', text);
    
    // Return the text with its original indentation preserved
    return text;
  } catch (error) {
    // Log any errors that occur during OCR processing
    console.error('Error performing OCR:', error);
    
    // Rethrow the error to be handled elsewhere
    throw error;
  }
}

module.exports = { performOCR };
