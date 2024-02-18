const sharp = require('sharp');

async function compressImages(imageBuffer, fileSize) {
    try {
         if (fileSize > 3.5 * 1024 * 1024) {
            console.log('File size exceeds 3.5MB. Compressing...');
            const compressedImage = await sharp(imageBuffer)
                .resize({ width: 800 })
                .jpeg({ quality: 70 })
                .toBuffer({ resolveWithObject: true });

            console.log("Compression Complete");
            return compressedImage.data;
        } else {
            const compressedImage = await sharp(imageBuffer)
                .resize({ width: 800 })
                .jpeg({ quality: 100 })
                .toBuffer({ resolveWithObject: true });

            console.log("Compression Complete");
            return compressedImage.data;
        }
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
}

module.exports = { compressImages };
