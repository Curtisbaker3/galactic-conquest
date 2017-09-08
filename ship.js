function rollDice() {
    var rollDice = Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1);
    document.getElementById('rollDice').innerText = rollDice;
    shipLocation += rollDice;    
   /* if (shipLocation = 17 && rollDice < 5) {
        shipLocation = 17
    } else {
    shipLocation += rollDice;
    }    */
    
    if (shipLocation > 400 && shipLocation < 450) {
        console.log('ship location is greater than 400');
        shipLocation -= 400 - 66;        
    }   

    if (shipLocation > 301 && shipLocation < 350) {
        console.log('ship location is greater than 301');
        shipLocation -= 301 - 48;        
    }

    if (shipLocation > 201 && shipLocation < 250) {
        console.log('ship location is greater than 201');
        shipLocation -= 201 - 23;        
    }

    if (shipLocation > 104 && shipLocation < 150) {
        console.log('ship location is greater than 104');
        shipLocation -= 104 - 7;        
    }

    if (shipLocation > 79 && shipLocation < 100) {
        console.log('Ship just passed earth');
        var x = 50
        money += x;
        drawMoney();
        shipLocation -= 79;
        alert('Bonus $' + x + ' received for passing earth!');
    }    
    
    switch(planetLocations[shipLocation]) {
      case 'hole1': 
        shipLocation = 101
        break;
      case 'hole2': 
        shipLocation = 102
        break;
      case 'hole3': 
        shipLocation = 103
        break;
      case 'hole4': 
        shipLocation = 104
        break;
      case 'hole5': 
        shipLocation = 200
        break;
      case 'hole6': 
        shipLocation = 201
        break;
      case 'hole7': 
        shipLocation = 23
        break;
      case 'hole8': 
        shipLocation = 300
        break;
      case 'hole9': 
        shipLocation = 301
        break;
      case 'hole10': 
        shipLocation = 48
        break;
      case 'hole10': 
        shipLocation = 49
        break;
      case 'hole11': 
        shipLocation = 400
        break;
      case 'hole12': 
        shipLocation = 66
        break;
      case 'hole13': 
        shipLocation = 67
        break;
      case 'hole14': 
        shipLocation = 68
        break;
      case 'Earth':
        var x = 100
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS I':
        var x = 50
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS II':
        var x = 50;
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS III':
        var x = 50;
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS IV':
        var x = 50;
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS V':
        var x = 50;
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS VI':
        var x = 50;
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      case 'FS VII':
        var x = 50;
        money += x;
        drawMoney();
        alert('Bonus $' + x + ' received for landing on ' + planetLocations[shipLocation]);
        break;
      default:
        break;
    }
    document.getElementById('shipLocation').innerText = planetLocations[shipLocation];
    document.getElementById('planet-search').value = planetLocations[shipLocation].toLowerCase();
    handlePlanetSearch();  
}

function takePopulation() {
    var populationInput;
    var promptInput = prompt("Enter population to evacuate:", "20");
    var parsed = Number(promptInput);
    if (isNaN(parsed)) {
        return;
    } 
    if (promptInput == null || promptInput == "") {
        populationInput = 0;
    } else {
        populationInput = promptInput;
    }
    shipPopulation -= Number(populationInput);
    drawShipPopulation();
}