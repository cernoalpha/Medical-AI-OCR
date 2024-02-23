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
                {
                    inlineData: {
                        mimeType: `image/jpeg`,
                        data: item.data
                    }
                },
                { text: "\n \"output: {    \\\"PatientInformation\\\": {        \\\"patientName\\\": \\\"\\\",        \\\"patientid\\\": \\\"\\\",        \\\"patientGender\\\": \\\"\\\",        \\\"patientAddress\\\": \\\"\\\",        \\\"patientContact\\\": \\\"\\\"    },    \\\"Prescription\\\": [        {        \\\"prescriptionNumber\\\": \\\"\\\",        \\\"prescriptionDate\\\": \\\"\\\",        \\\"doctorName\\\": \\\"\\\",        \\\"medications\\\": [            {                \\\"name\\\": \\\"\\\",                \\\"dosage\\\": \\\"\\\",                \\\"quantity\\\": \\\"\\\"            }        ]     }    ],    \\\"MedicalReport\\\": {        \\\"reportSummary\\\": \\\"\\\",        \\\"hospital\\\": \\\"\\\",        \\\"date\\\": \\\"\\\",        \\\"recordNumber\\\": \\\"\\\",        \\\"physician\\\": [],        \\\"tests\\\": [            {                \\\"name\\\": \\\"\\\",                \\\"result\\\": \\\"\\\"            }        ]    },    \\\"HospitalBill\\\": {        \\\"hospital\\\": \\\"\\\",        \\\"doctorName\\\": \\\"\\\",        \\\"registrationNumber\\\": \\\"\\\",        \\\"date\\\": \\\"\\\",        \\\"consultationCharge\\\": \\\"\\\",        \\\"totalAmount\\\": \\\"\\\"           },    \\\"insurancePolicy\\\": {            \\\"number\\\": \\\"\\\",            \\\"startDate\\\": \\\"\\\",            \\\"endDate\\\": \\\"\\\",            \\\"coverageType\\\": \\\"\\\",            \\\"insuranceProvider\\\": {                \\\"name\\\": \\\"\\\",                \\\"contact\\\": \\\"\\\",                \\\"address\\\": \\\"\\\"            },            \\\"charges\\\": {                \\\"total\\\": \\\"\\\",                \\\"insurancePayments\\\": \\\"\\\",                \\\"patientPayments\\\": \\\"\\\",                \\\"adjustments\\\": \\\"\\\"            }    },    \\\"PharmacyBill\\\": {        \\\"totalAmount\\\": \\\"\\\",        \\\"payment\\\": {            \\\"method\\\": \\\"\\\",            \\\"transactionId\\\": \\\"\\\",            \\\"amount\\\": \\\"\\\",            \\\"date\\\": \\\"\\\"        }    }}\"\n\nRead the medical details and fill in the given correct json format\n" },
            ];

            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings
            });
            // return { item ,success: false};
            return JSON.parse(result.response.text())

        } catch (error) {
            return { item, success: false };
        }
    })

    const geminiResponses = await Promise.all(gemeniRequests);

    const retryRequests = geminiResponses.filter(response => response.success === false)

    if (retryRequests.length) {
        console.log("Retrying")

        const failedRequests = retryRequests.map(async failedResponse => {
            const item = failedResponse.item;

            try {
                const parts = [
                    {
                        inlineData: {
                            mimeType: `image/jpeg`,
                            data: item.data
                        }
                    },
                    { text: "\n \"output: {    \\\"PatientInformation\\\": {        \\\"patientName\\\": \\\"\\\",        \\\"patientid\\\": \\\"\\\",        \\\"patientGender\\\": \\\"\\\",        \\\"patientAddress\\\": \\\"\\\",        \\\"patientContact\\\": \\\"\\\"    },    \\\"Prescription\\\": [        {        \\\"prescriptionNumber\\\": \\\"\\\",        \\\"prescriptionDate\\\": \\\"\\\",        \\\"doctorName\\\": \\\"\\\",        \\\"medications\\\": [            {                \\\"name\\\": \\\"\\\",                \\\"dosage\\\": \\\"\\\",                \\\"quantity\\\": \\\"\\\"            }        ]     }    ],    \\\"MedicalReport\\\": {        \\\"reportSummary\\\": \\\"\\\",        \\\"hospital\\\": \\\"\\\",        \\\"date\\\": \\\"\\\",        \\\"recordNumber\\\": \\\"\\\",        \\\"physician\\\": [],        \\\"tests\\\": [            {                \\\"name\\\": \\\"\\\",                \\\"result\\\": \\\"\\\"            }        ]    },    \\\"HospitalBill\\\": {        \\\"hospital\\\": \\\"\\\",        \\\"doctorName\\\": \\\"\\\",        \\\"registrationNumber\\\": \\\"\\\",        \\\"date\\\": \\\"\\\",        \\\"consultationCharge\\\": \\\"\\\",        \\\"totalAmount\\\": \\\"\\\"           },    \\\"insurancePolicy\\\": {            \\\"number\\\": \\\"\\\",            \\\"startDate\\\": \\\"\\\",            \\\"endDate\\\": \\\"\\\",            \\\"coverageType\\\": \\\"\\\",            \\\"insuranceProvider\\\": {                \\\"name\\\": \\\"\\\",                \\\"contact\\\": \\\"\\\",                \\\"address\\\": \\\"\\\"            },            \\\"charges\\\": {                \\\"total\\\": \\\"\\\",                \\\"insurancePayments\\\": \\\"\\\",                \\\"patientPayments\\\": \\\"\\\",                \\\"adjustments\\\": \\\"\\\"            }    },    \\\"PharmacyBill\\\": {        \\\"totalAmount\\\": \\\"\\\",        \\\"payment\\\": {            \\\"method\\\": \\\"\\\",            \\\"transactionId\\\": \\\"\\\",            \\\"amount\\\": \\\"\\\",            \\\"date\\\": \\\"\\\"        }    }}\"\n\nRead the medical details and fill in the given correct json format\n" },
                ];

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings
                });
                return JSON.parse(result.response.text())

            } catch (error) {
                return { item, success: false };
            }
        })
        const retryResponses = await Promise.all(failedRequests);

        const allResponses = geminiResponses
            .filter(response => response.success !== false)
            .concat(retryResponses.filter(response => response.success !== false));

        return allResponses;
    } else {
        return geminiResponses
    }

};

module.exports = { processImage };
