const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCl9_IV6lYspkx4sYL7nZl-xhZj8yfh2EA");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const textAi = async (correctJson, incorrectJson) => {
    try {

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 30000,
        };

        const parts = [
            { text: JSON.stringify(correctJson) },
            { text: '\n' + incorrectJson.join("\n") },
            { text: '\ncombine together in a correct syntax' },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
        });
        let correctedJson = result.response.text()
        return correctedJson;

    } catch (error) {
        return { success: false, damagedData: incorrectJson.join("\n") };
    }
}

const token = async (data)=>{
    const { totalTokens } = await model.countTokens(data);
    return totalTokens
}


module.exports = { textAi }

