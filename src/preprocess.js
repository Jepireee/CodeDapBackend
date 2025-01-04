const sharp = require('sharp');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

// Function to delete all files in a directory
function deleteFilesInDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return reject('Error reading directory: ' + err);
      }
      if (files.length === 0) {
        return resolve();  // No files to delete
      }

      const deletePromises = files.map(file => {
        const filePath = path.join(directoryPath, file);
        return new Promise((resolve, reject) => {
          fs.unlink(filePath, (err) => {
            if (err) {
              reject(`Error deleting file: ${filePath}`);
            } else {
              resolve();
            }
          });
        });
      });

      // Wait for all delete operations to complete
      Promise.all(deletePromises)
        .then(() => resolve())
        .catch(reject);
    });
  });
}

// Preprocess the image using Jimp and Sharp (for buffer input)
async function preprocessImage(imageBuffer) {
  try {
    // Ensure the preprocessed folder exists
    const preprocessedDir = path.join(__dirname, 'preprocessed');
    if (!fs.existsSync(preprocessedDir)) {
      fs.mkdirSync(preprocessedDir);
    }

    // Delete all files in the preprocessed directory before processing
    await deleteFilesInDirectory(preprocessedDir);
    console.log('All files in preprocessed directory have been deleted.');

    // Load the image using Jimp (from buffer)
    const image = await Jimp.read(imageBuffer);

    // Convert image to grayscale and adjust contrast
    image.grayscale();
    image.contrast(0.5); // Adjust contrast to make text clearer

    // Get the image buffer after Jimp processing (instead of saving it)
    const jimpBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // Now use Sharp for additional processing (resize, etc.)
    const processedFileName = `final_${Date.now()}.png`;
    const finalProcessedPath = path.join(preprocessedDir, processedFileName);
    
    // Resize the image with Sharp, using the buffer from Jimp
    await sharp(jimpBuffer)
      .resize(800)  // Resize to a width of 800px (maintaining aspect ratio)
      .toFile(finalProcessedPath);  // Save the final processed image

    console.log('Image processed and saved as:', finalProcessedPath);
    return finalProcessedPath; // Return path of the final processed image
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw error;
  }
}

module.exports = { preprocessImage };
