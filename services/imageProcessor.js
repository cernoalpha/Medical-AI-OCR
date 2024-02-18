const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const processImage = async (files) => {

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const generationConfig = {
        temperature: 0.1,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
    };


    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];

    const gemeniRequests = files.map(async item => {
        try {
            const parts = [
                // {text: "output: {    \"PatientInformation\": {        \"patientName\": \"\",        \"patientid\": \"\",        \"patientGender\": \"\",        \"patientAddress\": \"\",        \"patientContact\": \"\"    },    \"Prescription\": [        {        \"prescriptionNumber\": \"\",        \"prescriptionDate\": \"\",        \"doctorName\": \"\",        \"medications\": [            {                \"name\": \"\",                \"dosage\": \"\",                \"quantity\": \"\"            }        ]     }    ],    \"MedicalReport\": {        \"reportSummary\": \"\",        \"hospital\": \"\",        \"date\": \"\",        \"recordNumber\": \"\",        \"physician\": [],        \"tests\": [            {                \"name\": \"\",                \"result\": \"\"            }        ]    },    \"HospitalBill\": {        \"hospital\": \"\",        \"doctorName\": \"\",        \"registrationNumber\": \"\",        \"date\": \"\",        \"consultationCharge\": \"\",        \"totalAmount\": \"\"           },    \"insurancePolicy\": {            \"number\": \"\",            \"startDate\": \"\",            \"endDate\": \"\",            \"coverageType\": \"\",            \"insuranceProvider\": {                \"name\": \"\",                \"contact\": \"\",                \"address\": \"\"            },            \"charges\": {                \"total\": \"\",                \"insurancePayments\": \"\",                \"patientPayments\": \"\",                \"adjustments\": \"\"            }    },    \"PharmacyBill\": {        \"totalAmount\": \"\",        \"payment\": {            \"method\": \"\",            \"transactionId\": \"\",            \"amount\": \"\",            \"date\": \"\"        }    }}"},
                {
                    inlineData: {
                        mimeType: `image/jpeg`,
                        data: item.data
                    }
                },
                // { text: "\nRead the medical details and fill in the given correct json format" },
                {text: "\n \"output: {    \\\"PatientInformation\\\": {        \\\"patientName\\\": \\\"\\\",        \\\"patientid\\\": \\\"\\\",        \\\"patientGender\\\": \\\"\\\",        \\\"patientAddress\\\": \\\"\\\",        \\\"patientContact\\\": \\\"\\\"    },    \\\"Prescription\\\": [        {        \\\"prescriptionNumber\\\": \\\"\\\",        \\\"prescriptionDate\\\": \\\"\\\",        \\\"doctorName\\\": \\\"\\\",        \\\"medications\\\": [            {                \\\"name\\\": \\\"\\\",                \\\"dosage\\\": \\\"\\\",                \\\"quantity\\\": \\\"\\\"            }        ]     }    ],    \\\"MedicalReport\\\": {        \\\"reportSummary\\\": \\\"\\\",        \\\"hospital\\\": \\\"\\\",        \\\"date\\\": \\\"\\\",        \\\"recordNumber\\\": \\\"\\\",        \\\"physician\\\": [],        \\\"tests\\\": [            {                \\\"name\\\": \\\"\\\",                \\\"result\\\": \\\"\\\"            }        ]    },    \\\"HospitalBill\\\": {        \\\"hospital\\\": \\\"\\\",        \\\"doctorName\\\": \\\"\\\",        \\\"registrationNumber\\\": \\\"\\\",        \\\"date\\\": \\\"\\\",        \\\"consultationCharge\\\": \\\"\\\",        \\\"totalAmount\\\": \\\"\\\"           },    \\\"insurancePolicy\\\": {            \\\"number\\\": \\\"\\\",            \\\"startDate\\\": \\\"\\\",            \\\"endDate\\\": \\\"\\\",            \\\"coverageType\\\": \\\"\\\",            \\\"insuranceProvider\\\": {                \\\"name\\\": \\\"\\\",                \\\"contact\\\": \\\"\\\",                \\\"address\\\": \\\"\\\"            },            \\\"charges\\\": {                \\\"total\\\": \\\"\\\",                \\\"insurancePayments\\\": \\\"\\\",                \\\"patientPayments\\\": \\\"\\\",                \\\"adjustments\\\": \\\"\\\"            }    },    \\\"PharmacyBill\\\": {        \\\"totalAmount\\\": \\\"\\\",        \\\"payment\\\": {            \\\"method\\\": \\\"\\\",            \\\"transactionId\\\": \\\"\\\",            \\\"amount\\\": \\\"\\\",            \\\"date\\\": \\\"\\\"        }    }}\"\n\nRead the medical details and fill in the given correct json format\n"},
  
            ];

            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings
            });
            return result.response.text()
        } catch (error) {
            return { success: false, error: error.message };
        }
    })
    const geminiResponses = await Promise.all(gemeniRequests);
    return geminiResponses;


};

module.exports = { processImage };
