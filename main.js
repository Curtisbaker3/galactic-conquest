/* color code planets by resource
  Add out of water highlights
//fix change color when buy planetgit
//fix relocate citizens -- negative population
add conditions for adding money and populations to things -- not ....!
100 turns high records list -- 476.29 curtis, 2500
make federations stations and earth give money
added extrasolar moons for extra $$
Add random event cards. Bonus population, water, oil, uranium. Collect on space docks. Free colony ship, which can be sent to an extrasolar moon
fulfill planet requirements to develop planet
Trade module -- adds main ship to planet list, 25% chance to open trade menu when land on foreign moon
Add fuel and oil upgrade
autoreplenish fuel
*/
var negativeCashInterestRate = 0;
var numberOfPlayers = 0;
var turnPoint = 0;

//function whoseTurnIsIt () {

//}
var waterBaseRateModUniversalFountain = 0
var travelersLandRate = .03;
function onNewTurn() {
    if ((event.ctrlKey || event.metaKey)) {
        var promptInput1 = prompt("Enter number of players:", "2");
        var parsed1 = Number(promptInput1);
        numberOfPlayers = Number(promptInput1);
        var promptInput2 = prompt("When is your turn?", "2");
        var parsed2 = Number(promptInput2);
        turnPoint = Number(promptInput2);
        travelersLandRate = travelersLandRate/numberOfPlayers;
        if (turnPoint == 1 && TurnCount == 1) {
            document.getElementById("conquestTitle").classList.add('your-turn');
            rollDice();
        }
        return;
      }
    if (numberOfPlayers > 0 && turnPoint > 0) {
        var z = ((TurnCount + turnPoint) + numberOfPlayers + 1) / numberOfPlayers;
        console.log(TurnCount);
        console.log(turnPoint);
        console.log(numberOfPlayers);
        console.log(z);
        if (Number.isInteger(z) === true) {
            console.log('woot!!!');
            document.getElementById("conquestTitle").classList.add('your-turn');
            rollDice();
        } else {
            document.getElementById("conquestTitle").classList.remove('your-turn');
            document.getElementById('planet-search').value = '';
            handlePlanetSearch();
        }
    }
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

    addPlanetaryResource('water');
    addPlanetaryResource('oil');
    addPlanetaryResource('iron');
    addPlanetaryResource('uranium');

    for (var i = 0; i < planets.length; i++) {
        calculateIndividualPlanetIncomes();
        var shieldModification = ((120 - planets[i].shieldLevel) * Math.random() * .15 + Math.random() * 1.5) - globalShieldGenerated //modfication set to 20% of the current difference + 2
        console.log(shieldModification);
        if (planets[i].shieldLevel > 0) {
            if (planets[i].shieldLevel - shieldModification > 0) {
                planets[i].shieldLevel -= shieldModification;
            } else {
                planets[i].shieldLevel = 0
            }
            if (planets[i].shieldLevel > 120) {
                planets[i].shieldLevel = 120;
            }
        }
       
        if (planets[i].shieldLevel < Math.random() * 90 && planets[i].shieldLevel < Math.random() * 90) {
            tempEnemyIncrease = calculateInvaders(i);
            planets[i].enemies += tempEnemyIncrease;
        }
            
            var taxModifier = (20 - (Math.pow((planets[i].tax * 100), 2.5))/210) / 200 // modified sept. 3 2017 old formula in Tax Calculation excel
            tempPopIncrease = planets[i].population * (0 + waterBaseRateModUniversalFountain + taxModifier) * (planets[i].shieldLevel * .011); //Multiplies pop incr. by 110% of shield level // decreased by 2% Sept. 3 2017
            if (tempPopIncrease > 0) { //increase positive increases, and decrease decreases
                tempPopIncrease = tempPopIncrease * planets[i].waterPopRateMod - (.3 * planets[i].enemies);
                console.log(tempPopIncrease);
            } else {
                tempPopIncrease = tempPopIncrease / planets[i].waterPopRateMod - (.3 * planets[i].enemies);
                console.log(tempPopIncrease);
            }
        if (planets[i].population < planets[i].maxpopulation || tempPopIncrease < 0) {
            if (planets[i].population + tempPopIncrease <= 0) {
                planets[i].population = 0;
            } else {
                if (planets[i].population + tempPopIncrease < planets[i].maxpopulation) {
                    planets[i].population += tempPopIncrease;
                } else {
                    planets[i].population = planets[i].maxpopulation;
                }
            }
        }
        if (planets[i].waterAutoTransfer > 0) {
            transferResource(i, 'Water');
        }
        if (planets[i].oilAutoTransfer > 0) {
            transferResource(i, 'Oil');
        }
        if (planets[i].ironAutoTransfer > 0) {
            transferResource(i, 'Iron');
        }
        if (planets[i].uraniumAutoTransfer > 0) {
            transferResource(i, 'Uranium');
        }
        randomPlanetaryEvents(i);
        calculateRent(i);
    }
      randomGalacticEvents();

    shipPopulation = (shipPopulation * 1.02 + 1) + shipPopulationBonus;
    globalShieldGenerated *= .93;
    //var tempResource = 'water';
    deductPlanetaryResource('water');
    deductPlanetaryResource('oil');
    deductPlanetaryResource('iron');
    deductPlanetaryResource('uranium');
    drawIncome(calculateIncome());
    drawPlanets();
    drawTotalPopulation(calculateTotalPopulation());
    drawShipPopulation();
    calculateMaxLOC();
    console.log('we did in fact make it!');
};

function drawIncome(income) {
    document.getElementById('income').innerText = formatMoney(income);
}

 //y = Math.abs((planets.length * Math.random() - .5).toFixed(0)) -- old system to choose random planet
 var naturalDisasters = ['A meteor has struck ', 'A flood has hit ', 'A hurricane has hit ']

function calculateFloodRisk(i) {
    planets[i].floodRisk = Math.pow(TurnCount, 1.01) * .001 * globalNaturalDisasterModifier * floodRiskGlobalModifier * planets[i].floodRiskModifier;
}
function calculateHurricaneRisk(i) {
    planets[i].hurricaneRisk = Math.pow(TurnCount, 1.03) * .0003 * globalNaturalDisasterModifier * hurricaneRiskGlobalModifier * planets[i].hurricaneRiskModifier;
}
function calculateMeteorRisk(i) {
    planets[i].meteorRisk = Math.pow(TurnCount, 1.02) * .00015 * globalNaturalDisasterModifier * meteorRiskGlobalModifier * planets[i].meteorRiskModifier;
}

function randomGalacticEvents() {
    if (Math.random() < interplanetaryCivilWarRisk) {
        for (var q = 0; q < planets.length; q++) {
          planets[q].enemies = calculateInvaders(q) * .5;      
        }
        alert('An Interplanetary civil war has occured!');
        drawPlanets();
    }
}

function randomPlanetaryEvents(i) {
    calculateFloodRisk(i);
    calculateHurricaneRisk(i);
    calculateMeteorRisk(i);
    if (Math.random() < planets[i].floodRisk && planets[i].population > 0) {
        x = (planets[i].population * (.08 + Math.random() / 4)).toFixed(0);
        alert('A flood has hit ' + planets[i].name + ', killing ' + x + ' citizens');
        planets[i].population -= x;
        drawPlanets();
    }
    if (Math.random() < planets[i].meteorRisk && planets[i].population > 0) {
        x = (planets[i].population * (.4 + Math.random() / 2)).toFixed(0);
        alert('A meteor has hit ' + planets[i].name + ', killing ' + x + ' citizens');
        planets[i].population -= x;
        drawPlanets();
    }
    if (Math.random() < planets[i].hurricaneRisk && planets[i].population > 0) {
        x = (planets[i].population * (.16 + Math.random() / 4)).toFixed(0);
        alert('A hurricane has hit ' + planets[i].name + ', killing ' + x + ' citizens');
        planets[i].population -= x;
        drawPlanets();
    }
    if (Math.random() < travelersLandRate) {
        if (planetLocations.indexOf(planets[i].name) > -1 && planets[i].rent > 0) {
                alert('Travellers have landed on ' + planets[i].name + ', collect ' + formatMoney(planets[i].rent) + ' in rent');
                money += planets[i].rent;
                drawMoney();
            } else {
                    console.log('not in array');
                    }
    }

    
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
    drawMoney();
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
        planet.maxpopulation *= 1.8 * (1 + (Math.random()/10));
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
    for (var i = 0; i < planets.length; i++) {
        if(planets[i].population >= planets[i].maxpopulation && planets[i].tax < .24) {
            document.getElementById("maxPop"+i).classList.add('maxPopWarning');
        }
    }
}

function drawMoney() {
    //document.getElementById('cash').innerText = formatMoney(money);
    //document.getElementById('cash').classList.add('tooltiptext');
    if (money < 0) {
      document.getElementById('cash').innerHTML = formatMoney(money) + `<span class="tooltiptext">interest rate on debt: ${(negativeCashInterestRate * 100).toFixed(2)}%<br>Cost: ${(negativeCashInterestRate * money).toFixed(2)}/turn</span>`
    } else {
      document.getElementById('cash').innerHTML = formatMoney(money);
    }
    //</span>
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
        if (planets[i].shieldLevel < 80) {
            document.getElementById("shieldalert"+ i).classList.add('alert2');
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
        <div onclick="onPlanetRowClicked(${i}, event)" class="table-row clickable">
            <div class="table-text tooltip">${ planet.name }<span class="tooltiptext">Flood risk: ${((planet.floodRisk)*100).toFixed(1)}%<br>Hurricane risk: ${((planet.hurricaneRisk)*100).toFixed(1)}%<br>Meteor risk: ${((planet.meteorRisk)*100).toFixed(1)}%<span></div>
            <div id="${i}" class="table-text right">${ formatMoney(planet.income) }</div>            
            <div class="table-text half center form"><form class="form" onclick="onChangeTax(${i}, event)" onkeyup="onChangeTax(${i}, event)" onsubmit="onChangeTax(${i}, event)">
            <input id="taxForm${i}" type="number" step="1" style="height: 8px; width: 60px" value=${ (planet.tax * 100).toFixed(0) }>
            </form></div>            
            <div class="table-text half right button"><button class="tooltip" onclick="onCollectRent(${i}, event)">${ planet.rent.toFixed(0) }<span class="tooltiptext">Click to collect rent from opponent<span></button></div>             
            <div id="maxPop${i}" class="table-text left button"><button class="tooltip" onclick="onTransferCitizens(${i}, event)">${ planet.population.toFixed(0) } / ${ planet.maxpopulation.toFixed(0) }<span class="tooltiptext">Click to transfer citizens here from other planets. Cost: 5<span></button></div>          
            <div class="table-text half right button" style="display:flex;"><button class="tooltip" onclick="onPlanetDevelopment(${i}, event)">${ pr.name }<span class="tooltiptext">Cost: ${ formatMoney(pr.cost) }. <br>Income Cost: ${ formatMoney(pr.incomeCost) } <span></button></div>            
            <div id="shieldalert${i}" class="table-text half right button"><button class="tooltip" onclick="onBolsterDefences(${i}, event)">${ planet.shieldLevel.toFixed(0) }<span class="tooltiptext">
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
    if ((event.ctrlKey || event.metaKey)) {
      if (planetResources[planetResourceIndex].sold == false) {
          planetResources[planetResourceIndex].sold = true;
          document.getElementById("soldPlanets"+planetResourceIndex).classList.add('soldPlanets');
          return;
      } else {
          planetResources[planetResourceIndex].sold = false;
          console.log('here');
          document.getElementById("soldPlanets"+planetResourceIndex).classList.remove('soldPlanets');
          return;
      }
    }
    var populationInput = prompt('Enter population you would like to send to this planet. Maximum: ' + planetResources[planetResourceIndex].maxPopulation);
    if (populationInput === null) {
        return;
    }
    if (isNaN(populationInput)) {
        return;
    }
    var population = Number(populationInput);
    var randomIncomeModifier = Math.random();
    console.log(population, shipPopulation);
    if (population > planetResources[planetResourceIndex].maxPopulation) {
        return alert("Can't send more than "+planetResources[planetResourceIndex].maxPopulation+" units at once.");
    } else if (population > shipPopulation) {
        return alert('You don\'t have enough population!');
    } else if (planetResources[planetResourceIndex].sold == true) {
        return alert('Can\'t send units here! Your opponent has occupied this planet');
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
        shieldLevel: 100,
        floodRisk: 0,
        floodRiskModifier: 1,
        meteorRisk: 0,
        meteorRiskModifier: 1,
        hurricaneRisk: 0,
        hurricaneRiskModifier: 1,
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
        rentModifier: 1,    
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
    planetResources[planetResourceIndex].sold = true;
    document.getElementById("soldPlanets"+planetResourceIndex).classList.add('soldPlanets');
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

var floodRiskGlobalModifier = 1;
var hurricaneRiskGlobalModifier = 1;
var meteorRiskGlobalModifier = 1;
var globalNaturalDisasterModifier = 1;
var globalShieldGenerated = 0;
var globalProductionFactor = {
    water: 1,
    oil: 1,
    uranium: 1,
    iron: 1
};
var planetLevelOfResource = {
    water: 2,
    oil: 3,
    uranium: 4,
    iron: 5
};
drawMoney();
var interplanetaryCivilWarRisk = .04;
var shipPopulation = 70;
var shipPopulationBonus = 0;
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
"hole6", "hole7", "Pluto", "Charon", "dot6", "FS V", "dot7", "dot8", "Phobos", "Mars", "Deimos", "dot9", "Venus RL", "Venus", "hole8", "Phoebe", "Mimas", "Saturn SD", "Dione",
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