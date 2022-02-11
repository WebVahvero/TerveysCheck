function calculateForm() {
    // Define and assing variables
    const name = document.getElementById('name').value;
    const heightcm = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const waist = document.getElementById('waist').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const freeActivity = document.getElementById('free-activity').value;
    const workActivity = document.getElementById('work-activity').value;
    
    // Check if variables are empty
    if (!name || !heightcm || !weight || !waist || !gender || !age || !freeActivity || !workActivity) {
        document.getElementById("text").innerHTML = "Täytä puuttuvat arvot";
    }
    else {
        const bmi = calculateBMI(heightcm, weight);
        const waistValue = checkWaist(waist, gender);
        const bmiComment = getBmiComment(bmi);
        const waistComment = getwaistComment(waistValue);
        const bmiTableRowId = getBmiTableRowId(bmi);
        const waistTableColumnId = getwaistTableColumnId(waistValue);
        const energyNeedFromAgeAndGender = getEnergyNeedFromAgeAndGender(weight, gender, age);
        const totalActivity = getTotalActivity(freeActivity, workActivity);

        // Calculate daily need for energy
        const totalKcalNeed = energyNeedFromAgeAndGender * totalActivity;
        const totalKjNeed = totalKcalNeed * 4.2;

        // Calculate daily need for macro nutritional values
        const need4carbohydrates = totalKcalNeed * 0.4 / 4;
        const need4proteinTop = totalKcalNeed * 0.4 / 4;
        const need4proteinBot = totalKcalNeed * 0.2 / 4;
        const need4fat = totalKcalNeed * 0.2 / 9;

        // Display data
        document.getElementById("text").innerHTML = name + " sinun bmi on " + bmi + " ja olet " + bmiComment + ". Sinun vyötärönympäryksesi " + waistComment;
        document.getElementById(bmiTableRowId).style.backgroundColor = "rgba(34, 209, 238, .5)";
        document.getElementById(waistTableColumnId).style.backgroundColor = "rgba(34, 209, 238, .5)";
        document.getElementById("carbohydrates").innerHTML = need4carbohydrates.toFixed(2) + " grammaa per päivä";
        document.getElementById("protein").innerHTML = need4proteinBot.toFixed(2) + "-" + need4proteinTop.toFixed(2) + " grammaa per päivä";
        document.getElementById("fat").innerHTML = need4fat.toFixed(2) + " grammaa per päivä";
        document.getElementById("kcal").innerHTML = totalKcalNeed.toFixed(2) + " kcal";
        document.getElementById("kj").innerHTML = totalKjNeed.toFixed(2) + " kj";

        if (gender === "male") {
            document.getElementById("a-vitamin").innerHTML = "900 mg";
            document.getElementById("b1-vitamin").innerHTML = "1,4 mg";
            document.getElementById("b2-vitamin").innerHTML = "1,7 mg";
            document.getElementById("b3-vitamin").innerHTML = "19 mg";
            document.getElementById("b6-vitamin").innerHTML = "1,6 mg";
            document.getElementById("folaatti").innerHTML = "300 mg";
            document.getElementById("b12-vitamin").innerHTML = "2 mg";
            document.getElementById("b5-vitamin").innerHTML = "4-7 mg";
            document.getElementById("h-vitamin").innerHTML = "30-100 mg";
            document.getElementById("c-vitamin").innerHTML = "75 mg";
            document.getElementById("d-vitamin").innerHTML = "7,5 mg";
            document.getElementById("e-vitamin").innerHTML = "10 mg";
            document.getElementById("k-vitamin").innerHTML = "Muodostuu elimistössä";
        }
        else {
            document.getElementById("a-vitamin").innerHTML = "700 mg";
            document.getElementById("b1-vitamin").innerHTML = "1,1 mg";
            document.getElementById("b2-vitamin").innerHTML = "1,1 mg";
            document.getElementById("b3-vitamin").innerHTML = "15 mg";
            document.getElementById("b6-vitamin").innerHTML = "1,2 mg";
            document.getElementById("folaatti").innerHTML = "300 mg";
            document.getElementById("b12-vitamin").innerHTML = "2 mg";
            document.getElementById("b5-vitamin").innerHTML = "4-7 mg";
            document.getElementById("h-vitamin").innerHTML = "30-100 mg";
            document.getElementById("c-vitamin").innerHTML = "75 mg";
            document.getElementById("d-vitamin").innerHTML = "7,5 mg";
            document.getElementById("e-vitamin").innerHTML = "8 mg";
            document.getElementById("k-vitamin").innerHTML = "Muodostuu elimistössä";
        }
    }
}

function calculateBMI(height, weight) {
    // Convert height from cm to m
    const heightm = height / 100;
    // Calculate BMI & return it
    const bmi = 1.3 * weight / Math.pow(heightm, 2.5);
    return bmi.toFixed(2);
}

// Check gender & waist diameter
function checkWaist(waist, gender) {
    if (gender === "male") {
        if (waist < 94) {
            return 1;
        }
        else if (waist >= 94 && waist <= 101) {
            return 2;
        }
        else {
            return 3;
        }
    } else {
        if (waist < 80) {
            return 1;
        }
        else if (waist >= 80 && waist <= 87) {
            return 2;
        }
        else {
            return 3;
        }
    }
}

// Check bmi value and give it a meaning
function getBmiComment(bmi) {
    if (bmi >= 0 && bmi <= 14.99) {
        return "sairaalloisen alipainoinen";
    }
    else if (bmi >= 15.00 && bmi <= 17.99) {
        return "merkittävästi alipainoinen";
    }
    else if (bmi >= 18.00 && bmi <= 18.99) {
        return "lievästi alipainoinen";
    }
    else if (bmi >= 19.00 && bmi <= 24.99) {
        return "normaalipainoinen";
    }
    else if (bmi >= 25.00 && bmi <= 29.99) {
        return "lievästi ylipainoinen";
    }
    else if (bmi >= 30.00 && bmi <= 34.99) {
        return "merkittävästi ylipainoinen";
    }
    else if (bmi >= 35.00 && bmi <= 39.99) {
        return "vaikeasti ylipainoinen";
    }
    else if (bmi >= 40.00) {
        return "sairaalloisen ylipainoinen";
    }
}

// Check waist value and give it a meaning
function getwaistComment(waistValue) {
    if (waistValue === 1) {
        return "on tavoitearvossa";
    } 
    else if (waistValue === 2) {
        return "aiheuttaa lievää terveyshaittaa";
    }
    else {
        return "aiheuttaa huomattavaa terveyshaittaa";
    }
}

function getBmiTableRowId(bmi) {
    if (bmi >= 0.00 && bmi <= 14.99) {
        return "sick-underweight";
    }
    else if (bmi >= 15.00 && bmi <= 17.99) {
        return "significant-underweight";
    }
    else if (bmi >= 18.00 && bmi <= 18.99) {
        return "slight-underweight";
    }
    else if (bmi >= 19.00 && bmi <= 24.99) {
        return "normal-weight";
    }
    else if (bmi >= 25.00 && bmi <= 29.99) {
        return "slight-overweight";
    }
    else if (bmi >= 30.00 && bmi <= 34.99) {
        return "significant-overweight";
    }
    else if (bmi >= 35.00 && bmi <= 39.99) {
        return "bad-overweight";
    }
    else if (bmi >= 40.00) {
        return "sick-overweight";
    }
}

function getwaistTableColumnId(waistValue) {
    switch (waistValue) {
        case 1:   
            return "normal-waist";
        case 2:
            return "slight-health-hazar";
        case 3:
            return "significant-health-hazar";
    }
}

function getEnergyNeedFromAgeAndGender(weight, gender, age) {
    if (gender === "male") {
        if (age === "young") {
            return 15.3 * weight + 679;
        } 
        else if (age === "middleage") {
            return 11.6 * weight + 879;
        }
        else {
            return 13.5 * weight + 487;
        }
    } 
    else {
        if (age === "young") {
            return 14.7 * weight + 496;
        } 
        else if (age === "middleage") {
            return 8.7 * weight + 829;
        }
        else {
            return 10.5 * weight + 596;
        }
    }
}

function getTotalActivity(freeActivity, workActivity) {
    if (freeActivity === "not-free-active") {
        if (workActivity === "not-work-active") {
            return 1.3;
        } else if (workActivity === "bit-work-active") {
            return 1.5;
        } else {
            return 1.7;
        }
    }
    else if (freeActivity === "bit-free-active") {
        if (workActivity === "not-work-active") {
            return 1.5;
        } else if (workActivity === "bit-work-active") {
            return 1.7;
        } else {
            return 1.9;
        }
    }
    else if (freeActivity === "daily-free-active") {
        if (workActivity === "not-work-active") {
            return 1.7;
        } else if (workActivity === "bit-work-active") {
            return 1.9;
        } else {
            return 2.1;
        }
    }
    else {
        if (workActivity === "not-work-active") {
            return 2.0;
        } else if (workActivity === "bit-work-active") {
            return 2.2;
        } else {
            return 2.4;
        }
    }
}