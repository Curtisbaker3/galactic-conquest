function onNewTurn() {
    var tempIncome = calculateIncome();
    money = money + tempIncome;
    drawMoney();
    TurnCount = TurnCount + 1;
    TradeBoolean = false
    document.getElementById('TurnCounter').innerHTML = "Turn: " + TurnCount;
    randomNumber = 50 + Math.round(Math.random() * 100);
    randomTradeRate = Number((5 + Math.random() * 10).toFixed(2));
    randomBankRate = Math.random();
    randomTradeString = randomTradeRate.toString() + (randomNumber*randomTradeRate*.01).toFixed(2).toString() + randomNumber.toString() + (Math.round(money)).toString();

    for (var i = 0; i < planets.length; i++) {
        calculateIndividualPlanetIncomes();
        var safetyModification = (100 - planets[i].safetyLevel) * Math.random() * .4 + Math.random() * 4 //modfication set to 20% of the current difference + 2

        if (planets[i].safetyLevel > 0) {
            if (planets[i].safetyLevel - safetyModification > 0) {
                planets[i].safetyLevel -= safetyModification;
            } else {
                planets[i].safetyLevel = 0
            }
        }

        if (planets[i].safetyLevel < Math.random() * 100) {
            tempEnemyIncrease = planets[i].population * Math.random();
            planets[i].enemies += tempEnemyIncrease;
        }

        if (planets[i].population < planets[i].maxpopulation) {
            tempPopIncrease = planets[i].population * .05 * (planets[i].safetyLevel * .011) //Multiplies pop incr. by 110% of safety level
            if (planets[i].population + tempPopIncrease < planets[i].maxpopulation) {
                planets[i].population = planets[i].population + tempPopIncrease;
            } else {
                planets[i].population = planets[i].maxpopulation;
            }
        }
    }
    
    drawIncome(calculateIncome());
    drawPlanets();
    drawPopulation(calculateTotalPopulation());
};

function calculateIndividualPlanetIncomes() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].income = planets[i].population * .1 - 10 * planets[i].randomIncomeModifier - planets[i].expenses;
}
}

function calculateTotalPopulation() {
    var totalPopulation = 0
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        totalPopulation += planet.population;
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    }
    return totalPopulation

}

function calculateIncome() {
    var incomeTotal = 0
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        incomeTotal += planet.income;
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    }
    return incomeTotal
}

function onPlanetDevelopment(index) {
    var planet = planets[index];
    var nextPlanetRequirement = planet.nextPlanetRequirements[planet.level]
    if (money > nextPlanetRequirement.cost) {
        money -= nextPlanetRequirement.cost;
        planet.level++;
        planet.expenses += nextPlanetRequirement.incomeCost;
        planet.income -= nextPlanetRequirement.incomeCost;
        planet.maxpopulation = planet.maxpopulation * 2 * (1 + (Math.random()/5));
        drawPlanets();
        drawMoney();
        drawIncome(calculateIncome());
    } else {
        alert("Not Enough Funds");
    }
};

function formatMoney(number) {
    return number.toLocaleString('us-en', { style: 'currency', currency: 'USD' });
}



function drawIncome(income) {
    document.getElementById('income').innerText = formatMoney(income);
}
function drawPopulation(population) {
    document.getElementById('population').innerText = population.toFixed(0);
}
function drawMoney() {
    document.getElementById('cash').innerText = formatMoney(money);
};

function drawPlanets() {
    var planetList = document.getElementById('planetlist');
    while (planetList.firstChild) {
        planetList.removeChild(planetList.firstChild);
    }
    planetList.innerHTML = planets.map((p, i) => renderPlanet(p, i)).join('');
};

const renderPlanet = (planet, i) => {
    const pr = nextPlanetRequirements[planet.level + 1];
    return `
        <div class="table-row">
            <div class="table-text two">${ planet.name }</div>
            <div class="table-text right">${ formatMoney(planet.income) }</div>            
            <div class="table-text right">${ planet.population.toFixed(0) }</div>
            <div class="table-text right">${ planet.maxpopulation.toFixed(0) }</div>
            <div class="table-text right" style="display:flex;"><button onclick="onPlanetDevelopment(${i})">${ pr.name } (${ formatMoney(pr.cost) })</button></div>            
            <div class="table-text half right">${ planet.safetyLevel.toFixed(0) }</div>      

        </div>
    `
};

function onSubmitPlanet() {
    var nameInput = document.getElementById('stringinput');
    var populationInput = document.getElementById('input');
    if (!nameInput.value || !populationInput.value) {
        return;
    }
    var population = Number(populationInput.value);
    var randomIncomeModifier = Math.random();
    planets.push({
        name: nameInput.value,
        population: population,
        randomIncomeModifier: randomIncomeModifier,
        level: 0,
        nextPlanetRequirements: _.clone(nextPlanetRequirements),
        expenses: 0,
        safetyLevel: 100,
        enemies: 0,
        income: Number(population * .1 - 10 * randomIncomeModifier),    
        maxpopulation: Number(50 + Math.random() * 50)
    });
    nameInput.value = '';
    populationInput.value = '';
    nameInput.focus();
    drawPlanets();
    drawIncome(calculateIncome());
    drawPopulation(calculateTotalPopulation());
}

function save() {
    localStorage.setItem('game', JSON.stringify({
        money: money,
        planets: planets,
        TurnCount: TurnCount
    }));
}

function load() {
    const game = JSON.parse(localStorage.getItem('game'));
    planets = game.planets;
    money = game.money;
    TurnCount = game.TurnCount;
    drawMoney();
    drawPlanets();
    drawPopulation(calculateTotalPopulation());
    drawIncome(calculateIncome());
    document.getElementById('TurnCounter').innerHTML = "Turn: " + TurnCount;
}

function erase() {
    localStorage.clear();
}

var planets = [];
var money = 100;
var housecost = 100;
var housequantity = 0;
var houseimprovementfx = 50;
var populationcurrent = 50;
var populationgrowthrate = 1.05;
var populationmax = 100;
var farmcost = 30;
var farmquantity = 1 // number of farms
var farmcapacity = 10; //how much one farm produces per turn
var foodproduction = 10; //player's current food production
var foodcurrent = 100;
var TradeBoolean = false;
var randomNumber;
var randomTradeRate;
var randomBankRate;
var income = 0;
var TurnCount = 1;
var name = "Bob";
var nextPlanetRequirements = [{
    name: 'Default',
    cost: 0,
    incomeCost: 0
}, {
    name: 'Farm',
    cost: 30,
    incomeCost: 4,
}, {
    name: 'Aqueduct',
    cost: 50,
    incomeCost: 9,
}, {
    name: 'Hospital',
    cost: 100,
    incomeCost: 18,
}, {
    name: 'Library',
    cost: 200,
    incomeCost: 26,
}, {
    name: 'Market',
    cost: 300,
    incomeCost: 40,
}, ..._.range(100).map((n) => ({
    name: 'Factory ' + (n + 1), 
    cost: 300 + (n * n * 30), 
    incomeCost: 50 + (n * n * 5)
}))];

var turrets = [{
    name: 'Default',
    cost: 0,
    incomeCost: 0
}, {
    name: 'Turret',
    cost: 15,
    incomeCost: 1
}]

if (localStorage.getItem('game')) {
    load();
}