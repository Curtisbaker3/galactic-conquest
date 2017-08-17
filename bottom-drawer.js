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