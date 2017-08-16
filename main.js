function onNewTurn() {
    money = money + income;
    TurnCount = TurnCount + 1;
    TradeBoolean = false
    document.getElementById('TurnCounter').innerHTML = "Turn: " + TurnCount;
    randomNumber = 50 + Math.round(Math.random() * 100);
    randomTradeRate = Number((5 + Math.random() * 10).toFixed(2));
    randomBankRate = Math.random();
    randomTradeString = randomTradeRate.toString() + (randomNumber*randomTradeRate*.01).toFixed(2).toString() + randomNumber.toString() + (Math.round(money)).toString();
        var t = document.createTextNode(randomTradeString);
    //document.body.appendChild(t);
    document.getElementById('Traderate').innerHTML = randomTradeRate.toString();
    document.getElementById('TradeIncomeGenerated').innerHTML = (randomNumber*randomTradeRate*.01).toFixed(2).toString();
    document.getElementById('amount').innerHTML = randomNumber.toString();
    document.getElementById('CashRow').innerHTML = (Math.round(money)).toString();

    for (var i = 0; i < planets.length; i++) {
        planets[i].population = planets[i].population * 1.05;  
    }
    redrawPlanets();

    if (populationmax > populationcurrent) {
        if (populationmax > populationcurrent * populationgrowthrate) {      
            populationcurrent = populationcurrent * populationgrowthrate;}
        else {
            populationcurrent = populationmax;
        }}
    else {
    }
    document.getElementById('populationcurrent').innerHTML = (Math.round(populationcurrent)).toString();
    
};

function onTradeBuy() {
    if (money > randomNumber) {
        if (!TradeBoolean) {
            money = money - randomNumber;
            income = income + randomNumber*randomTradeRate*.01
            document.getElementById('CashRow').innerHTML = Math.round(money);
            document.getElementById('IncomeRow').innerHTML = Math.round(income);
            TradeBoolean = true
        }
        else {alert("Trade has already been purchased")}
    } else {
        alert("Not Enough Funds");
            }
};

function onbuyfarm() {
    if (money > farmcost) {
            money = money - farmcost;
            document.getElementById('CashRow').innerHTML = Math.round(money);
            farmcost = farmcost * 1.1;
            document.getElementById('farmcost').innerHTML = farmcost;
            farmquantity = farmquantity + 1;
            document.getElementById('farmquantity').innerHTML = farmquantity;
            foodproduction = foodproduction + farmcapacity;
            document.getElementById('foodproduction').innerHTML = foodproduction;

    } else {
        alert("Not Enough Funds");
            }
};

function onSubmitPlanet() {
        var newdiv = document.createElement("DIV");
        newdiv.setAttribute("id", planetcount++); //returns the value, then increments
        var input = document.getElementById('stringinput').value;
        document.getElementById('stringinput').value="";
        newdiv.innerText = input
        document.getElementById("planetlist").appendChild(newdiv);

}


var planets = []
function redrawPlanets() {
    var planetList = document.getElementById('planetlist');
    planetList.innerHTML = '';
    var planetPopulation = document.getElementById('populationlist');
    planetPopulation.innerHTML = '';

    for (var i = 0; i < planets.length; i++) {
        var planet = planets[i];
        var planetNameDiv = document.createElement('div');
        planetNameDiv.innerText = planet.name;
        planetList.appendChild(planetNameDiv);
        var planetPopulationDiv = document.createElement('div');
        planetPopulationDiv.innerText = (planet.population).toFixed(0);
        planetPopulation.appendChild(planetPopulationDiv);
    }
};
function onSubmitPlanet() {
    var nameInput = document.getElementById('stringinput');
    var populationInput = document.getElementById('input');
    if (!nameInput.value || !populationInput.value) {
        return;
    }
    planets.push({
        name: nameInput.value,
        population: Number(populationInput.value),
        income: Number(populationInput.value * .1)
    });
    nameInput.value = '';
    populationInput.value = '';
    nameInput.focus();
    redrawPlanets();
}

/*function handleEnterKey(event) {
    var x = event.keyCode;
    if (x == 13) {
     var input = document.getElementById('input').value;
     document.getElementById('farmquantity').innerHTML = input;
    }
    
}*/

/*function myfunction() {
Var newparagraph = document.createElement(“P”); //creates a new paragraph
Var t = document.createTextNode(“Trade center at 10%”); //
Newparagraph.appendChild(t);
Document.getElementById(“myDIV”).appendChild(Newparagraph);
}*/


/*var person = {
    firstName : prompt("What is your name?")
};

document.getElementById("playerName").innerHTML =
person.firstName;
*/
var money = 100;
var steelfactorycost = 50;
var steelfactoryquantity = 0;
var housecost = 100;
var housequantity = 0;
var houseimprovementfx = 50;
var populationcurrent = 50;
var populationgrowthrate = 1.05;
var populationmax = 100;
var farmcost = 30;
var farmquantity = 1 // number of farms
var farmcapacity = 10; //how much one farm produces per turn
var foodproduction = 10; //player's current food production
var foodcurrent = 100;
var TradeBoolean = false;
var randomNumber;
var randomTradeRate;
var randomBankRate;
var income = 0;
var TurnCount = 1;
var name = "Bob";
document.write("Hello World!!!")
result = money * 2;
