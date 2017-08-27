function calculateIndividualPlanetIncomes() { //static function that does not increment income values, just sets it to it's current actual this turn based on pop
    for (var i = 0; i < planets.length; i++) {
        baseRate = planets[i].tax/2
        planets[i].income = planets[i].population * baseRate - planets[i].upkeep - (0 * planets[i].randomIncomeModifier + 0) - planets[i].expenses + planets[i].incomeBonuses; //random income modifier not in use currently
    }
}

function deductPlanetaryWater() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].water += planets[i].waterGenerated * globalWaterProductionFactor;
        if (planets[i].level >= 2) {
            var waterLevel = 'some';
            if (planets[i].water <= 0) {waterLevel = 'none'}       
            planets[i].water -= (planets[i].waterUsageFactor * planets[i].population * .1);
        }
        if (planets[i].water < 0) {
            planets[i].population += (planets[i].water);
            planets[i].water = 0
            if (waterLevel != 'none' && waterLevel == 'some') {
                alert('planet ' + planets[i].name + ' out of water!');
            }
            
        }
    } 
}

function deductPlanetaryOil() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].oil += planets[i].oilGenerated * globalOilProductionFactor;
        if (planets[i].level >= 3) {
            var oilLevel = 'some';
            if (planets[i].oil <= 0) {oilLevel = 'none'}       
            planets[i].oil = planets[i].oil - (planets[i].oilUsageFactor * planets[i].population * .1); //20% of population's worth of oil consumed
        }
        if (planets[i].oil < 0) {
            planets[i].population += (planets[i].oil);
            planets[i].oil = 0;
            if (oilLevel != 'none' && oilLevel == 'some') {
                alert('planet ' + planets[i].name + ' out of oil!');
            }
            
        }
    } 
}

function deductPlanetaryUranium() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].uranium += planets[i].uraniumGenerated * globalUraniumProductionFactor;
        if (planets[i].level >= 4) {
            var uraniumLevel = 'some';
            if (planets[i].uranium <= 0) {uraniumLevel = 'none'}       
            planets[i].uranium -= (planets[i].uraniumUsageFactor * planets[i].population * .1); //10% of population's worth of uranium consumed
        }
        if (planets[i].uranium < 0) { //no uranium after deduction
            planets[i].population += (planets[i].uranium);
            planets[i].uranium = 0;
            if (uraniumLevel != 'none' && uraniumLevel == 'some') { //if there was 'some', but now there is none
                alert('planet ' + planets[i].name + ' out of uranium!');
            }
            
        }
    } 
}

function deductPlanetaryIron() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].iron += planets[i].ironGenerated * globalIronProductionFactor;
        if (planets[i].level >= 4) {
            var ironLevel = 'some';
            if (planets[i].iron <= 0) {ironLevel = 'none'}       
            planets[i].iron -= (planets[i].ironUsageFactor * planets[i].population * .1); //10% of population's worth of iron consumed
        }
        if (planets[i].iron < 0) { //no iron after deduction
            planets[i].population += (planets[i].iron);
            planets[i].iron = 0;
            if (ironLevel != 'none' && ironLevel == 'some') { //if there was 'some', but now there is none
                alert('planet ' + planets[i].name + ' out of iron!');
            }
            
        }
    } 
}

function calculateTotalPopulation() {
    var totalPopulation = 0
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        totalPopulation += planet.population;
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    }
    return totalPopulation
}

function calculateIncome() {
    calculateIndividualPlanetIncomes();
    var incomeTotal = 0
    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        incomeTotal += planet.income;
    }
    if (money < 0) {
        var x = money * .08; //interest on debt
        incomeTotal += x;
    }
    return incomeTotal
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    } 

function onCollectRent(i) {
    event.preventDefault();
    event.stopPropagation();
    money += planets[i].rent;
    drawMoney();
}

function calculateRent(i) {
    planets[i].rent = planets[i].population / 2
}

function onChangeTax(i) {
    event.preventDefault();
    event.stopPropagation();
    planets[i].tax = document.getElementById('taxForm' + i).value / 100;
    if (planets[i].tax < 0) {
        planets[i].tax = 0;
        document.getElementById('taxForm' + i).value = 0
    }
    if (planets[i].tax > 100) {
        planets[i].tax = 100;
        document.getElementById('taxForm' + i).value = 100
    }
    document.getElementById(i).innerText = formatMoney(planets[i].income);
    calculateIndividualPlanetIncomes();
    drawIncome(calculateIncome());
    console.log("ran change tax");
}