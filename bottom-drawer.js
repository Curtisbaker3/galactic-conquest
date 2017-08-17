function toggleBuildMenu() {
  document.getElementById('build-menu').classList.toggle('shown');
}

const availableBuildItems = [
  ..._.range(1000).map(() => ({
    title: 'Some Purchase',
    description: 'Some brief description of the purchase.',
    cost: 30
  }))
];

function renderBuildMenuItem(buildItem) {
  return `
    <div class="bottom-drawer-shop-item">
      <div class="bottom-drawer-item-title">${ buildItem.title }</div>
      <div class="bottom-drawer-item-cost">${ formatMoney(buildItem.cost) }</div>
      <div class="bottom-drawer-item-description">${ buildItem.description }</div>
    </div>
  `;
}

function drawBuildMenu() {
  const buildMenuItemsDiv = document.getElementById('build-menu-items');
  while (buildMenuItemsDiv.firstChild) { buildMenuItemsDiv.removeChild(buildMenuItemsDiv.firstChild); }
  buildMenuItemsDiv.innerHTML = availableBuildItems.map(renderBuildMenuItem).join('');
}

drawBuildMenu();

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