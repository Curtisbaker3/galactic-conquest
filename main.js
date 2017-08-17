function onNewTurn() {
    money = money + income;
    TurnCount = TurnCount + 1;
    TradeBoolean = false
    document.getElementById('TurnCounter').innerHTML = "Turn: " + TurnCount;
    randomNumber = 50 + Math.round(Math.random() * 100);
    randomTradeRate = Number((5 + Math.random() * 10).toFixed(2));
    randomBankRate = Math.random();
    randomTradeString = randomTradeRate.toString() + (randomNumber*randomTradeRate*.01).toFixed(2).toString() + randomNumber.toString() + (Math.round(money)).toString();

    for (var i = 0; i < planets.length; i++) {
        planets[i].income = planets[i].population * .1 - 10 * planets[i].randomIncomeModifier - planets[i].expenses;
        planets[i].invasionRisk = planets[i].invasionRisk * 1.2 + 2

        if (planets[i].population < planets[i].maxpopulation) {
            if (planets[i].population + planets[i].population * .05 < planets[i].maxpopulation) {
                planets[i].population = planets[i].population * 1.05;
            } else {
                planets[i].population = planets[i].maxpopulation
            }
        }
        

    }
    redrawPlanets();
};


function onPlanetDevelopment(index) {
    var planet = planets[index];
    var nextPlanetRequirement = nextPlanetRequirements[planet.level]
    if (money > nextPlanetRequirement.cost) {
        money -= nextPlanetRequirement.cost;
        planet.level++;
        planet.expenses += nextPlanetRequirement.cost;
        planet.maxpopulation = planet.maxpopulation * 2 * (1 + (Math.random()/5));
        redrawPlanets();
    } else {
        alert("Not Enough Funds");
    }
};

function formatMoney(number) {
    return number.toLocaleString('us-en', { style: 'currency', currency: 'USD' });
}

function onbuyfarm() {
    if (money > farmcost) {
            money = money - farmcost;
            document.getElementById('CashRow').innerHTML = Math.round(money);
            farmcost = farmcost * 1.1;
            document.getElementById('farmcost').innerHTML = farmcost;
            farmquantity = farmquantity + 1;
            document.getElementById('farmquantity').innerHTML = farmquantity;
            foodproduction = foodproduction + farmcapacity;
            document.getElementById('foodproduction').innerHTML = foodproduction;

    } else {
        alert("Not Enough Funds");
            }
};

function onSubmitPlanet() {
        var newdiv = document.createElement("DIV");
        newdiv.setAttribute("id", planetcount++); //returns the value, then increments
        var input = document.getElementById('stringinput').value;
        document.getElementById('stringinput').value="";
        newdiv.innerText = input
        document.getElementById("planetlist").appendChild(newdiv);

}

const renderPlanet = (planet, i) => {
    const pr = nextPlanetRequirements[planet.level];
    return `
        <div class="table-row">
            <div class="table-text">${ planet.name }</div>
            <div class="table-text right">${ planet.population.toFixed(0) }</div>
            <div class="table-text right">${ formatMoney(planet.income) }</div>
            <div class="table-text right">${ planet.maxpopulation.toFixed(0) }</div>
            <div class="table-text right"><button onclick="onPlanetDevelopment(${i})">${ pr.name } (${ formatMoney(pr.cost) })</button></div>
        </div>
    `
};

function drawMoney(cash) {
    document.getElementById('cash').innerText = formatMoney(cash);
}
function drawIncome(cash) {
    document.getElementById('income').innerText = formatMoney(cash);
}
function drawPopulation(population) {
    document.getElementById('population').innerText = population.toFixed(0);
}

function redrawPlanets() {
    var planetList = document.getElementById('planetlist');
    while (planetList.firstChild) {
        planetList.removeChild(planetList.firstChild);
    }
    planetList.innerHTML = planets.map((p, i) => renderPlanet(p, i)).join('');
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
        expenses: 0,
        invasionRisk: 0,
        income: Number(population * .1 - 10 * randomIncomeModifier),    
        maxpopulation: Number(50 + Math.random() * 50)
    });
    nameInput.value = '';
    populationInput.value = '';
    nameInput.focus();
    redrawPlanets();
}

var planets = [];
var money = 100;
var steelfactorycost = 50;
var steelfactoryquantity = 0;
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
    name: 'Farm',
    cost: 30,
    incomeCost: 3,
}, {
    name: 'Aqueduct',
    cost: 50,
    incomeCost: 5,
}, {
    name: 'Hospital',
    cost: 100,
    incomeCost: 8,
}, {
    name: 'Library',
    cost: 200,
    incomeCost: 10,
}, {
    name: 'Factory',
    cost: 300,
    incomeCost: 13,
}]
