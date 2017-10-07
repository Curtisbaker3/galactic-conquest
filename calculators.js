function calculateIndividualPlanetIncomes() { //static function that does not increment income values, just sets it to it's current actual this turn based on pop
    for (var i = 0; i < planets.length; i++) {
        baseRate = planets[i].tax/2
        planets[i].income = planets[i].population * baseRate - planets[i].upkeep - (0 * planets[i].randomIncomeModifier + 0) - planets[i].expenses + planets[i].incomeBonuses; //random income modifier not in use currently
    }
}

function addPlanetaryResource(tempResource) {
    for (var i = 0; i < planets.length; i++) {
        planets[i][tempResource] += planets[i][tempResource + 'Generated'] * globalProductionFactor[tempResource];
        console.log(planets[i].name + 'resource level: ' + planets[i][tempResource]);
        if (planets[i].level >= planetLevelOfResource[tempResource]) {
            var currentLevel = 'some';
            if (planets[i][tempResource] <= 0) {currentLevel = 'none'}       
        }
    } 
}

function deductPlanetaryResource(tempResource) {
    for (var i = 0; i < planets.length; i++) {
        if (planets[i].level >= planetLevelOfResource[tempResource]) {
        planets[i][tempResource] -= (planets[i][tempResource + 'UsageFactor'] * planets[i].population * .1);
        console.log(planets[i].name + 'resource level: ' + planets[i][tempResource]);
        }
        if (planets[i][tempResource] < 0) {
            planets[i].population += (planets[i][tempResource]);
            planets[i][tempResource] = 0
        console.log(planets[i].name + 'resource level: ' + planets[i][tempResource]);
        //if (currentLevel != 'none' && currentLevel == 'some') {
        //    alert('planet ' + planets[i].name + ' out of ' + tempResource + '!');
        //}
        
        }
    }
}

document.getElementById('LOCDIV').style.display = 'none';
var goldPlanetsCount = 0;
var maxLOC = 0;

function calculateInvaders(i) {
    return ((planets[i].population * Math.random() * .1) + .35 * Math.pow(TurnCount, 1.01) + TurnCount) * .5
}

function calculateMaxLOC() {
    var totalPopulation = calculateTotalPopulation();
    maxLOC = (150 * goldPlanetsCount) + (totalPopulation * goldPlanetsCount * .1);
    document.getElementById('maxLOC').innerText = maxLOC.toFixed(0);
}

var currentLOC = 0;
var transactionfeeLOC = 10;
function takeLOC() {
    var cashInput;
    var promptInput = prompt("Enter amount to borrow:", "$100");
    var parsed = Number(promptInput);
    if (isNaN(parsed)) {
        return;
    }
    if (promptInput == null || promptInput == "") {
        cashInput = 0;
    } else {
        cashInput = Number(promptInput);
    }
    if (currentLOC + cashInput > maxLOC) {
        x = maxLOC - currentLOC;
        alert('Cannot go above maximum LOC, you have been given ' + formatMoney(x));
        cashInput = x;
    }
    if (currentLOC + cashInput < 0) {
        x = currentLOC * -1;
        cashInput = x;
    }
    money += cashInput;
    money -= transactionfeeLOC; //transaction fee for exchanging
    currentLOC += cashInput;
    document.getElementById('currentLOC').innerText = currentLOC.toFixed(0);      
    drawMoney();
    drawIncome(calculateIncome());
}


drawTotalPopulation(70);
function calculateTotalPopulation() {
    var totalPopulation = 0
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        totalPopulation += planet.population;
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    }
    totalPopulation += shipPopulation;
    return totalPopulation
}

function calculateIncome() {
    calculateIndividualPlanetIncomes();
    var incomeTotal = 0
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        incomeTotal += planet.income;
    }
    if (money < 0) {
        negativeCashInterestRate = .07 - money / 20000
        var x = money * negativeCashInterestRate; //interest on debt
        incomeTotal += x;
    }
    incomeTotal -= (currentLOC * .05);
    return incomeTotal
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    } 

function onCollectRent(i) {
    event.preventDefault();
    event.stopPropagation();
    money += planets[i].rent;
    drawMoney();
}

function calculateRent(i) {
    planets[i].rent = planets[i].population / 2 * planets[i].rentModifier;
}

function onChangeTax(i) {
    event.preventDefault();
    event.stopPropagation();
    planets[i].tax = document.getElementById('taxForm' + i).value / 100;
    if (planets[i].tax < 0) {
        planets[i].tax = 0;
        document.getElementById('taxForm' + i).value = 0
    }
    if (planets[i].tax > 1) {
        planets[i].tax = 1;
        document.getElementById('taxForm' + i).value = 100
    }
    document.getElementById(i).innerText = formatMoney(planets[i].income);
    calculateIndividualPlanetIncomes();
    drawIncome(calculateIncome());
    console.log("ran change tax");
}