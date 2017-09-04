function toggleBuildMenu() {
  document.getElementById('build-menu').classList.toggle('shown');
}

function openBuildMenu(planetIndex) {
  currentBuildPlanetIndex = planetIndex;  
  drawBuildMenu();
  document.getElementById('build-menu').classList.add('shown');  
  document.body.classList.add('bottom-drawer-shown');
}

function closeBuildMenu() {
  document.getElementById('build-menu').classList.remove('shown');  
  document.body.classList.remove('bottom-drawer-shown');
  currentBuildPlanetIndex = -1;
}

var currentBuildPlanetIndex = -1;

function onPlanetRowClicked(i) {
  if (i === currentBuildPlanetIndex) {
    closeBuildMenu();
  } else {
    openBuildMenu(i);
  }
}

const mainPageBuildItems = [{
  description: 'Click to bolster defences. +60 to shields. Decreases risk of invasion.',
  cost: 14,
  incomeCost: 0,
}, {
  description: 'Click to send troops.',
  cost: 10,
  incomeCost: 0,
}, ]

function createGeoenginneringCenterButtons(i) {
  if (geoengineeringCenterConstructed == true) {
    planets[i].availableBuildItems.push({
    title: 'Anti-Flooding Climate Center',
    description: 'Decreases risk of floods on this planet by 50%.',
    cost: 20,
    incomeCost: 0,
    }, {
    title: 'Anti-Hurricane Climate Center',
    description: 'Decreases risk of hurricanes on this planet by 50%',
    cost: 35,
    incomeCost: 0,
    });
  }
}

function createSpecialButtons(i) {
  createGeoenginneringCenterButtons(i);
    switch(planets[i].resource) {
        case 'Gold': 
            planets[i].availableBuildItems.push({
            title: 'Gold Mine',
            description: 'Increases income by 3',
            cost: 50,
            incomeCost: 0,
        });
        case 'Gold': 
            planets[i].availableBuildItems.push({
            title: 'Tax Centre',
            description: 'Increases rent on planet.',
            cost: 50,
            incomeCost: 2
        });
        case 'Gold': 
            planets[i].availableBuildItems.push({
            title: 'Tourism Ship Module',
            description: 'Increases immigration to ship by +3/year',
            cost: 30,
            incomeCost: .5
        });
        break;
        case 'Copper': 
            planets[i].availableBuildItems.push({
            title: 'Bank Center',
            description: 'Loans $150 with interest.',
            cost: -150,
            incomeCost: 2
        });
        break;
        case 'Water': 
            planets[i].availableBuildItems.push({
            title: 'Water Well',
            description: 'Generates 20t water/yr.',
            cost: 20,
            incomeCost: 1,
            buildCount: 0,
            waterGenerated: 20,
        });
        case 'Water': 
            planets[i].availableBuildItems.push({
            title: 'Fountains',
            description: 'Increases this planets population growth by 30%',
            cost: 20,
            incomeCost: 0,
        });
        case 'Water': 
            planets[i].availableBuildItems.push({
            title: 'Universal Fountains',
            description: 'Adds +1% to the base pop. growth rate of all planets.',
            cost: 50,
            incomeCost: 2,
        });
        break;
        case 'Oil': 
            planets[i].availableBuildItems.push({
            title: 'Oil Extractor',
            description: 'Generates 40t oil/yr.',
            cost: 50,
            incomeCost: 2,
            buildCount: 0,
            oilGenerated: 40,
        });
        break;
        case 'Uranium': 
            planets[i].availableBuildItems.push({
            title: 'Uranium Mill',
            description: 'Generates 60t uranium/yr.',
            cost: 80,
            incomeCost: 3,
            buildCount: 0,
            uraniumGenerated: 60,
        });
        case 'Uranium': 
            planets[i].availableBuildItems.push({
            title: 'Nuclear Shields',
            description: 'Increases shields of all planets by +1/year. Shield output decline 7%/turn.',
            cost: 20,
            incomeCost: 1,
            buildCount: 0,
            shieldGenerated: 1,
        });
        case 'Uranium': 
            planets[i].availableBuildItems.push({
            title: 'Nuclear Facility',
            description: 'Nuclear explosives reduce risk of meteors striking all planets by 30%.',
            cost: 20,
            incomeCost: 2,
            buildCount: 0,
            nuclearFacility: 1,
        });
        break;
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Iron Centre',
            description: 'Generates 80t iron/yr.',
            cost: 100,
            incomeCost: 4,
            buildCount: 0,
            ironGenerated: 80,
        });
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Upgrade Oil Wells',
            description: 'Increases production of all oil wells by 10%',
            cost: 20,
            incomeCost: 1,
        });
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Upgrade Water Wells',
            description: 'Increases production of all water wells by 10%',
            cost: 20,
            incomeCost: 1,
        });
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Upgrade Uranium Mills',
            description: 'Increases production of all uranium mills by 10%',
            cost: 20,
            incomeCost: 1,
        });
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Upgrade Iron Centers',
            description: 'Increases production of all iron by 10%',
            cost: 20,
            incomeCost: 1,
        });
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Geoengineering Center',
            description: 'Allows planets to build climate control centers. Also, reduces risk of all floods & hurricanes by 30%.',
            cost: 30,
            incomeCost: 1,
        });
        break;
        default:
            console.log('no unique resources');
        break;
    }
}

const availableBuildItems = [{
    title: 'Relocate Citizens',
    description: 'Transfers citizens to other planets',
    cost: 5,
    incomeCost: 0,
}, {
    title: 'Hire Foreigners',
    description: 'Hires 10 foreigners to repopulate the planet',
    cost: 100,
    incomeCost: 0,
}, {
    title: 'Evacuate Citizens',
    description: 'Evacuates 10 citizens to the ship',
    cost: 30,
    incomeCost: 0,
}, ];

function renderBuildMenuItem(buildItem, i) {
  return `
    <div class="bottom-drawer-shop-item" onclick="onBuildItemClicked(${i})">
      <div class="bottom-drawer-item-title">${ buildItem.title }</div>
      <div class="bottom-drawer-item-cost">${ formatMoney(buildItem.cost) }</div>
      <div class="bottom-drawer-item-incomeCost">${ formatMoney(buildItem.incomeCost) } inc.</div>
      <div class="bottom-drawer-item-description">${ buildItem.description }</div>
    </div>
  `;
}

function drawBuildMenu() {
  if (currentBuildPlanetIndex < 0) {
    return;
  }
  const buildMenuItemsDiv = document.getElementById('build-menu-items');
  while (buildMenuItemsDiv.firstChild) { buildMenuItemsDiv.removeChild(buildMenuItemsDiv.firstChild); }
  var items = planets[currentBuildPlanetIndex].availableBuildItems;
  buildMenuItemsDiv.innerHTML = items.map(renderBuildMenuItem).join('');
  document.getElementById('build-menu-title').innerText = planets[currentBuildPlanetIndex].name;
}

drawBuildMenu();

function onBuildItemClicked(index) {
  var planet = planets[currentBuildPlanetIndex];
  var buildItem = planet.availableBuildItems[index];
  if (0 < 1) { //money >= buildItem.cost --inside the if statement once line of credit implemented
    money -= buildItem.cost
    drawMoney();
    switch(buildItem.title) {
      case 'Send Troops': 
        onSendTroops(currentBuildPlanetIndex);
        break;
      case 'Bolster Defences': 
        onBolsterDefences(currentBuildPlanetIndex);
        break;
      case 'Transfer Citizens': 
        onTransferCitizens(currentBuildPlanetIndex);
        break;
      case 'Relocate Citizens': 
        onRelocateCitizens(currentBuildPlanetIndex);
        break;
      case 'Transfer Water': 
        onTransferWater(currentBuildPlanetIndex);
        break;
      case 'Transfer Oil': 
        onTransferOil(currentBuildPlanetIndex);
        break;
      case 'Transfer Uranium': 
        onTransferUranium(currentBuildPlanetIndex);
        break;
      case 'Transfer Iron': 
        onTransferIron(currentBuildPlanetIndex);
        break;
      case 'Hire Foreigners': 
        onHireForeigners(currentBuildPlanetIndex);
        break;
      case 'Evacuate Citizens': 
        onEvacuateCitizens(currentBuildPlanetIndex);
        break;
      case 'Gold Mine': 
        onBuildGoldMine(currentBuildPlanetIndex, index); //index is the current build item
        break; 
      case 'Tax Centre': 
        onBuildTaxCentre(currentBuildPlanetIndex, index); //index is the current build item
        break;
      case 'Bank Center': 
        onBuildBank(currentBuildPlanetIndex, index); //index is the current build item
        break; 
      case 'Tourism Ship Module': 
        onBuildTourismShipModule(currentBuildPlanetIndex, index); //index is the current build item
        break;  
      case 'Water Well': 
        onBuildWaterWell(currentBuildPlanetIndex, index); //index is the current build item
        break;  
      case 'Oil Extractor': 
        onBuildOilExtractor(currentBuildPlanetIndex, index); //index is the current build item
        break;  
      case 'Uranium Mill': 
        onBuildUraniumMill(currentBuildPlanetIndex, index); //index is the current build item
        break;   
        case 'Nuclear Facility': 
          onBuildNuclearFacility(currentBuildPlanetIndex, index); //index is the current build item
          break;  
      case 'Nuclear Shields': 
        onBuildNuclearWeapons(currentBuildPlanetIndex, index); //index is the current build item
        break;    
      case 'Fountains': 
        onBuildFountain(currentBuildPlanetIndex, index); //index is the current build item
        break;        
      case 'Universal Fountains': 
        onBuildUniversalFountain(currentBuildPlanetIndex, index); //index is the current build item
        break;    
      case 'Iron Centre': 
        onBuildIronCentre(currentBuildPlanetIndex, index); //index is the current build item
        break;     
      case 'Upgrade Oil Wells': 
        onBuildUpgradedOilWells(currentBuildPlanetIndex, index); //index is the current build item
        break;     
      case 'Upgrade Water Wells': 
        onBuildUpgradedWaterWells(currentBuildPlanetIndex, index); //index is the current build item
        break;     
      case 'Upgrade Uranium Mills': 
        onBuildUpgradedUraniumMills(currentBuildPlanetIndex, index); //index is the current build item
        break;      
      case 'Upgrade Iron Centers': 
        onBuildUpgradedIronCenters(currentBuildPlanetIndex, index); //index is the current build item
        break;   
      case 'Geoengineering Center': 
        onBuildGeoengineeringCenter(currentBuildPlanetIndex, index); //index is the current build item
        break;   
      case 'Anti-Flooding Climate Center': 
        onBuildAntiFloodingClimateCenter(currentBuildPlanetIndex, index); //index is the current build item
        break;   
      case 'Anti-Hurricane Climate Center': 
        onBuildAntiFloodingClimateCenter(currentBuildPlanetIndex, index); //index is the current build item
        break;
      default:
        alert('Item not configured: ' + buildItem.title);
        break;
    }
  } else {
    alert('Not enough funds!');
  }
}

function onBuildGoldMine(index, buildItem) {
  planets[index].incomeBonuses += 3;
  drawIncome(calculateIncome());
  drawPlanets();
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  drawBuildMenu();
}
function onBuildTaxCentre(index, buildItem) {
  planets[index].rentModifier *= 1.3;
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  calculateRent(index);
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildBank(index, buildItem) {
  x = planets[index].availableBuildItems[buildItem].incomeCost;
  planets[index].incomeBonuses -= x;
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5;  
  planets[index].availableBuildItems[buildItem].description = 'Loans 150 with interest';  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildTourismShipModule(index, buildItem) {
  shipPopulationBonus += 3;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost;
  planets[index].availableBuildItems[buildItem].incomeCost *= 2;  
  planets[index].availableBuildItems[buildItem].cost *= 2;
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildNuclearWeapons(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  globalShieldGenerated += t.shieldGenerated;
  x = t.incomeCost;
  y = t.shieldGenerated;
  planets[index].expenses += x;
  t.incomeCost *= 1.2;
  t.cost *= 1.3;
  t.description = 'Increases shields of all planets by ' + y + ' per year. Shield output declines 10%/turn.';
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildWaterWell(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].waterGenerated += t.waterGenerated;
  x = t.incomeCost;
  planets[index].expenses += x;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.waterGenerated *= 2;
  x = t.incomeCost;
  y = t.waterGenerated;
  t.description = 'Generates ' + y + 't water.';
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildOilExtractor(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].oilGenerated += t.oilGenerated;
  y = t.oilGenerated;
  planets[index].expenses += t.incomeCost;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.oilGenerated *= 2;
  t.description = 'Generates ' + y + 't oil.';
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildUraniumMill(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].uraniumGenerated += t.uraniumGenerated;
  y = t.uraniumGenerated;
  planets[index].expenses += t.incomeCost;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.uraniumGenerated *= 2;
  t.description = 'Generates ' + y + 't uranium.';  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildIronCentre(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].ironGenerated += t.ironGenerated;
  y = t.ironGenerated;
  planets[index].expenses += t.incomeCost;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.ironGenerated *= 2;
  t.description = 'Generates ' + y + 't iron.';  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildFountain(index, buildItem) {
  planets[index].waterPopRateMod += .3;
  planets[index].availableBuildItems[buildItem].cost *= 3
  drawBuildMenu();
}
function onBuildUniversalFountain(index, buildItem) {
  waterBaseRateModUniversalFountain += .01;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 2.2
  planets[index].availableBuildItems[buildItem].incomeCost *= 2.2
  planets[index].availableBuildItems[buildItem].description = 'Adds +1% to the base pop. growth rate of all planets.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildUpgradedWaterWells(index, buildItem) {
  globalWaterProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all water generators by 10%.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildUpgradedOilWells(index, buildItem) {
  globalOilProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all oil generators by 10%.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildUpgradedUraniumMills(index, buildItem) {
  globalUraniumProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all uranium generators by 10%.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildUpgradedIronCenters(index, buildItem) {
  globalIronProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all iron generators by 10%.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
var geoengineeringCenterConstructed = false;
function onBuildGeoengineeringCenter(index, buildItem) {
  globalNaturalDisasterModifier *= .7;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.3
  planets[index].availableBuildItems[buildItem].description = 'Allows planets to build climate control centers. Also, reduces risk of all floods & hurricanes by 30%.'
  if (geoengineeringCenterConstructed == false) {
    geoengineeringCenterConstructed = true;
      for (var i = 0; i < planets.length; i++) {
        createGeoenginneringCenterButtons(i);
        calculateHurricaneRisk(i);
        calculateMeteorRisk(i);
        calculateFloodRisk(i);
        }
  }
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildNuclearFacility(index, buildItem) {
  meteorRiskGlobalModifier *= .7;
    for (var i = 0; i < planets.length; i++) {
      calculateMeteorRisk(i);
    }
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.3
  planets[index].availableBuildItems[buildItem].description = 'Decreases risk of meteors on all planets by 30%. Current risk: ' + (planets[index].meteorRisk*100).toFixed(1) + '%';
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}
function onBuildAntiFloodingClimateCenter(index, buildItem) {
  planets[index].floodRiskModifier *= .5;
  calculateFloodRisk(index);
  planets[index].availableBuildItems[buildItem].cost *= 1.3
  planets[index].availableBuildItems[buildItem].description = 'Decreases risk of floods on this planet by 50%. Current risk: ' + (planets[index].floodRisk*100).toFixed(1) + '%';
  drawPlanets();
  drawBuildMenu();
}
function onBuildAntiHurricaneClimateCenter(index, buildItem) {
  planets[index].hurricaneRiskModifier *= .5;
  calculateHurricaneRisk(index);
  planets[index].availableBuildItems[buildItem].cost *= 1.3
  planets[index].availableBuildItems[buildItem].description = 'Decreases risk of hurricanes on this planet by 50%. Current risk: ' + (planets[index].hurricaneRisk*100).toFixed(1) + '%';
  drawPlanets();
  drawBuildMenu();
}

function onSendTroops(index) {
  event.preventDefault();
  event.stopPropagation();
  var planet = planets[index];
  if (planet.enemies > 0) {
    money -= mainPageBuildItems[1].cost
  }
  var tempTroopsToSend = planet.enemies * .8;
  var tempRandomStrength = .5 + Math.random();
  if (planet.population < tempTroopsToSend) {
      tempTroopsToSend = planet.population;
      planet.enemies = planet.enemies - (tempTroopsToSend * tempRandomStrength).toFixed(0);
  } else {
      planet.enemies = planet.enemies - (tempTroopsToSend * tempRandomStrength);
  }
  planet.population -= tempTroopsToSend;
  if (planet.enemies < 0) {planet.enemies = 0}
  drawPlanets();
  drawMoney();
  drawIncome(calculateIncome());
}
function onBolsterDefences(index) {
  event.preventDefault();
  event.stopPropagation();
  money -= Number(planets[index].mainPageBuildItems[0].cost)
  planets[index].mainPageBuildItems[0].cost += 2
  console.log(index)
    var planet = planets[index];
    if (planet.shieldLevel + 60 >= 110) {
      planet.shieldLevel = 110
    } else {
      planet.shieldLevel += 60;
    }
    drawPlanets();
    drawMoney();
}
function onTransferCitizens(index) {
  event.preventDefault();
  event.stopPropagation();
  money -= 5;
  drawMoney();
    var planetTarget = planets[index];
    var tempPopulationToSend = calculateTotalPopulation() * .1;

    if (planetTarget.population + tempPopulationToSend < planetTarget.maxpopulation) {
      planetTarget.population += tempPopulationToSend;


      for (var i = 0; i < planets.length; i++) {
        planets[i].population *= .9;
      }
    } else {
      tempPopulationToSend = planets[index].maxpopulation - planets[index].population;
      var popToSendFromEachPlanet = tempPopulationToSend / planets.length;
      for (var i = 0; i < planets.length; i++) {
      planets[i].population -= popToSendFromEachPlanet;
      planets[index].population = planetTarget.maxpopulation;
      } 
    }
  drawTotalPopulation(calculateTotalPopulation());
  calculateIndividualPlanetIncomes();
  drawIncome(calculateIncome());
  drawPlanets();
}
function onRelocateCitizens(index) {
    var planetTarget = planets[index];
    var totalPopulationToSend = planetTarget.population * .3;
    var popToSendToEach = totalPopulationToSend / (planets.length -1)
    var int = 0

      for (var i = 0; i < planets.length; i++) {
        int += 1;
        if (planets[i].population + popToSendToEach < planets[i].maxpopulation) {
          if (planets[i] === planetTarget) {
            continue;
          }
      planets[i].population += popToSendToEach;
      totalPopulationToSend -= popToSendToEach;
      planetTarget.population -= popToSendToEach;
      } else {
      
      populationToSendNow = planets[i].maxpopulation - planets[i].population;
      totalPopulationToSend -= planets[i].maxpopulation - planets[i].population;
      planets[i].population = planets[i].maxpopulation
      planetTarget.population -= populationToSendNow;
      popToSendToEach += totalPopulationToSend / (planets.length - (int - 1));
      } 
    }
  drawTotalPopulation(calculateTotalPopulation());
  calculateIndividualPlanetIncomes();
  drawIncome(calculateIncome());
  drawPlanets();
}
function onTransferResourceInit(planetIndex, event, currentResource) {
  event.preventDefault();
  event.stopPropagation();
      if (event.ctrlKey) {
        planets[planetIndex][currentResource.toLowerCase() + 'AutoTransfer'] = 1;
      }
      if (event.shiftKey) {
        if (planets[planetIndex][currentResource.toLowerCase() + 'AutoTransfer'] = 0) {
        planets[planetIndex][currentResource.toLowerCase() + 'AutoTransfer'] = 0;
        return;
        } else {
          planets[planetIndex][currentResource.toLowerCase() + 'AutoTransfer'] = 0;
          return;
        }
    }
    if (!event.shiftKey && !event.ctrlKey) {
      manualTransfer = true;
      console.log('manual transfer: ' + manualTransfer)
    }
    transferResource(planetIndex, currentResource);
}
var manualTransfer = false
function transferResource(planetIndex, currentResource) {
  console.log('ran transferResource on: ' + planetIndex);
  
  const donatorPlanets = _.filter(planets, { resource: currentResource });
  const targetPlanet = planets[planetIndex];
  const resourceKey = currentResource.toLowerCase();
  var totalAmountAvailable = 0;
  var totalAmountTaken = 0;
  var transferPercent = 0;
  var charge = 0;
 
  // Loop through donators to find total amount available.
  donatorPlanets.forEach(donatorPlanet => {
    if (donatorPlanet.population / 10 < donatorPlanet[resourceKey] || donatorPlanet.usesResourceAt[donatorPlanet.level] == false) { //contine if it's currently not using it or has enough
    totalAmountAvailable += donatorPlanet[resourceKey];
    console.log('first IF!')  
    }
  });
 
  // Loop through donators to actually set amount to transfer.
  donatorPlanets.forEach(donatorPlanet => {
    // Ignore the planet we're targetting.
    if (targetPlanet === donatorPlanet) {
      return;
    }
    if (donatorPlanet.population / 10 > donatorPlanet[resourceKey] && donatorPlanet.usesResourceAt[donatorPlanet.level] == true) {
      console.log('second if!!');
      return;
    }
 
    if (targetPlanet[resourceKey + 'AutoTransfer']) {
      console.log('autotransfer is true')
      // If auto transfer for the resource is enabled this will run.
      if (targetPlanet[resourceKey] < targetPlanet.population / 10) {
      var transferPercent = (targetPlanet.population / 10) / (totalAmountAvailable + 1); //this may be a problem when totalAmountAvailable is 0!!
      console.log('initial auto transfer percent: ' + transferPercent);
      charge = 1
      } else {
        transferPercent = 0;
        charge = 1;
      }
    } else {
        transferPercent = 0;
        charge = 0;
      // If auto transfer is disabled this will run.
    }   

    var individualAmountTaken = donatorPlanet[resourceKey] * transferPercent;
    console.log('first transfer percent: ' + transferPercent);
    console.log('first donator planet amount: ' + donatorPlanet[resourceKey]);
    console.log('individual amount taken: ' + individualAmountTaken)
    totalAmountTaken += Number(individualAmountTaken);
    donatorPlanet[resourceKey] -= individualAmountTaken;

      if (manualTransfer == true) {
          if (totalAmountAvailable < 1) {
            return alert('No resources to transfer.');
          }
        var charge = 5;
        console.log('made it to manual transfer');
        transferPercent = .3;
        var individualAmountTaken = donatorPlanet[resourceKey] * transferPercent;
        console.log ('DONATOR PLANETS: ' + donatorPlanet[resourceKey]);
        console.log(transferPercent);
        console.log('individual amount taken: ' + individualAmountTaken)
        totalAmountTaken += Number(individualAmountTaken);
        donatorPlanet[resourceKey] -= individualAmountTaken;
    }
      money -= charge;
      
    });


  console.log('transfer percent: ' + transferPercent);
  manualTransfer = false;
 
  targetPlanet[resourceKey] += totalAmountTaken;
  drawPlanets();
  if (totalAmountTaken > 0) {
    drawMoney();
  }
}
function onHireForeigners(index) {
    var planetTarget = planets[index];
    var tempPopulationToSend = 10;
    if (planetTarget.population + 10 < planetTarget.maxpopulation) {
      planetTarget.population += tempPopulationToSend;
      drawTotalPopulation(calculateTotalPopulation());
      drawPlanets();
      calculateIndividualPlanetIncomes();
      drawIncome(calculateIncome());
    } else {
      alert('Not enough population space!');
    }

}
function onEvacuateCitizens(index) {
    var planetTarget = planets[index];
    var tempPopulationToSend = 10;
    if (planetTarget.population - 10 >= 0) {
      planetTarget.population -= tempPopulationToSend;
      shipPopulation += 10;
      drawShipPopulation();
      drawTotalPopulation(calculateTotalPopulation());
      drawPlanets();
      calculateIndividualPlanetIncomes();
      drawIncome(calculateIncome());
    } else {
      alert('Not enough citizens!');
    }

}