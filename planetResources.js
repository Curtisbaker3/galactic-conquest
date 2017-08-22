
var tempTitle;
function findRandomResource(i) {
    tempTitle = planets[i].name
    var findPlanetName = _.find(planetResources, {title: tempTitle});
    if (!findPlanetName) {
        random = _.random(0, randomResource.length - 1);
        planets[i].resource = randomResource[random]
        console.log (planets[i].resource);   
        return;
    }
    console.log(findPlanetName)
    var setResource = findPlanetName.resource;
    console.log(setResource);
    planets[i].resource = setResource;
}

function createSpecialButtons(i) {
    switch(planets[i].resource) {
        case 'Gold': 
            planets[i].availableBuildItems.push({
            title: 'Gold Mine',
            description: 'Increases income by 3',
            cost: 50,
        });
        break;
        case 'Copper': 
            planets[i].availableBuildItems.push({
            title: 'Bank Center',
            description: 'Decreases income by 2',
            cost: -150,
            incomeCost: 2
        });
        break;
        case 'Water': 
            planets[i].availableBuildItems.push({
            title: 'Water Generator',
            description: 'Generates 200t water/yr. -1 inc.',
            cost: 20,
            incomeCost: 1,
            buildCount: 0,
            waterGenerated: 200
        });
        case 'Water': 
            planets[i].availableBuildItems.push({
            title: 'Fountains',
            description: 'Increases this planets population growth by 30%',
            cost: 20,
        });
        break;
        case 'Oil': 
            planets[i].availableBuildItems.push({
            title: 'Oil Extractor',
            description: 'Generates 50t oil/yr. -1 inc.',
            cost: 40,
            incomeCost: 1,
            buildCount: 0,
            oilGenerated: 50,
        });
        break;
        case 'Uranium': 
            planets[i].availableBuildItems.push({
            title: 'Uranium Mill',
            description: 'Generates 20t uranium/yr. -2 inc.',
            cost: 80,
            incomeCost: 2,
            buildCount: 0,
            uraniumGenerated: 20,
        });
        case 'Uranium': 
            planets[i].availableBuildItems.push({
            title: 'Nuclear Weapons',
            description: 'Increases safety of all planets by +1/year. Costs 3 income',
            cost: 40,
            incomeCost: 3,
            buildCount: 0,
            safetyGenerated: 1,
        });
        break;
        case 'Iron': 
            planets[i].availableBuildItems.push({
            title: 'Iron Centre',
            description: 'Increases efficiency of all planets by +1/year. Costs 3 income',
            cost: 40,
            incomeCost: 3,
            buildCount: 0,
            ironGenerated: 1,
        });
        break;
        default:
            console.log('no unique resources');
        break;
    }
}


const planetResources = [{
    title: 'Elara',
    resource: 'Water',
    cost: 170,
}, {
    title: 'Thebe',
    resource: 'Water',
    cost: 170,
}, {
    title: 'Ganymede',
    resource: 'Gold',
    cost: 360,
}, {
    title: 'Sinope',
    resource: 'Water',
    cost: 125,
}, {
    title: 'Europa',
    resource: 'Gold',
    cost: 330,
}, {
    title: 'Callisto',
    resource: 'Oil',
    cost: 350,
}, {
    title: 'IO',
    resource: 'Gold',
    cost: 335,
}, {
    title: 'Metis',
    resource: 'Copper',
    cost: 140,
}, {
    title: 'Adrastea',
    resource: 'Water',
    cost: 120,
}, {
    title: 'Amalthea',
    resource: 'Copper',
    cost: 200,
}, {
    title: 'Himalia',
    resource: 'Water',
    cost: 200,
}, {
    title: 'Mimas',
    resource: 'Copper',
    cost: 240,
}, {
    title: 'Dione',
    resource: 'Water',
    cost: 285,
}, {
    title: 'Hyperion',
    resource: 'Copper',
    cost: 220,
}, {// other examples: amber, emeralds, diamonds, azurite, zeolite, hematitie, zeolite etc
    title: 'Iapetus',
    resource: 'Gold',
    cost: 295,
}, {
    title: 'Tethys',
    resource: 'Oil',
    cost: 280,
}, {
    title: 'Janus',
    resource: 'Water',
    cost: 210,
}, {
    title: 'Enceladus',
    resource: 'Copper',
    cost: 250,
}, {
    title: 'Titan',
    resource: 'Gold',
    cost: 350,
}, {
    title: 'Phoebe',
    resource: 'Copper',
    cost: 200,
}, {
    title: 'Rhea',
    resource: 'Water',
    cost: 300,
}, {
    title: 'Umbriel',
    resource: 'Gold',
    cost: 290,
}, {
    title: 'Ariel',
    resource: 'Water',
    cost: 285,
}, {
    title: 'Miranda',
    resource: 'Water',
    cost: 250,
}, {
    title: 'Portia',
    resource: 'Copper',
    cost: 185,
}, {
    title: 'Oberon',
    resource: 'Gold',
    cost: 300,
}, {
    title: 'Titania',
    resource: 'Gold',
    cost: 300,
}, {
    title: 'Moon',
    resource: 'Gold',
    cost: 335,
}, {
    title: 'Mercury',
    resource: 'Water',
    cost: 450,
}, {
    title: 'Venus',
    resource: 'Gold',
    cost: 490,
}, {
    title: 'Pluto',
    resource: 'Gold',
    cost: 425,
}, {
    title: 'Charon',
    resource: 'Gold',
    cost: 300,
}, {
    title: 'Mars',
    resource: 'Water',
    cost: 465,
}, {
    title: 'Deimos',
    resource: 'Water',
    cost: 90,
}, {
    title: 'Phobos',
    resource: 'Water',
    cost: 125,
}, {
    title: 'Galatea',
    resource: 'Water',
    cost: 200,
}, {
    title: 'Triton',
    resource: 'Gold',
    cost: 320,
}, {
    title: 'Naiad',
    resource: 'Water',
    cost: 155,
}, {
    title: 'Despina',
    resource: 'Copper',
    cost: 195,
}, {
    title: 'Larissa',
    resource: 'Water',
    cost: 210,
}, {
    title: 'Nereid',
    resource: 'Copper',
    cost: 230,
}, {
    title: 'Proteus',
    resource: 'Water',
    cost: 240,
}, {
    title: 'Thalassa',
    resource: 'Copper',
    cost: 170,
}, {
    title: 'Saturn SD',
    resource: 'Uranium',
    cost: 300,
}, {
    title: 'Uranus SD',
    resource: 'Uranium',
    cost: 300,
}, {
    title: 'Neptune SD',
    resource: 'Uranium',
    cost: 325,
}, {
    title: 'Jupiter SD',
    resource: 'Uranium',
    cost: 275,
}, {
    title: 'Solar SD',
    resource: 'Uranium',
    cost: 350,
}, {
    title: 'Saturn RL',
    resource: 'Uranium',
    cost: 300,
}, {
    title: 'Uranus RL',
    resource: 'Uranium',
    cost: 300,
}, {
    title: 'Neptune RL',
    resource: 'Uranium',
    cost: 350,
}, {
    title: 'Jupiter RL',
    resource: 'Uranium',
    cost: 275,
}, {
    title: 'Earth RL',
    resource: 'Uranium',
    cost: 375,
}, {
    title: 'Venus RL',
    resource: 'Uranium',
    cost: 350,
}, {
    title: 'Earth',
    resource: 'Iron',
    cost: 800,
}, {
    title: 'Jupiter',
    resource: 'Iron',
    cost: 1200,
}, {
    title: 'Uranus',
    resource: 'Iron',
    cost: 900,
}, {
    title: 'Saturn',
    resource: 'Iron',
    cost: 1100,
}, {
    title: 'Neptune',
    resource: 'Iron',
    cost: 800,
}, {
    title: 'Sun',
    resource: 'Iron',
    cost: 2000,
}, ];



var randomResource = ['gold', 'iron', 'iridium', 'uranium', 'biomass'];
setTimeout(shuffleResources, 5); // waits 5 milliseconds
function shuffleResources() {
    /*for (var index = 0; index < planetResources.length; index++) {
        random = _.random(0, randomResource.length - 1);
        planetResources[index].resource = randomResource[random];
    }*/
}

drawUniqueUnknownPlanets();
function drawUniqueUnknownPlanets() {
    var unknownPlanetList = document.getElementById('uniquePlanetData');
    while (unknownPlanetList.firstChild) {
        unknownPlanetList.removeChild(unknownPlanetList.firstChild);
    }
    unknownPlanetList.innerHTML = planetResources.map((p, i) => renderUniquePlanet(i)).join('');
};


function synthesizeOtherPlanetData() {
    for (var index = 0; index < planetResources.length; index++) {
        planetResources[index].maxPopulation = (Math.pow(planetResources[index].cost, 1.5) / 50 ).toFixed(0);
        planetResources[index].upkeep = Number((Math.pow(planetResources[index].cost, 1.9) / 10000 ).toFixed(2));
    }
}

function renderUniquePlanet (i) {
    synthesizeOtherPlanetData();
    return `
        <div class="table-row-unique table-row" onclick="onSubmitPlanet(${i})">
            <div class="table-text one">${ planetResources[i].title }</div>
            <div class="table-text right one style="display:flex;">${ planetResources[i].resource }</div>           
            <div class="table-text right one style="display:flex;">${ planetResources[i].cost }</div>           
            <div class="table-text right one style="display:flex;">${ planetResources[i].maxPopulation }</div>           
            <div class="table-text right one style="display:flex;">${ formatMoney(planetResources[i].upkeep) }</div>           
        </div>
    `
};