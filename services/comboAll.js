const combine = (imageResponse) => {
    let jsonoArray = []
    imageResponse.forEach(entry => {
        if (entry.output) {
            entry = entry.output;
        }
        jsonoArray.push(entry)
        
    });
    const response = mergeJSONObjects(jsonoArray)
    return response;
}

function mergeJSONObjects(jsonObjects) {
    let mergedData = {
        "PatientInformation": {},
        "Prescription": [],
        "MedicalReport": {},
        "HospitalBill": {},
        "insurancePolicy": {
            "insuranceProvider": {},
            "charges": {}
        },
        "PharmacyBill": {
            "payment": {}
        }
    };

    jsonObjects.forEach(obj => {
        // Merge PatientInformation
        if (obj["PatientInformation"]) {
            Object.keys(obj["PatientInformation"]).forEach(key => {
                if (!mergedData["PatientInformation"][key] && obj["PatientInformation"][key] !== "") {
                    mergedData["PatientInformation"][key] = obj["PatientInformation"][key];
                }
            });
        }

        // Merge Prescription
        if (Array.isArray(obj["Prescription"])) {
            obj["Prescription"].forEach(prescription => {
                mergedData["Prescription"].push(prescription);
            });
        }

        // Merge MedicalReport
        if (obj["MedicalReport"]) {
            Object.keys(obj["MedicalReport"]).forEach(key => {
                if (Array.isArray(obj["MedicalReport"][key])) {
                    mergedData["MedicalReport"][key] = mergedData["MedicalReport"][key] || [];
                    mergedData["MedicalReport"][key] = mergedData["MedicalReport"][key].concat(obj["MedicalReport"][key]);
                } else if (!mergedData["MedicalReport"][key] && obj["MedicalReport"][key] !== "") {
                    mergedData["MedicalReport"][key] = obj["MedicalReport"][key];
                }
            });
        }

        // Merge HospitalBill
        if (obj["HospitalBill"]) {
            Object.keys(obj["HospitalBill"]).forEach(key => {
                if (!mergedData["HospitalBill"][key] && obj["HospitalBill"][key] !== "") {
                    mergedData["HospitalBill"][key] = obj["HospitalBill"][key];
                }
            });
        }

        // Merge insurancePolicy
        if (obj["insurancePolicy"]) {
            Object.keys(obj["insurancePolicy"]).forEach(key => {
                if (key === 'insuranceProvider' || key === 'charges') {
                    if (obj["insurancePolicy"][key]) {
                        Object.keys(obj["insurancePolicy"][key]).forEach(subKey => {
                            if (!mergedData["insurancePolicy"][key][subKey] && obj["insurancePolicy"][key][subKey] !== "") {
                                mergedData["insurancePolicy"][key][subKey] = obj["insurancePolicy"][key][subKey];
                            }
                        });
                    }
                } else if (!mergedData["insurancePolicy"][key] && obj["insurancePolicy"][key] !== "") {
                    mergedData["insurancePolicy"][key] = obj["insurancePolicy"][key];
                }
            });
        }

        // Merge PharmacyBill
        if (obj["PharmacyBill"]) {
            Object.keys(obj["PharmacyBill"]).forEach(key => {
                if (key === 'payment') {
                    if (obj["PharmacyBill"][key]) {
                        Object.keys(obj["PharmacyBill"][key]).forEach(subKey => {
                            if (!mergedData["PharmacyBill"][key][subKey] && obj["PharmacyBill"][key][subKey] !== "") {
                                mergedData["PharmacyBill"][key][subKey] = obj["PharmacyBill"][key][subKey];
                            }
                        });
                    }
                } else if (!mergedData["PharmacyBill"][key] && obj["PharmacyBill"][key] !== "") {
                    mergedData["PharmacyBill"][key] = obj["PharmacyBill"][key];
                }
            });
        }
    });

    return mergedData;
}


module.exports = { combine };
