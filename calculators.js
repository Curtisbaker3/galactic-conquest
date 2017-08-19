function calculateIndividualPlanetIncomes() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].income = planets[i].population * .1 - (5 * planets[i].randomIncomeModifier + 1) - planets[i].expenses + planets[i].incomeBonuses;
    }
}

function calculatePlanetaryWater() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].water += planets[i].waterGenerated
        if (planets[i].level >= 2) {
            var waterLevel = 'some';
            if (planets[i].water <= 0) {waterLevel = 'none'}       
            planets[i].water = planets[i].water - (planets[i].waterUsageFactor * planets[i].population);
        }
        if (planets[i].water < 0) {
            planets[i].population += (planets[i].water * .1);
            planets[i].water = 0
            if (waterLevel != 'none' && waterLevel == 'some') {
                alert('planet ' + planets[i].name + ' out of water!');
            }
            
        }
    } 
}

function calculatePlanetaryOil() {
    for (var i = 0; i < planets.length; i++) {
        planets[i].oil += planets[i].oilGenerated
        if (planets[i].level >= 3) {
            var oilLevel = 'some';
            if (planets[i].oil <= 0) {oilLevel = 'none'}       
            planets[i].oil = planets[i].oil - (planets[i].oilUsageFactor * planets[i].population);
        }
        if (planets[i].oil < 0) {
            planets[i].population += (planets[i].oil * .1);
            planets[i].oil = 0
            if (oilLevel != 'none' && oilLevel == 'some') {
                alert('planet ' + planets[i].name + ' out of oil!');
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
    if (money < 0) {
        var x = money * .07; //interest on debt
        incomeTotal += x;
    }
        //incomeTotal -= planet.nextPlanetRequirements[planet.level].incomeCost;
    }
    return incomeTotal
}