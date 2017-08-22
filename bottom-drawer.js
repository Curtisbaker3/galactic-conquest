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
  description: 'Click to bolster defences. +60 to safety. Decreases risk of invasion.',
  cost: 20
}, {
  description: 'Click to send troops.',
  cost: 15
}, ]

const availableBuildItems = [{
    title: 'Send Troops',
    description: 'Sends troops to fight invaders',
    cost: 15
}, {
    title: 'Relocate Citizens',
    description: 'Transfers citizens to other planets',
    cost: 5
}, /*{
    title: 'Transfer Water',
    description: 'Transfers water from other planets to this one',
    cost: 5
}, {
    title: 'Transfer Oil',
    description: 'Transfers oil from other planets to this one',
    cost: 5
}, {
    title: 'Transfer Uranium',
    description: 'Transfers uranium from other planets to this one',
    cost: 10
}, */{
    title: 'Hire Foreigners',
    description: 'Hires 10 foreigners to repopulate the planet',
    cost: 100
}, {
    title: 'Evacuate Citizens',
    description: 'Evacuates 10 citizens to the ship',
    cost: 30
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
      case 'Hire Foreigners': 
        onHireForeigners(currentBuildPlanetIndex);
        break;
      case 'Evacuate Citizens': 
        onEvacuateCitizens(currentBuildPlanetIndex);
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
      case 'Uranium Mill': 
        onBuildUraniumMill(currentBuildPlanetIndex, index); //index is the current build item
        break;   
      case 'Nuclear Weapons': 
        onBuildNuclearWeapons(currentBuildPlanetIndex, index); //index is the current build item
        break;    
      case 'Fountains': 
        onBuildFountain(currentBuildPlanetIndex, index); //index is the current build item
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

function onBuildBank(index, buildItem) {
  x = planets[index].availableBuildItems[buildItem].incomeCost;
  planets[index].availableBuildItems[buildItem].description = 'Decreases income by ' + x;  
  planets[index].incomeBonuses -= x;
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5;  
}

function onBuildNuclearWeapons(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  globalSafetyGenerated += t.safetyGenerated;
  x = t.incomeCost;
  y = t.safetyGenerated;
  t.description = 'Increases safety level of all planets by ' + y + ' per year. Costs ' + x + ' income';
  planets[index].expenses += x;
  t.incomeCost *= 2;
  t.cost *= 2;
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildWaterGenerator(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].waterGenerated += t.waterGenerated;
  x = t.incomeCost;
  planets[index].expenses += x;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.waterGenerated *= 2;
  x = t.incomeCost;
  y = t.waterGenerated;
  t.description = 'Generates ' + y + 't water. Decreases income by ' + x;
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildOilExtractor(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].oilGenerated += t.oilGenerated;
  x = t.incomeCost;
  y = t.oilGenerated;
  console.log('paid this in income:' + x)
  planets[index].expenses += x;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.oilGenerated *= 2;
  x = t.incomeCost;
  t.description = 'Generates ' + y + 't oil. Decreases income by ' + x;
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildUraniumMill(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].uraniumGenerated += t.uraniumGenerated;
  x = t.incomeCost;
  y = t.uraniumGenerated;
  t.description = 'Generates ' + y + 't uranium. Decreases income by ' + x;  
  planets[index].expenses += x;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.uraniumGenerated *= 2;
  x = t.incomeCost;
  t.description = 'Generates ' + y + 't uranium. Decreases income by ' + x;  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildFountain(index, buildItem) {
  planets[index].waterPopRateMod += .3;
  planets[index].availableBuildItems[buildItem].cost *= 1.5
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
  planets[index].mainPageBuildItems[0].cost += 1
  console.log(index)
    var planet = planets[index];
    if (planet.safetyLevel + 60 >= 110) {
      planet.safetyLevel = 110
    } else {
      planet.safetyLevel += 60;
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
    var tempPopulationToSend = planetTarget.population * .3;
    var popToSendToEach = tempPopulationToSend / (planets.length -1)

      for (var i = 0; i < planets.length; i++) {
        if (planets[i].population + popToSendToEach < planets[i].maxpopulation) {
          if (planets[i] === planetTarget) {
            continue;
          }
      planets[i].population += popToSendToEach;
      tempPopulationToSend -= popToSendToEach;
      planetTarget.population -= popToSendToEach;
      } else {
      tempPopulationToSend -= planets[i].maxpopulation - planets[i].population;
      planets[i].population = planets[i].maxpopulation
      planetTarget.population -= tempPopulationToSend;
      } 
    }
      drawTotalPopulation(calculateTotalPopulation());
      calculateIndividualPlanetIncomes();
      drawIncome(calculateIncome());
      drawPlanets();
}

function onTransferWater(planetIndex, event) {
  event.preventDefault();
  event.stopPropagation();  
  console.log(event);
      if (event.ctrlKey) {
        planets[planetIndex].waterAutoTransfer += 1;
      }
      if (event.shiftKey) {
        if (planets[planetIndex].waterAutoTransfer = 0) {
        planets[planetIndex].waterAutoTransfer = 0;
        return;
        } else {
          planets[planetIndex].waterAutoTransfer -= 1;
          return;
        }
    }
    if (!event.shiftKey && !event.ctrlKey) {
      manualTransfer = true
    }
    addWaterTransfer(planetIndex);
}
  var manualTransfer = false

function addWaterTransfer(planetIndex) {
  var planetTarget = planets[planetIndex];
  var totalWaterTaken = 0;
  var eachWaterTaken = 0;
  const waterPlanets = _.filter(planets, {resource: 'Water'}); // filtered version, with all the water planets
  for (var i = 0; i < waterPlanets.length; i++) {
    if (planetTarget === waterPlanets[i]) {
      continue;
    }
    if (planets[planetIndex].waterAutoTransfer > 0) {
      if (planets[planetIndex].water < planets[planetIndex].population) {
      transferAmount = planets[planetIndex].waterAutoTransfer / 10
      var charge = 5
      } else {
        transferAmount = 0
      }
    }
      if (manualTransfer === true) {
      var charge = 5;
      transferAmount = .3;
      manualTransfer = false;
     
      }
    

    eachWaterTaken = waterPlanets[i].water * transferAmount;
    totalWaterTaken += Number(eachWaterTaken);
    waterPlanets[i].water -= eachWaterTaken;
  }
  planetTarget.water += totalWaterTaken;
  drawPlanets();
  if (totalWaterTaken > 0) {money -= charge;} //take money if we did something
  drawMoney();
}

function onTransferOil(planetIndex) {
  event.preventDefault();
  event.stopPropagation();  
  var planetTarget = planets[planetIndex];
  var totalOilTaken = 0;
  var eachOilTaken = 0;
  const oilPlanets = _.filter(planets, {resource: 'Oil'});
  for (var i = 0; i < planets.length; i++) {
    if (planetTarget === oilPlanets[i]) { //skips planet if
      continue;
    }
    eachOilTaken = planets[i].oil * .3;
    totalOilTaken += Number(eachOilTaken);
    planets[i].oil -= eachOilTaken;
  }
  planetTarget.oil += totalOilTaken;
  drawPlanets();
  if (totalOilTaken > 0) {money -= 5;} //take money if we did something  
  drawMoney();
}

function onTransferUranium(planetIndex) {
  event.preventDefault();
  event.stopPropagation();  
  var planetTarget = planets[planetIndex];
  var totalUraniumTaken = 0;
  var eachUraniumTaken = 0;
  const uraniumPlanets = _.filter(planets, {resource: 'Uranium'});
  for (var i = 0; i < planets.length; i++) {
    if (planetTarget === uraniumPlanets[i]) { //skips planet if
      continue;
    }
    eachUraniumTaken = planets[i].uranium * .3;
    totalUraniumTaken += Number(eachUraniumTaken);
    planets[i].uranium -= eachUraniumTaken;
  }
  planetTarget.uranium += totalUraniumTaken;
  drawPlanets();
  if (totalUraniumTaken > 0) {money -= 5;} //take money if we did something  
  drawMoney();
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