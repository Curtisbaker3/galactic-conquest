
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
            description: 'Increases income by 5',
            cost: 60,
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
            description: 'Generates 100t water/yr. -1 inc.',
            cost: 40,
            incomeCost: 1,
            buildCount: 0,
            waterGenerated: 100
        });
        break;
        case 'Oil': 
            planets[i].availableBuildItems.push({
            title: 'Oil Extractor',
            description: 'Generates 50t oil/yr. -3 inc.',
            cost: 60,
            incomeCost: 3,
            buildCount: 0,
            oilGenerated: 50,
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
}, {
    title: 'Thebe',
    resource: 'Water',
}, {
    title: 'Ganymede',
    resource: 'Gold',
}, {
    title: 'Sinope',
    resource: 'Water',
}, {
    title: 'Europa',
    resource: 'Gold',
}, {
    title: 'Callisto',
    resource: 'Oil',
}, {
    title: 'IO',
    resource: 'Gold',
}, {
    title: 'Metis',
    resource: 'Copper',
}, {
    title: 'Adrastea',
    resource: 'Water',
}, {
    title: 'Amalthea',
    resource: 'Copper',
}, {
    title: 'Himalia',
    resource: 'Water',
}, {
    title: 'Mimas',
    resource: 'Copper',
}, {
    title: 'Dione',
    resource: 'Water',
}, {
    title: 'Hyperion',
    resource: 'Copper',
}, {// other examples: amber, emeralds, diamonds, azurite, zeolite, hematitie, zeolite etc
    title: 'Iapetus',
    resource: 'Gold',
}, {
    title: 'Tethys',
    resource: 'Oil',
}, {
    title: 'Janus',
    resource: 'Water',
}, {
    title: 'Enceladus',
    resource: 'Copper',
}, {
    title: 'Titan',
    resource: 'Gold',
}, {
    title: 'Phoebe',
    resource: 'Copper',
}, {
    title: 'Rhea',
    resource: 'Water',
}, {
    title: 'Umbriel',
    resource: 'Gold',
}, {
    title: 'Ariel',
    resource: 'Water',
}, {
    title: 'Miranda',
    resource: 'Gold',
}, {
    title: 'Portia',
    resource: 'Copper',
}, {
    title: 'Oberon',
    resource: 'Gold',
}, {
    title: 'Titania',
    resource: 'Gold',
}, {
    title: 'Moon',
    resource: 'Gold',
}, {
    title: 'Mercury',
    resource: 'Water',
}, {
    title: 'Venus',
    resource: 'Gold',
}, {
    title: 'Pluto',
    resource: 'Gold',
}, {
    title: 'Charon',
    resource: 'Gold',
}, {
    title: 'Mars',
    resource: 'Water',
}, {
    title: 'Deimos',
    resource: 'Water',
}, {
    title: 'Phobos',
    resource: 'Water',
}, {
    title: 'Galatea',
    resource: 'Water',
}, {
    title: 'Triton',
    resource: 'Gold',
}, {
    title: 'Naiad',
    resource: 'Water',
}, {
    title: 'Despina',
    resource: 'Copper',
}, {
    title: 'Larissa',
    resource: 'Water',
}, {
    title: 'Nereid',
    resource: 'Copper',
}, {
    title: 'Proteus',
    resource: 'Water',
}, {
    title: 'Thalassa',
    resource: 'Copper',
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

function renderUniquePlanet (i) {
    return `
        <div class="table-row-unique table-row" onclick="onSubmitPlanet(${i})">
            <div class="table-text one">${ planetResources[i].title }</div>
            <div class="table-text right one style="display:flex;">${ planetResources[i].resource }</div>           
        </div>
    `
};