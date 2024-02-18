const { processImage } = require('./imageProcessor')
const { processPDF } = require('./pdfHandler')
const { compressImages } = require('./compressImages')
const { combine } = require('./comboAll')
const { textAi } = require('./textAi');


const imageAi = async (req, res) => {
    errorOccurred = {
        status: false,
        flag: 0
    }

    try {
        const files = req.files;
        if(Object.keys(files).length === 0){
            errorOccurred.status = true
            errorOccurred.flag = 3
        }
        const fileProcessingPromises = [];
        const compressedImages = [];
       

        files.forEach((file, index) => {
            console.log(`File ${index + 1}:`);
            console.log(`- Original Name: ${file.originalname}`);
            console.log(`- Size: ${file.size} bytes`);
            console.log(`- MIME Type: ${file.mimetype}`);
            console.log('------------------------');

            if (file.size > 15 * 1024 * 1024) {
                errorOccurred.status = true
                errorOccurred.flag = 1
            }

            if (file.mimetype.startsWith('image/')) {
                console.log("Compressing");
                const imageBuffer = file.buffer;
                const promise = compressImages(imageBuffer, file.size);
                fileProcessingPromises.push(promise);
            }
            else if (file.mimetype === 'application/pdf') {
                const promise = processPDF(file);
                fileProcessingPromises.push(promise);
            }
            else {
                errorOccurred.status = true
                errorOccurred.flag = 2

            }
        });

        const fileProcessingResults = await Promise.all(fileProcessingPromises);

        if (errorOccurred.status) {
            if (errorOccurred.flag == 1) {
                res.status(500).json({ error: "File size too large" });
            }
            else if (errorOccurred.flag == 2) {
                res.status(500).json({ error: "Incorrect File type" });
            }
            else if (errorOccurred.flag == 3) {
                res.status(500).json({ error: "Files not received" });
            }
        }
        else {

            fileProcessingResults.forEach(result => {
                if (Array.isArray(result)) {
                    compressedImages.push(...result);
                } else {
                    compressedImages.push(result);
                }
            });

            const fileData = compressedImages.map(file => ({
                data: file.toString('base64'),
                size: file.length
            }));

            console.log("Extracting Data")
            const ImageResponses = await processImage(fileData)
            // console.log(ImageResponses.join())

            console.log("Consolidating")
            let [combinedObject, errorResponse] = combine(ImageResponses)

            if (errorResponse.length === 0) {
                console.log("Sent")
                res.status(200).json(combinedObject);
            }
            else {
                console.log("Correcting")
                const response = await textAi(combinedObject, errorResponse)
                console.log("Sent")
                res.status(200).json({ "partiallyCorrectResponse": combinedObject, "attemptedCorrectionResponse": response });
            }
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { imageAi };
