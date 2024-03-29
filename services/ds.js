let dataStructure = {
    "PatientInformation": {
        "patientName": "",
        "patientid": "",
        "patientGender": "",
        "patientAddress": "",
        "patientContact": ""
    },
    "Prescription": [
        {
        "prescriptionNumber": "",
        "prescriptionDate": "",
        "doctorName": "",
        "medications": []
     }
    ],
    "MedicalReport": {
        "reportSummary": "",
        "hospital": "",
        "date": "",
        "recordNumber": "",
        "physician": [],
        "tests": []
    },
    "HospitalBill": {
        "hospital": "",
        "doctorName": "",
        "registrationNumber": "",
        "date": "",
        "consultationCharge": "",
        "totalAmount": ""
    },
    "insurancePolicy": {
            "number": "",
            "startDate": "",
            "endDate": "",
            "coverageType": "",
            "insuranceProvider": {
                "name": "",
                "contact": "",
                "address": ""
            },
            "charges": {
                "total": "",
                "insurancePayments": "",
                "patientPayments": "",
                "adjustments": ""
            }
    },
    "PharmacyBill": {
        "totalAmount": "",
        "payment": {
            "method": "",
            "transactionId": "",
            "amount": "",
            "date": ""
        }
    }
};

module.exports ={dataStructure}