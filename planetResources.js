
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
    resource: 'Iron',
    cost: 360,
}, {
    title: 'Sinope',
    resource: 'Iron',
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
    resource: 'Oil',
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
    resource: 'Oil',
    cost: 200,
}, {
    title: 'Rhea',
    resource: 'Iron',
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
    resource: 'Water',
    cost: 490,
}, {
    title: 'Pluto',
    resource: 'Gold',
    cost: 425,
}, {
    title: 'Charon',
    resource: 'Oil',
    cost: 300,
}, {
    title: 'Mars',
    resource: 'Water',
    cost: 465,
}, {
    title: 'Deimos',
    resource: 'Oil',
    cost: 90,
}, {
    title: 'Phobos',
    resource: 'Water',
    cost: 125,
}, {
    title: 'Galatea',
    resource: 'Oil',
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
    resource: 'Iron',
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
    resource: 'Water',
    cost: 800,
}, {
    title: 'Jupiter',
    resource: 'Oil',
    cost: 1200,
}, {
    title: 'Uranus',
    resource: 'Water',
    cost: 900,
}, {
    title: 'Saturn',
    resource: 'Gold',
    cost: 1100,
}, {
    title: 'Neptune',
    resource: 'Water',
    cost: 800,
}, {
    title: 'Sun',
    resource: 'Iron',
    cost: 2000,
}, {
    title: 'Ceres',
    resource: 'Water',
    cost: 700,
}, {
    title: 'Eris',
    resource: 'Iron',
    cost: 450,
}, {
    title: 'Makemake',
    resource: 'Oil',
    cost: 550,
}, {
    title: 'Haumea',
    resource: 'Iron',
    cost: 400,
}, {
    title: 'Orcus',
    resource: 'Iron',
    cost: 350,
}, ];



var randomResource = ['gold', 'iron', 'iridium', 'uranium', 'biomass'];
setTimeout(shuffleResources, 5); // waits 5 milliseconds
function shuffleResources() {
    /*for (var index = 0; index < planetResources.length; index++) {
        random = _.random(0, randomResource.length - 1);
        planetResources[index].resource = randomResource[random];
    }*/
}

var searchstr = '';
planetResourcesInit();
function planetResourcesInit () {
    for (var i = 0; i < planetResources.length; i++) {
        planetResources[i].sold = false;
    }
}
drawUniqueUnknownPlanets();
function drawUniqueUnknownPlanets() {
    var unknownPlanetList = document.getElementById('uniquePlanetData');
    while (unknownPlanetList.firstChild) {
        unknownPlanetList.removeChild(unknownPlanetList.firstChild);
    }
    unknownPlanetList.innerHTML = planetResources.map((p, i) => renderUniquePlanet(i)).join('');
    for (i = 0; i < planetResources.length; i++) {
        if (planetResources[i].sold == true && document.getElementById("soldPlanets"+i) != null)
            {
            console.log('soldPlanets test'+i);
            document.getElementById("soldPlanets"+i).classList.add('soldPlanets');
            } 
    }
};


function synthesizeOtherPlanetData() {
    for (var index = 0; index < planetResources.length; index++) {
        planetResources[index].maxPopulation = (Math.pow(planetResources[index].cost, 1.5) / 50 ).toFixed(0);
        planetResources[index].upkeep = Number((Math.pow(planetResources[index].cost, 2.2) / 40000 ).toFixed(2));
    }
}

function handlePlanetSearch() {
    var input = document.getElementById('planet-search');
    searchstr = input.value;
    drawUniqueUnknownPlanets();
};

function erasePlanetSearch() {
    if (document.getElementById('planet-search').value != '') {
    document.getElementById('planet-search').value = ''
    handlePlanetSearch();
    }
}

function renderUniquePlanet (i) {
    synthesizeOtherPlanetData();
    let title = planetResources[i].title.toLowerCase();
    let search = searchstr.toLowerCase();
    if (search) {
        console.log(search);
        console.log(title);
        if (title.indexOf(search) === -1) {
            return '';
        }
    }
    return `
        <div id="soldPlanets${i}" class="table-row-unique table-row" onclick="onSubmitPlanet(${i})">
            <div class="table-text one">${ planetResources[i].title}</div>
            <div class="table-text right one style="display:flex;">${ planetResources[i].resource }</div>           
            <div class="table-text right one style="display:flex;">${ planetResources[i].cost }</div>           
            <div class="table-text right one style="display:flex;">${ planetResources[i].maxPopulation }</div>           
            <div class="table-text right one style="display:flex;">${ formatMoney(planetResources[i].upkeep) }</div>           
        </div>
    `
};