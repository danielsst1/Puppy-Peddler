var currentMoney = 2000;
var currentDogs = 0;

var totalBuys = 0;
var totalSells = 0;
var totalValue = 0;

//day that is displayed on screen: starts at 1
var displayDay = 1;
//day that is used in stock calculations: starts at 0
var stockDay = 0;
//last day listed in stocks
var lastStockDay = 29;

//opinions for next day
var negBroadcast = new Array(6);
negBroadcast[0] = "Public Opinion :  shed too much";
negBroadcast[1] = "Public Opinion :  eat too many snacks";
negBroadcast[2] = "News Alert     :  steal sandwichs from local deli";
negBroadcast[3] = "News Alert     :  desecrate local fire hydrants";
negBroadcast[4] = "Research Report:  are 10% more likely to eat homework than others";
negBroadcast[5] = "Research Report:  only love you when fed";

var posBroadcast = new Array(6);
posBroadcast[0] = "Public Opinion :  are cuter than ever";
posBroadcast[1] = "Public Opinion :  are great walking buddies";
posBroadcast[2] = "News Alert     :  save a drowning child";
posBroadcast[3] = "News Alert     :  sniff out burried treasure";
posBroadcast[4] = "Research Report:  proven to make people happier";
posBroadcast[5] = "Research Report:  can be potty trained";

//position that dog name should be at
var dogPos = 17;

//array of dog stock values
let dogValues = new Array(4);

//GME
//var dog1 = [17.25, 17.37, 18.36, 18.08, 17.69, 19.94, 19.95, 31.4, 39.91, 35.5, 39.36, 39.12, 43.03, 65.01, 76.79, 147.98, 347.51, 193.6, 325.0, 225.0, 90.0, 92.41, 53.5, 63.77, 60.0, 50.31, 51.2, 51.1, 52.4, 49.51];
dogValues[0] = [17.25, 17.37, 18.36, 18.08, 17.69, 19.94, 19.95, 31.4, 39.91, 35.5, 39.36, 39.12, 43.03, 65.01, 76.79, 147.98, 347.51, 193.6, 325.0, 225.0, 90.0, 92.41, 53.5, 63.77, 60.0, 50.31, 51.2, 51.1, 52.4, 49.51];
var numDog1 = 0;

//AMD
//var dog2 = [92.3, 92.77, 90.33, 95.16, 94.58, 97.25, 95.36, 91.78, 90.79, 88.21, 89.45, 88.75, 91.53, 92.79, 94.13, 94.71, 88.84, 87.52, 85.64, 87.66, 88.86, 87.89, 87.84, 87.9, 91.47, 90.91, 92.35, 92.66, 93.77, 91.46];
dogValues[1] = [92.3, 92.77, 90.33, 95.16, 94.58, 97.25, 95.36, 91.78, 90.79, 88.21, 89.45, 88.75, 91.53, 92.79, 94.13, 94.71, 88.84, 87.52, 85.64, 87.66, 88.86, 87.89, 87.84, 87.9, 91.47, 90.91, 92.35, 92.66, 93.77, 91.46];
var numDog2 = 0;

//FB
//var dog3 = [268.94, 270.97, 263.31, 268.74, 267.57, 256.84, 251.09, 251.64, 245.64, 251.36, 261.1, 267.48, 272.87, 274.5, 278.01, 282.05, 272.14, 265.0, 258.33, 262.01, 267.08, 266.65, 266.49, 268.1, 266.58, 269.45, 271.87, 270.39, 270.5, 273.97];
dogValues[2] = [268.94, 270.97, 263.31, 268.74, 267.57, 256.84, 251.09, 251.64, 245.64, 251.36, 261.1, 267.48, 272.87, 274.5, 278.01, 282.05, 272.14, 265.0, 258.33, 262.01, 267.08, 266.65, 266.49, 268.1, 266.58, 269.45, 271.87, 270.39, 270.5, 273.97];
var numDog3 = 0;

//GOOG
//var dog4 = [1728.24, 1740.92, 1735.29, 1787.25, 1807.21, 1766.72, 1746.55, 1754.4, 1740.18, 1736.19, 1790.86, 1886.9, 1891.25, 1901.05, 1899.4, 1917.24, 1830.79, 1863.11, 1835.74, 1901.35, 1927.51, 2070.07, 2062.37, 2098.0, 2092.91, 2083.51, 2095.38, 2095.89, 2104.11, 2121.9];
dogValues[3] = [1728.24, 1740.92, 1735.29, 1787.25, 1807.21, 1766.72, 1746.55, 1754.4, 1740.18, 1736.19, 1790.86, 1886.9, 1891.25, 1901.05, 1899.4, 1917.24, 1830.79, 1863.11, 1835.74, 1901.35, 1927.51, 2070.07, 2062.37, 2098.0, 2092.91, 2083.51, 2095.38, 2095.89, 2104.11, 2121.9];
var numDog4 = 0;

//array of dog breeds
let dogTypes = new Array(4);
dogTypes[0] = "Pug";
dogTypes[1] = "Pomeranian";
dogTypes[2] = "Dachshund";
dogTypes[3] = "Corgi";

let stage = null;
//console.log(dog1);

const buyButtons = [
    document.querySelector(`.dog-container--${0} .dog-button--buy`),
    document.querySelector(`.dog-container--${1} .dog-button--buy`),
    document.querySelector(`.dog-container--${2} .dog-button--buy`),
    document.querySelector(`.dog-container--${3} .dog-button--buy`)
];

const sellButtons = [
    document.querySelector(`.dog-container--${0} .dog-button--sell`),
    document.querySelector(`.dog-container--${1} .dog-button--sell`),
    document.querySelector(`.dog-container--${2} .dog-button--sell`),
    document.querySelector(`.dog-container--${3} .dog-button--sell`)
];

class Dog {
    constructor(id, name, values) {
        this.id = id;
        this.name = name;
        this.values = values;
        this.quantity = 0;
        this.sprites = [];
    }
    //return name of the breed
    getName() {
        return this.name;
    }

    //return the cost of dog on current day
    dailyValue(numDay) {
        return this.values[numDay];
    }
    //return the current number of dogs owned
    getQuantity() {
        return this.quantity;
    }
    //increase quantity by given number and return cost
    //does not increase quantity and returns cost of 0 if cant afford
    buy(quantity, numDay, currentMoney) {
        var value = quantity * this.dailyValue(numDay);
        if (value > currentMoney) {
            return 0;
        }
        this.quantity += quantity;
        // update stage
        const sprite = stage.createSprite(this.id);
        this.sprites.push(sprite);

        //display stuff on change
        currentDogs += quantity;
        display();
        return value;
    }
    //decrease quantity by given number and return value that should be gained
    //does not decrease quantity and returns 0 if cant afford
    sell(quantity, numDay) {
        if (quantity > this.quantity) {
            return 0
        }
        this.quantity -= quantity;
        var value = quantity * this.dailyValue(numDay);
        // update stage
        const sprite = this.sprites.pop();
        stage.removeSprite(sprite);

        //display stuff on change
        currentDogs -= quantity;
        display();
        return value;
    }
}


//initialize array and fill with dogs
let dogs = new Array(4);

for (i = 0; i < dogs.length; i++) {
    dogs[i] = new Dog(i, dogTypes[i], dogValues[i]);
}

let pup1 = new Dog(i, "pup1", dogValues[1]);
console.log("quantity: " + pup1.getQuantity());
console.log("cost on day 0: " + pup1.dailyValue(0));
console.log("Cost of buy 3 and buy 3: " + pup1.buy(3, 0, 90));
console.log("quantity: " + pup1.getQuantity());

console.log("cost on day 1: " + pup1.dailyValue(1));
console.log("Cost of sell 2 and sell 2: " + pup1.sell(2, 1));
console.log("quantity: " + pup1.getQuantity());

//get the news given day to be forecasted and dog index
function getNews(day, dogIndex) {
	var message;
	if(dogs[dogIndex].dailyValue(day) >= dogs[dogIndex].dailyValue(day - 1)) {
		console.log("pos: " + dogs[dogIndex].dailyValue(day) + ", " + dogs[dogIndex].dailyValue(day - 1));
		message = posBroadcast[Math.floor(Math.random() * posBroadcast.length)];
	}
	else {
		console.log("neg: " + dogs[dogIndex].dailyValue(day) + ", " + dogs[dogIndex].dailyValue(day - 1));
		message = negBroadcast[Math.floor(Math.random() * negBroadcast.length)];
		
	}
	message = `${ message.slice(0, dogPos)}<div class="dog-icon dog-icon--${dogIndex}"></div>${message.slice(dogPos)}`;
	return message;
}

//returns news projecting random dog value for given day
function displayNews(day) {
	if (day < 1 || day > lastStockDay) {
		return;
	}
	var dog1 = Math.floor(Math.random() * dogs.length);
	var dog2 = dog1;
	while (dog1 == dog2) {
		dog2 = Math.floor(Math.random() * dogs.length);
	}

	//get messages for both dogs
	var forecast1 = getNews(day, dog1); 
	var forecast2 = getNews(day, dog2);

	//display messages
	document.getElementById("forecast1"). innerHTML = forecast1;
	document.getElementById("forecast2"). innerHTML = forecast2;
}

//iterates day by 1
//if day has gone past lastStockDay then set to last stock day
function nextDay() {
    stockDay += 1;
    if (stockDay > lastStockDay) {
        stockDay = lastStockDay;
        document.getElementById("nextDayButton").disabled = true;
    }
    displayDay = stockDay + 1;
    updateCharts(displayDay);
    displayNews(displayDay);
    display()
    console.log("current day: " + displayDay);
}

//function to display on page
function display() {
    document.getElementById("dogs"). innerHTML = currentDogs;
    document.getElementById("money"). innerHTML = currentMoney.toFixed(2);
    document.getElementById("day"). innerHTML = displayDay;

    // displayNews(displayDay);

    //display dogs
    //document.getElementById("dog1"). innerHTML = dogs[1].dailyValue(stockDay);
    
    //var dogName = "dogName";
    var dogVal = "dogValue";
    var dogQ = "dogQuantity";
    for (var i = 0; i < dogs.length; i++) {
        //ar name = dogName + i.toString();
        var val = dogVal + i.toString();
        var quant = dogQ + i.toString();
        //document.getElementById(name). innerHTML = dogs[i].getName();
        // buttons
        const value = document.getElementById(val);
        value.innerHTML = dogs[i].dailyValue(stockDay).toFixed(2);
        const sign = document.getElementById(`dogValueSign${i}`);
        const quantity = document.getElementById(quant)
        quantity. innerText = dogs[i].getQuantity();
        buyButtons[i].disabled = dogs[i].dailyValue(stockDay) > currentMoney;
        sellButtons[i].disabled = dogs[i].quantity <= 0;
        // price
        if (stockDay >= 1) {
            if (dogs[i].dailyValue(stockDay) >= dogs[i].dailyValue(stockDay - 1)) {
                sign.classList.add("green");
                sign.classList.remove("red");
            } else {
                sign.classList.add("red");
                sign.classList.remove("green");
            }
        }
    }
}

//function to buy stuff given index
function buy(index) {
    var id = "input" + index.toString();
    var quantity = 1;//parseInt(document.getElementById(id).value);
    var cost = dogs[index].buy(quantity, stockDay, currentMoney);
    currentMoney -= cost;
    //clear input
    //document.getElementById(id).value = '';

    display();
}

//function to sell stuff given index
function sell(index) {
    var id = "input" + index.toString();
    var quantity = 1;//parseInt(document.getElementById(id).value);
    var cost = dogs[index].sell(quantity, stockDay);
    currentMoney += cost;
    //clear input
    //document.getElementById(id).value = '';

    display();
}

//chart
const charts = [
    d3.select(".dog-chart--0"),
    d3.select(".dog-chart--1"),
    d3.select(".dog-chart--2"),
    d3.select(".dog-chart--3"),
];
console.log(charts);
const xscale = d3.scaleLinear()
    .domain([0, 29]) // input
    .range([0, 156]); // output

function updateCharts(day) {
    for (let i = 0; i < 4; i++) {
        const yscale = d3.scaleLinear()
            .domain([
                Math.min.apply(null, dogValues[i]) - 100,
                Math.max.apply(null, dogValues[i]) + 100]) // input 
            .range([30, 0]); // output
        const valueline = d3.line()
            .x((d, id) => xscale(id))
            .y(d => yscale(d));
        charts[i].select("path.line").remove();
        charts[i].append("path")
            .data([dogValues[i].slice(0, day)])
            .attr("class", "line")
            .attr("d", valueline);
    }
}

window.onload = () => {
    stage = new Stage();
    displayNews(1);
    display();
    updateCharts(1);
}
//var intervalID = window.setInterval(display(), 500);