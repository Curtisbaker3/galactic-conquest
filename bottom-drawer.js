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

const availableBuildItems = [{
    title: 'Send Troops',
    description: 'Sends troops to fight invaders',
    cost: 15
}, {
    title: 'Bolster Defences',
    description: 'Improves defences, decreasing risk of invasion. +60 to safety',
    cost: 20
}, {
    title: 'Transfer Citizens',
    description: 'Transfers citizens from other planets to this planet',
    cost: 5
}, {
    title: 'Transfer Water',
    description: 'Transfers water from other planets to this one',
    cost: 5
}, {
    title: 'Transfer Oil',
    description: 'Transfers oil from other planets to this one',
    cost: 5
}, {
    title: 'Hire Foreigners',
    description: 'Hires 10 foreigners to repopulate the planet',
    cost: 100
}, ];

function renderBuildMenuItem(buildItem, i) {
  return `
    <div class="bottom-drawer-shop-item" onclick="onBuildItemClicked(${i})">
      <div class="bottom-drawer-item-title">${ buildItem.title }</div>
      <div class="bottom-drawer-item-cost">${ formatMoney(buildItem.cost) }</div>
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
  if (money >= buildItem.cost) {
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
      case 'Transfer Water': 
        onTransferWater(currentBuildPlanetIndex);
        break;
      case 'Transfer Oil': 
        onTransferOil(currentBuildPlanetIndex);
        break;
      case 'Hire Foreigners': 
        onHireForeigners(currentBuildPlanetIndex);
        break;
      case 'Gold Mine': 
        onBuildGoldMine(currentBuildPlanetIndex, index); //index is the current build item
        break; 
      case 'Bank Center': 
        onBuildBank(currentBuildPlanetIndex, index); //index is the current build item
        break;  
      case 'Water Generator': 
        onBuildWaterGenerator(currentBuildPlanetIndex, index); //index is the current build item
        break;  
      case 'Oil Extractor': 
        onBuildOilExtractor(currentBuildPlanetIndex, index); //index is the current build item
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
  planets[index].incomeBonuses += 5;
  drawIncome(calculateIncome());
  drawPlanets();
  planets[index].availableBuildItems[buildItem].cost *= 2
  drawBuildMenu();
  console.log(planets[index].incomeBonuses + 'income bonuses');
}

function onBuildBank(index, buildItem) {
  x = planets[index].availableBuildItems[buildItem].incomeCost;
  planets[index].availableBuildItems[buildItem].description = 'Decreases income by ' + x;  
  planets[index].incomeBonuses -= x;
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5;  
}

function onBuildWaterGenerator(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].waterGenerated += t.waterGenerated;
  t.incomeCost *= 2;
  t.cost *= 2;
  x = t.incomeCost;
  planets[index].expenses += x;
  t.waterGenerated *= 2;
  y = t.waterGenerated;
  t.description = 'Generates ' + y + 't water. Decreases income by ' + x;  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildOilExtractor(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].oilGenerated += t.oilGenerated;
  t.incomeCost *= 2;
  t.cost *= 2;
  x = t.incomeCost;
  planets[index].expenses += x;
  t.oilGenerated *= 2;
  y = t.oilGenerated;
  t.description = 'Generates ' + y + 't oil. Decreases income by ' + x;  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onSendTroops(index) {
    var planet = planets[index];
    var tempTroopsToSend = planet.enemies * .8;
    var tempRandomStrength = .5 + Math.random();
    if (planet.population < tempTroopsToSend) {
        tempTroopsToSend = planet.population;
        planet.enemies = planet.enemies - (tempTroopsToSend * tempRandomStrength).toFixed(0);
        if (planet.enemies < 0) planet.enemies = 0;
    } else {
        planet.enemies = planet.enemies - (tempTroopsToSend * tempRandomStrength);
    }
      planet.population -= tempTroopsToSend;
    drawPlanets();
    drawIncome(calculateIncome());
}

function onBolsterDefences(index) {
    var planet = planets[index];
    if (planet.safetyLevel + 60 >= 100) {
      planet.safetyLevel = 100
    } else {
      planet.safetyLevel += 60;
    }
    drawPlanets();
}

function onTransferCitizens(index) {
    var planetTarget = planets[index];
    var tempPopulationToSend = calculateTotalPopulation() * .1;

    if (planetTarget.population + tempPopulationToSend < planetTarget.maxpopulation) {
      planetTarget.population += tempPopulationToSend;


      for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        planet.population *= .9;
      }
    } else {
      alert('Not enough population space!');
    }
      drawTotalPopulation(calculateTotalPopulation());
      drawPlanets();
      calculateIndividualPlanetIncomes();
      drawIncome(calculateIncome());
}

function onTransferWater(planetIndex) {
  var planetTarget = planets[planetIndex];
  var totalWaterTaken = 0;
  var eachWaterTaken = 0;
  for (var i = 0; i < planets.length; i++) {
    eachWaterTaken = planets[i].water * .1;
    totalWaterTaken += Number(eachWaterTaken);
    planets[i].water -= eachWaterTaken;
  }
  planetTarget.water += totalWaterTaken;
  drawPlanets();
}

function onTransferOil(planetIndex) {
  var planetTarget = planets[planetIndex];
  var totalOilTaken = 0;
  var eachOilTaken = 0;
  for (var i = 0; i < planets.length; i++) {
    eachOilTaken = planets[i].oil * .1;
    totalOilTaken += Number(eachOilTaken);
    planets[i].oil -= eachOilTaken;
  }
  planetTarget.oil += totalOilTaken;
  drawPlanets();
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