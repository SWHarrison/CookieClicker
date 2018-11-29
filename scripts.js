var cookies;
var cookiesBG;

function setup(){

    createCanvas(1200,600);
    cookies = new cookieMove(100);
    cookiesBG = new cookieBackground(1000);
    for(var i=0;i<100;i++){

        cookies[i]=new cookie(Math.random()*1200,Math.random()+3,Math.floor(Math.random() * 3)+3)
    }
    for(var i=0;i<1000;i++){

        cookiesBG[i]=new cookieBackground(Math.random()*1200,Math.random()*600/(1000-i),Math.random()+5,Math.floor(Math.random() * 3)+3)
    }
}

function draw(){

    background(240);
}

function drawCookies(){

    if(cookieCount>500){
        setBackgroundCookies();
    } else {
        setBackgroundOff();
    }
    for(var i;i<100;i++){
        if(Math.sqrt(grandmaLevel+facilityLevel)>=i){

            cookies[i].isMoving=true;
            cookies[i].isVisible=true;
        } else {
            cookies[i].isMoving=false;
            cookies[i].isVisible=false;
        }
    }
}

function setBackgroundOff(){

    for(var i=0;i<1000;i++){
        cookiesBG[i].isVisible=false;
    }
}

function setBackgroundCookies(){

    for(var i=0;i<Math.sqrt(cookieCount);i++){
        cookiesBG[i].isVisible=true;
    }
}

class cookieMove{
    constructor(x,size,numChoc){

        this.x=x;
        this.size=size;
        this.numChoc=numChoc;
        this.isVisible=false;
        this.isMoving=false;
    }
}

class cookieBackground{
    constructor(x,y,size,numChoc){

        this.x=x;
        this.y=y;
        this.size=size;
        this.numChoc=numChoc;
    }
}
/********************************

        Variables

********************************/

let cookieCount = 0;
let clickPower = 1;

let cookieCounter = document.getElementById('cookie-counter');
let cookieClicker = document.getElementById('cookie-clicker');

let clickPowerPriceAmount = 10;
let clickPowerLevelNumber = 1;


let buyClickPower = document.getElementById('buy-click-power'); // button
let clickPowerPrice = document.getElementById('click-power-price'); //price and button display
let clickPowerLevel = document.getElementById('click-power-level'); //display level
let clickPowerMultiple = document.getElementById('click-power-multiple'); //cookies per click

/********************************

        Cookie Clicker

********************************/

cookieClicker.addEventListener("click", function() {
  cookieCount = cookieCount + clickPower;
  refreshCookieCount()
})

let refreshCookieCount = function() {
  cookieCounter.innerHTML = cookieCount;
}

/********************************

        Click Power

********************************/

let refreshPowerClick = function() {
  clickPowerLevel.innerHTML = clickPowerLevelNumber;
  clickPowerPrice.innerHTML = clickPowerPriceAmount;
  clickPowerMultiple.innerHTML = clickPower;
}

//Buy click power
buyClickPower.addEventListener("click", function() {
  if (cookieCount >= clickPowerPriceAmount) {
    console.log("Item succesfully Bought");
    cookieCount -= clickPowerPriceAmount;
    refreshCookieCount()

    clickPowerLevelNumber += 1;
    clickPower += 1;
    clickPowerPriceAmount = Math.floor(clickPowerPriceAmount * 1.33);
    //clickPowerPriceAmount = clickPowerPrice;

    refreshPowerClick();

  } else {
    console.log("You don't have enough cookies!");
  }
})
 /********************************

            Grandmas

********************************/

//set default values
let grandmaPower = 0;
let grandmaPriceAmount = 50;
let grandmaLevelNumber = 0;

//declare DOM variables
let buyGrandma = document.getElementById('buy-grandma'); //button
let grandmaPrice = document.getElementById('grandma-price'); //price & price on button
let grandmaLevel = document.getElementById('grandma-level'); //grandma level & display
let grandmaMultiple = document.getElementById('grandma-multiple'); //Cookies per second

let refreshGrandma = function() {
  grandmaLevel.innerHTML = grandmaLevelNumber;
  grandmaPrice.innerHTML = grandmaPriceAmount;
  grandmaMultiple.innerHTML = grandmaPower;
}

buyGrandma.addEventListener("click", function() {
    // Make sure we have enough cookies and subtract our cookies from the price.
    if (cookieCount >= grandmaPriceAmount) {
    // Subtract cookies from the price of the item.
        cookieCount -= grandmaPriceAmount;
        refreshCookieCount()
        //upgrade power level
        grandmaLevelNumber += 1;
        //update price
        grandmaPriceAmount = Math.floor(grandmaPriceAmount * 1.33);
        //update grandma power so they start producing cookies
        grandmaPower += 1;

        //refresh shop item
        refreshGrandma();
    }
})

/********************************

          Facilities

********************************/

//set default variables
let facilityPower = 0;
let facilityPriceAmount = 1000;
let facilityLevelNumber = 0;

//declare DOM variables
let buyFacility = document.getElementById('buy-facility');
let facilityPrice = document.getElementById('facility-price');
let facilityLevel = document.getElementById('facility-level');
let facilityMultiple = document.getElementById('facility-multiple');

let refreshFacility = function() {
  facilityLevel.innerHTML = facilityLevelNumber;
  facilityPrice.innerHTML = facilityPriceAmount;
  facilityMultiple.innerHTML = facilityPower;
}

buyFacility.addEventListener("click", function() {
    // Make sure we have enough cookies and subtract our cookies from the price.
    if (cookieCount >= facilityPriceAmount) {
    // Subtract cookies from the price of the item.
        cookieCount -= facilityPriceAmount;
        refreshCookieCount()
        //upgrade power level
        facilityLevelNumber += 1;
        //update price
        facilityPriceAmount = Math.floor(facilityPriceAmount * 1.33);
        //update grandma power so they start producing cookies
        facilityPower += 20;

        //refresh shop item
        refreshFacility();
    }
})

let autoProductionStart = function() {
    let productionInt = window.setInterval(function(){
        cookieCount += grandmaPower;
        cookieCount += facilityPower;
        refreshCookieCount();
    }, 1000);
}

autoProductionStart();
