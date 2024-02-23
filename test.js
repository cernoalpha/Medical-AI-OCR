let entry = `{
    "output": {
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
          "medications": [
            {
              "name": "",
              "dosage": "",
              "quantity": ""
            }
          ]
        }
      ],
      "MedicalReport": {
        "reportSummary": "",
        "hospital": "",
        "date": "",
        "recordNumber": "",
        "physician": [],
        "tests": [
          {
            "name": "",
            "result": ""
          }
        ]
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
    }
  }`;
  
  const jsonObject = JSON.parse(entry);

  if (jsonObject.output) {
    const outputNode = jsonObject.output;
    console.log(outputNode)
  } else {
    console.log("The JSON object does not contain the 'output' node.");
  }