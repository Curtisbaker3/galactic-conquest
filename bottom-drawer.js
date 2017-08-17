function toggleBuildMenu() {
  document.getElementById('build-menu').classList.toggle('shown');
}

function openBuildMenu(planetIndex) {
  currentBuildPlanetIndex = planetIndex;  
  drawBuildMenu();
  document.getElementById('build-menu').classList.add('shown');  
}

function closeBuildMenu() {
  document.getElementById('build-menu').classList.remove('shown');  
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
    cost: 40
}, {
    title: 'Bolster Defences',
    description: 'Improves defences, decreasing risk of invasion. +60 to safety',
    cost: 20
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
      default:
        alert('Item not configured: ' + buildItem.title);
        break;
    }
  } else {
    alert('Not enough funds!');
  }
}

function onSendTroops(index) {
    var planet = planets[index];
    var tempTroopsToSend = planet.enemies * .5;
    var tempRandomStrength = .5 + Math.random();
    if (planet.population < tempTroopsToSend) {
        tempTroopsToSend = planet.population;
        planet.enemies = planet.enemies - (tempTroopsToSend * tempRandomStrength);
        if (planet.enemies < 0) planet.enemies = 0;
    } else {
        planet.enemies = planet.enemies - (tempTroopsToSend * tempRandomStrength);
    }
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

function onSendPopulation(index) {
    var planetTarget = planets[index];
    var tempPopulationToSend = calculateTotalPopulation() * .1;

    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        planet.population *= .9;
    }

    planetTarget.population += tempPopulationToSend;
    drawPopulation(calculateTotalPopulation());
    drawPlanets();
    calculateIndividualPlanetIncomes();
    drawIncome(calculateIncome());
}