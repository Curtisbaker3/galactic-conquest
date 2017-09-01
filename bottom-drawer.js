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
  description: 'Click to bolster defences. +60 to safety. Decreases risk of invasion. Cost 20.',
  cost: 20
}, {
  description: 'Click to send troops. Cost 15.',
  cost: 15
}, ]

const availableBuildItems = [{
    title: 'Relocate Citizens',
    description: 'Transfers citizens to other planets',
    cost: 5
}, {
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
      case 'Bank Center': 
        onBuildBank(currentBuildPlanetIndex, index); //index is the current build item
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
      case 'Nuclear Weapons': 
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

function onBuildIronCentre(index, buildItem) {
  var t = planets[index].availableBuildItems[buildItem];
  planets[index].ironGenerated += t.ironGenerated;
  x = t.incomeCost;
  y = t.ironGenerated;
  planets[index].expenses += x;
  t.incomeCost *= 2;
  t.cost *= 2;
  t.ironGenerated *= 2;
  x = t.incomeCost;
  t.description = 'Generates ' + y + 't iron. Decreases income by ' + x;  
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildFountain(index, buildItem) {
  planets[index].waterPopRateMod += .3;
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  drawBuildMenu();
}

function onBuildUniversalFountain(index, buildItem) {
  waterBaseRateModUniversalFountain += .01;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 2.2
  planets[index].availableBuildItems[buildItem].incomeCost *= 2.2
  planets[index].availableBuildItems[buildItem].description = 'Adds +1% to the base pop. growth rate of all planets. -' + (planets[index].availableBuildItems[buildItem].incomeCost).toFixed(1) + ' inc.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildUpgradedWaterWells(index, buildItem) {
  globalWaterProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all water generators by 10%. -' + (planets[index].availableBuildItems[buildItem].incomeCost).toFixed(1) + ' inc.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildUpgradedOilWells(index, buildItem) {
  globalOilProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all oil generators by 10%. -' + (planets[index].availableBuildItems[buildItem].incomeCost).toFixed(1) + ' inc.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildUpgradedUraniumMills(index, buildItem) {
  globalUraniumProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all uranium generators by 10%. -' + (planets[index].availableBuildItems[buildItem].incomeCost).toFixed(1) + ' inc.'
  drawIncome(calculateIncome());
  drawPlanets();
  drawBuildMenu();
}

function onBuildUpgradedIronCenters(index, buildItem) {
  globalIronProductionFactor *= 1.1;
  planets[index].expenses += planets[index].availableBuildItems[buildItem].incomeCost
  planets[index].availableBuildItems[buildItem].cost *= 1.5
  planets[index].availableBuildItems[buildItem].incomeCost *= 1.5
  planets[index].availableBuildItems[buildItem].description = 'Increases production of all iron generators by 10%. -' + (planets[index].availableBuildItems[buildItem].incomeCost).toFixed(1) + ' inc.'
  drawIncome(calculateIncome());
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
      var transferPercent = (targetPlanet.population / 10) / totalAmountAvailable;
      console.log('initial auto transfer percent: ' + transferPercent);
      charge = 5
      } else {
        transferPercent = 0;
        charge 
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
        console.log('made it to manual transfer');
        transferPercent = .3;
        var individualAmountTaken = donatorPlanet[resourceKey] * transferPercent;
        console.log ('DONATOR PLANETS: ' + donatorPlanet[resourceKey]);
        console.log(transferPercent);
        console.log('individual amount taken: ' + individualAmountTaken)
        totalAmountTaken += Number(individualAmountTaken);
        donatorPlanet[resourceKey] -= individualAmountTaken;
    }
      var charge = 5;
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

function onTransferOil(planetIndex, event) {
  event.preventDefault();
  event.stopPropagation();  
  console.log(event);
      if (event.ctrlKey) {
        planets[planetIndex].oilAutoTransfer = 1;
      }
      if (event.shiftKey) {
        if (planets[planetIndex].oilAutoTransfer = 0) {
        planets[planetIndex].oilAutoTransfer = 0;
        return;
        } else {
          planets[planetIndex].oilAutoTransfer = 0;
          return;
        }
    }
    if (!event.shiftKey && !event.ctrlKey) {
      manualTransfer = true
    }
    addOilTransfer(planetIndex);
}
  var manualTransfer = false

function addOilTransfer(planetIndex) {
  var receivingPlanet = planets[planetIndex];
  var totalAmountTaken = 0;
  var individualAmountTaken = 0;
  var totalAmountAvailable = 0;
  const oilPlanets = _.filter(planets, {resource: 'Oil'}); // filtered version, with all the oil planets
  for (var i = 0; i < oilPlanets.length; i++) {
    totalAmountAvailable += planets[i].oil;
  }
  if (totalAmountAvailable < 1) {
    return;
  } else {
  for (var i = 0; i < oilPlanets.length; i++) {
    if (receivingPlanet === oilPlanets[i]) {
      continue;
    }
    if (planets[planetIndex].oilAutoTransfer > 0) {
      if (receivingPlanet.oil < planets[planetIndex].population / 10) {
      transferAmount = (receivingPlanet.population / 10) / totalAmountAvailable;
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
    individualAmountTaken = oilPlanets[i].oil * transferAmount;
    totalAmountTaken += Number(individualAmountTaken);
    oilPlanets[i].oil -= individualAmountTaken;
    }
  }
  receivingPlanet.oil += totalAmountTaken;
  drawPlanets();
  if (totalAmountTaken > 0) {money -= charge;} //take money if we did something
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