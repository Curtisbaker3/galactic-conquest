/* 100 turns high records list -- 476.29 curtis
make federations stations and earth give money
added extrasolar moons for extra $$
Add random event cards. Bonus population, water, oil, uranium. Collect on space docks. Free colony ship, which can be sent to an extrasolar moon
make alert for on maxpopulation reached, fulfill planet requirements to develop planet

Add growth rate modifiers
Add iron resource -- decreases cost of buildings with manufacturing centers
    decrease waterusagefactor, oilusagefactor -- efficiency buildings - ex. water recycle plant

Add highlight to planets with low resources or safety or invaders
explore function

Trade module -- adds main ship to planet list, 25% chance to open trade menu when land on foreign moon
Auto transfer oil and others
Add fuel and oil upgrade
autoreplenish fuel
*/
var waterBaseRateModUniversalFountain = 0
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
        var safetyModification = ((120 - planets[i].safetyLevel) * Math.random() * .15 + Math.random() * 1.5) - globalSafetyGenerated //modfication set to 20% of the current difference + 2
        console.log(safetyModification);
        if (planets[i].safetyLevel > 0) {
            if (planets[i].safetyLevel - safetyModification > 0) {
                planets[i].safetyLevel -= safetyModification;
            } else {
                planets[i].safetyLevel = 0
            }
            if (planets[i].safetyLevel > 120) {
                planets[i].safetyLevel = 120;
            }
        }
       

        if (planets[i].safetyLevel < Math.random() * 80) {
            tempEnemyIncrease = planets[i].population * Math.random() * .2;
            planets[i].enemies += tempEnemyIncrease;
        }

            
            var taxModifier = (20 - (Math.pow((planets[i].tax * 100), 1.7))/15) / 200
            tempPopIncrease = planets[i].population * (.02 + waterBaseRateModUniversalFountain + taxModifier) * (planets[i].safetyLevel * .011); //Multiplies pop incr. by 110% of safety level
            if (tempPopIncrease > 0) { //increase positive increases, and decrease decreases
                tempPopIncrease = tempPopIncrease * planets[i].waterPopRateMod - (.3 * planets[i].enemies);
            } else {
                tempPopIncrease = tempPopIncrease / planets[i].waterPopRateMod - (.3 * planets[i].enemies);
            }
        if (planets[i].population < planets[i].maxpopulation || tempPopIncrease < 0) {
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
        calculateRent(i);
        if (planets[i].waterAutoTransfer > 0) {
            transferResource(i, 'Water');
            transferResource(i, 'Oil');
            transferResource(i, 'Iron');
            transferResource(i, 'Uranium');
        }
 
    }
    deductPlanetaryWater();
    deductPlanetaryOil();
    deductPlanetaryUranium();
    deductPlanetaryIron();
    drawIncome(calculateIncome());
    drawPlanets();
    drawTotalPopulation(calculateTotalPopulation());
    shipPopulation *= 1.02;
    drawShipPopulation();
};

function rollDice() {
    var rollDice = Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1);
    document.getElementById('rollDice').innerText = rollDice;
    shipLocation += rollDice;    
   /* if (shipLocation = 17 && rollDice < 5) {
        shipLocation = 17
    } else {
    shipLocation += rollDice;
    }    */
    
    if (shipLocation > 400 && shipLocation < 450) {
        console.log('ship location is greater than 400');
        shipLocation = shipLocation - 400 + 66;        
    }   

    if (shipLocation > 301 && shipLocation < 350) {
        console.log('ship location is greater than 301');
        shipLocation = shipLocation - 301 + 48;        
    }

    if (shipLocation > 201 && shipLocation < 250) {
        console.log('ship location is greater than 201');
        shipLocation = shipLocation - 201 + 23;        
    }

    if (shipLocation > 104 && shipLocation < 150) {
        console.log('ship location is greater than 104');
        shipLocation = shipLocation - 104 + 7;        
    }

    if (shipLocation > 79 && shipLocation < 100) {
        console.log('Ship just passed earth');
        shipLocation = shipLocation - 79;        
    }    
    
    switch(planetLocations[shipLocation]) {
      case 'hole1': 
        shipLocation = 101
        break;
      case 'hole2': 
        shipLocation = 102
        break;
      case 'hole3': 
        shipLocation = 103
        break;
      case 'hole4': 
        shipLocation = 104
        break;
      case 'hole5': 
        shipLocation = 200
        break;
      case 'hole6': 
        shipLocation = 201
        break;
      case 'hole7': 
        shipLocation = 23
        break;
      case 'hole8': 
        shipLocation = 300
        break;
      case 'hole9': 
        shipLocation = 301
        break;
      case 'hole10': 
        shipLocation = 48
        break;
      case 'hole10': 
        shipLocation = 49
        break;
      case 'hole11': 
        shipLocation = 400
        break;
      case 'hole12': 
        shipLocation = 66
        break;
      case 'hole13': 
        shipLocation = 67
        break;
      case 'hole14': 
        shipLocation = 68
        break;
      default:
        break;
    }
    document.getElementById('shipLocation').innerText = planetLocations[shipLocation];
    document.getElementById('planet-search').value = planetLocations[shipLocation].toLowerCase();
    handlePlanetSearch();  
}

function drawIncome(income) {
    document.getElementById('income').innerText = formatMoney(income);
}

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

    if (planets[index].uranium <= 0 && planets[index].level == 3) {
        alert('Not enough uranium to develop planet!')
        return;
    }

    if (planets[index].iron <= 0 && planets[index].level == 4) {
        alert('Not enough iron to develop planet!')
        return;
    }

    var planet = planets[index];
    var nextPlanetRequirement = planet.nextPlanetRequirements[planet.level + 1]
    if (0 < 1) { //removed money > nextPlanetRequirement.cost until LOC developed
        planet.level++;
        planet.usesResourceAt[planet.level] = true;
        console.log (planet.usesResourceAt[planet.level]);
        money -= nextPlanetRequirement.cost;
        planet.expenses += nextPlanetRequirement.incomeCost;
        planet.income -= nextPlanetRequirement.incomeCost;
        planet.maxpopulation = planet.maxpopulation * 1.8 * (1 + (Math.random()/10));
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

    for (var i = 0; i < planets.length; i++) {
        if (planets[i].safetyLevel < 65) {
            document.getElementById("safetyalert"+ i).classList.add('alert2');
        }
        if (planets[i].enemies > 0.5) {
            document.getElementById("enemyalert" + i).classList.add('alert2');
        }
    }
};

const renderPlanet = (planet, i) => {
    const pr = nextPlanetRequirements[planet.level + 1];
    var q = planets.length - 1    
    return `
        <div onclick="onPlanetRowClicked(${i})" class="table-row clickable">
            <div class="table-text">${ planet.name }</div>
            <div id="${i}" class="table-text right">${ formatMoney(planet.income) }</div>            
            <div class="table-text half center form"><form class="form" onclick="onChangeTax(${i}, event)" onkeyup="onChangeTax(${i}, event)" onsubmit="onChangeTax(${i}, event)">
            <input id="taxForm${i}" type="number" step="1" style="height: 8px; width: 60px" value=${ (planet.tax * 100).toFixed(0) }>
            </form></div>            
            <div class="table-text half right button"><button class="tooltip" onclick="onCollectRent(${i}, event)">${ planet.rent.toFixed(0) }<span class="tooltiptext">Click to collect rent from opponent<span></button></div>             
            <div class="table-text left button"><button class="tooltip" onclick="onTransferCitizens(${i}, event)">${ planet.population.toFixed(0) } / ${ planet.maxpopulation.toFixed(0) }<span class="tooltiptext">Click to transfer citizens here from other planets. Cost: 5<span></button></div>          
            <div class="table-text half right button" style="display:flex;"><button class="tooltip" onclick="onPlanetDevelopment(${i}, event)">${ pr.name }<span class="tooltiptext">Cost: ${ formatMoney(pr.cost) }. <br>Income Cost: ${ formatMoney(pr.incomeCost) } <span></button></div>            
            <div id="safetyalert${i}" class="table-text half right button"><button class="tooltip" onclick="onBolsterDefences(${i}, event)">${ planet.safetyLevel.toFixed(0) }<span class="tooltiptext">
            ${ formatMoney(planets[i].mainPageBuildItems[0].description) } <br>Cost: ${ formatMoney(planets[i].mainPageBuildItems[0].cost) } <span></button></div>          
            <div id="enemyalert${i}" class="table-text half right button"><button class="tooltip" onclick="onSendTroops(${i}, event)">${ planet.enemies.toFixed(0) }<span class="tooltiptext">${ formatMoney(mainPageBuildItems[1].description) } <br>Cost: ${ formatMoney(mainPageBuildItems[1].cost) } <span></button></div>          
            <div class="table-text half right button"><button class="tooltip" onclick="onTransferResourceInit(${i}, event, 'Water')">${ planet.water.toFixed(0) }<span class="tooltiptext">Click to transfer water here from other planets. Cost: 5<span></button></div> 
            <div class="table-text half right button"><button class="tooltip" onclick="onTransferResourceInit(${i}, event, 'Oil')">${ planet.oil.toFixed(0) }<span class="tooltiptext">Click to transfer oil here from other planets. Cost: 5<span></button></div>
            <div class="table-text half right button"><button class="tooltip" onclick="onTransferResourceInit(${i}, event, 'Uranium')">${ planet.uranium.toFixed(0) }<span class="tooltiptext">Click to transfer uranium here from other planets. Cost: 5<span></button></div>
            <div class="table-text half right button"><button class="tooltip" onclick="onTransferResourceInit(${i}, event, 'Iron')">${ planet.iron.toFixed(0) }<span class="tooltiptext">Click to transfer iron here from other planets. Cost: 5<span></button></div>
        </div>
    `
};

function onSubmitPlanet(planetResourceIndex) {
    var populationInput = prompt('Enter population you would like to send to this planet.');
    if (populationInput === null) {
        return;
    }
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

    var usesResourceAt = [];
    planets.push({
        name: planetResources[planetResourceIndex].title,
        population: population,
        randomIncomeModifier: randomIncomeModifier,
        level: 0,
        nextPlanetRequirements: _.clone(nextPlanetRequirements),
        availableBuildItems: _.clone(availableBuildItems),
        mainPageBuildItems: _.cloneDeep(mainPageBuildItems),
        usesResourceAt: _.cloneDeep(usesResourceAt),
        expenses: 0,
        safetyLevel: 100,
        water: 0,
        waterGenerated: 0,
        waterUsageFactor: 1,
        waterAutoTransfer: 0, //add 1 to increase autotransfer by 10%
        waterPopRateMod: 1,
        oil: 0,
        oilGenerated: 0,
        oilUsageFactor: 1,
        oilAutoTransfer: 0,
        uranium: 0,
        uraniumGenerated: 0,
        uraniumUsageFactor: 1,
        uraniumAutoTransfer: 0,
        iron: 0,
        ironGenerated: 0,
        ironUsageFactor: 1,
        ironAutoTransfer: 0,        
        enemies: 0,
        income: Number(population * .1 - (5 * randomIncomeModifier + 1)),
        tax: .2,
        rent: 0,    
        incomeBonuses: 0,
        maxpopulation: Number(50 + Math.random() * 50)
    });

    findRandomResource(planets.length - 1);
    createSpecialButtons(planets.length - 1);
    var findPlanetName = _.find(planetResources, {title: planets[planets.length - 1].name});
    planets[planets.length - 1].maxpopulation = Number(findPlanetName.maxPopulation);
    planets[planets.length - 1].upkeep = Number(findPlanetName.upkeep);
    money -= findPlanetName.cost
    calculateRent(planets.length - 1);
    drawMoney();
    calculateIndividualPlanetIncomes();
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
var globalSafetyGenerated = 0;
var globalWaterProductionFactor = 1;
var globalOilProductionFactor = 1;
var globalUraniumProductionFactor = 1;
var globalIronProductionFactor = 1;
drawMoney();
var shipPopulation = 70;
var shipLocation = 0;
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
    incomeCost: 1,
}, {
    name: 'Aqueduct',
    cost: 50,
    incomeCost: 3,
}, {
    name: 'Refinery',
    cost: 100,
    incomeCost: 5,
}, {
    name: 'Nuclear Plant',
    cost: 200,
    incomeCost: 8,
}, {
    name: 'Factory',
    cost: 300,
    incomeCost: 12,
}, ..._.range(100).map((n) => ({
    name: 'Market ' + (n + 1), 
    cost: 300 + (n * n * 30), 
    incomeCost: 12 + (n * n)
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

//if (localStorage.getItem('game')) {
   // load();
//}
var planetLocations = ["Earth", "hole1", "Moon", "Solar SD", "Mercury", "FS I", "dot1", "dot2", "IO", "Jupiter SD", "dot3", "Elara", "Callisto", "FS II", "Thebe", 
"dot4", "Metis", "Ganymede", "Sinope", "hole2", "hole3", "hole4", "FS III", "dot4", "Miranda", "Uranus SD", "Umbriel", "Oberon", "Portia", "Uranus RL", "dot5", "Ariel", "hole5",
"hole6", "hole7", "Pluto", "Charon", "dot6", "FS 5", "dot7", "dot8", "Phobos", "Mars", "Deimos", "dot9", "Venus RL", "Venus", "hole8", "Phoebe", "Mimas", "Saturn SD", "Dione",
"dot10", "Iapetus", "Rhea", "Tethys", "FS VI", "Janus", "Enceladus", "Saturn RL", "Hyperion", "hole8", "hole9", "hole10", "hole11", "FS VIII",
"Proteus", "Nereid", "Larissa", "Neptune SD", "Thalassa", "Neptune RL", "Despina", "Triton", "FS IV", "Galatea", "hole12", "hole13", "hole14", "Earth RL"];
planetLocations[100] = "Jupiter RL";
planetLocations[101] = "Himalia";
planetLocations[102] = "Europa";
planetLocations[103] = "Amalthea";
planetLocations[104] = "Adrastea";

planetLocations[200] = "FS IV";
planetLocations[201] = "Titania";

planetLocations[300] = "Titan";
planetLocations[301] = "FS VII";

planetLocations[400] = "Naiad";
var planetLocationsJupiterSideTrack = 1;