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

        if (planets[i].safetyLevel < Math.random() * 80) {
            tempEnemyIncrease = planets[i].population * Math.random() * .2;
            planets[i].enemies += tempEnemyIncrease;
        }

        if (planets[i].population < planets[i].maxpopulation) {
            tempPopIncrease = planets[i].population * .08 * (planets[i].safetyLevel * .011) - (.3 * planets[i].enemies); //Multiplies pop incr. by 110% of safety level
            if (planets[i].population + tempPopIncrease <= 0) {
                planets[i].population = 0;
            } else {
                if (planets[i].population + tempPopIncrease < planets[i].maxpopulation) {
                    planets[i].population = planets[i].population + tempPopIncrease;
                } else {
                    planets[i].population = planets[i].maxpopulation;
                }
            }
        }
    }
    calculatePlanetaryWater();
    calculatePlanetaryOil();
    drawIncome(calculateIncome());
    drawPlanets();
    drawTotalPopulation(calculateTotalPopulation());
    shipPopulation *= 1.02;
    drawShipPopulation();
};

function takeMoney() {
    var cashInput;
    var promptInput = prompt("Enter cash amount:", "$100");
    var parsed = Number(promptInput);
    if (isNaN(parsed)) {
        return;
    }
    if (promptInput == null || promptInput == "") {
        cashInput = 0;
    } else {
        cashInput = promptInput;
    }
    money -= Number(cashInput);
    drawMoney();
    drawIncome(calculateIncome());
}

function takePopulation() {
    var populationInput;
    var promptInput = prompt("Enter population to evacuate:", "20");
    var parsed = Number(promptInput);
    if (isNaN(parsed)) {
        return;
    } 
    if (promptInput == null || promptInput == "") {
        populationInput = 0;
    } else {
        populationInput = promptInput;
    }
    shipPopulation -= Number(populationInput);
    drawShipPopulation();
}

function onPlanetDevelopment(index, event) {
    event.preventDefault();
    event.stopPropagation();

    if (planets[index].water <= 0 && planets[index].level == 1) {
        alert('Not enough water to develop planet!')
        return;
    }

    if (planets[index].oil <= 0 && planets[index].level == 2) {
        alert('Not enough oil to develop planet!')
        return;
    }

    var planet = planets[index];
    var nextPlanetRequirement = planet.nextPlanetRequirements[planet.level + 1]
    if (money > nextPlanetRequirement.cost) {
        planet.level++;
        money -= nextPlanetRequirement.cost;
        planet.expenses += nextPlanetRequirement.incomeCost;
        planet.income -= nextPlanetRequirement.incomeCost;
        planet.maxpopulation = planet.maxpopulation * 1.6 * (1 + (Math.random()/5));
        drawPlanets();
        drawMoney();
        drawIncome(calculateIncome());
    } else {
        alert("Not Enough Funds");
    }
};

function test() {
    var x = 10
    console.log(formatMoney(x))
}

function formatMoney(number) {
    return number.toLocaleString('us-en', { style: 'currency', currency: 'USD' });
}

function drawIncome(income) {
    document.getElementById('income').innerText = formatMoney(income);
}
function drawTotalPopulation(population) {
    document.getElementById('population').innerText = population.toFixed(0);
}
function drawMoney() {
    document.getElementById('cash').innerText = formatMoney(money);
};
function drawShipPopulation() {
    document.getElementById('shipPopulation').innerText = shipPopulation.toFixed(0);
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
        <div onclick="onPlanetRowClicked(${i})" class="table-row clickable">
            <div class="table-text">${ planet.name }</div>
            <div class="table-text right">${ formatMoney(planet.income) }</div>            
            <div class="table-text right">${ planet.population.toFixed(0) }</div>
            <div class="table-text right">${ planet.maxpopulation.toFixed(0) }</div>
            <div class="table-text right" style="display:flex;"><button onclick="onPlanetDevelopment(${i}, event)">${ pr.name } (${ formatMoney(pr.cost) })</button></div>            
            <div class="table-text half right">${ planet.safetyLevel.toFixed(0) }</div>
            <div class="table-text half right">${ planet.enemies.toFixed(0) }</div> 
            <div class="table-text half right">${ planet.water.toFixed(0) }</div> 
            <div class="table-text half right">${ planet.oil.toFixed(0) }</div>
        </div>
    `
};

function onSubmitPlanet(planetResourceIndex) {
    var populationInput = prompt('Enter population you\'d like to send to this planet.');
    var population = Number(populationInput);
    var randomIncomeModifier = Math.random();
    console.log(population, shipPopulation);
    if (population > 50) {
        return alert("Can't send more than 50 units at once.");
    } else if (population > shipPopulation) {
        return alert('You don\'t have enough population!');
    } else {
        shipPopulation -= population;
        drawShipPopulation();
    }
    planets.push({
        name: planetResources[planetResourceIndex].title,
        population: population,
        randomIncomeModifier: randomIncomeModifier,
        level: 0,
        nextPlanetRequirements: _.clone(nextPlanetRequirements),
        availableBuildItems: _.clone(availableBuildItems),
        expenses: 0,
        safetyLevel: 100,
        resource: 'null',
        water: 0,
        waterGenerated: 0,
        waterUsageFactor: 1,
        oil: 0,
        oilGenerated: 0,
        oilUsageFactor: 1,
        enemies: 0,
        income: Number(population * .1 - (5 * randomIncomeModifier + 1)),    
        incomeBonuses: 0,
        maxpopulation: Number(50 + Math.random() * 50)
    });
    findRandomResource(planets.length - 1);
    createSpecialButtons(planets.length - 1);
    drawPlanets();
    drawIncome(calculateIncome());
    drawTotalPopulation(calculateTotalPopulation());
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
    drawTotalPopulation(calculateTotalPopulation());
    drawIncome(calculateIncome());
    document.getElementById('TurnCounter').innerHTML = "Turn: " + TurnCount;
}

function erase() {
    localStorage.clear();
}

var planets = [];
var money = 1000;
drawMoney();
var shipPopulation = 70;
drawShipPopulation();
var housecost = 100;
var housequantity = 0;
var houseimprovementfx = 50;
var populationcurrent = 50;
var populationgrowthrate = 1.05;
var populationmax = 100;
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
    incomeCost: 2,
}, {
    name: 'Aqueduct',
    cost: 50,
    incomeCost: 5,
}, {
    name: 'Refinery',
    cost: 100,
    incomeCost: 11,
}, {
    name: 'Library',
    cost: 200,
    incomeCost: 18,
}, {
    name: 'Market',
    cost: 300,
    incomeCost: 30,
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