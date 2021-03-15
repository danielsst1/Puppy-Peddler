var currentMoney = 0;
var currentDogs = 0;

//day that is displayed on screen: starts at 1
var displayDay = 1;
//day that is used in stock calculations: starts at 0
var stockDay = 0;
//last day listed in stocks
var lastStockDay = 29;

//GME
var dog1 = [17.25, 17.37, 18.36, 18.08, 17.69, 19.94, 19.95, 31.4, 39.91, 35.5, 39.36, 39.12, 43.03, 65.01, 76.79, 147.98, 347.51, 193.6, 325.0, 225.0, 90.0, 92.41, 53.5, 63.77, 60.0, 50.31, 51.2, 51.1, 52.4, 49.51];
var numDog1 = 0;
//AMD
var dog2 = [92.3, 92.77, 90.33, 95.16, 94.58, 97.25, 95.36, 91.78, 90.79, 88.21, 89.45, 88.75, 91.53, 92.79, 94.13, 94.71, 88.84, 87.52, 85.64, 87.66, 88.86, 87.89, 87.84, 87.9, 91.47, 90.91, 92.35, 92.66, 93.77, 91.46];
var numDog2 = 0;
//FB
var dog3 = [268.94, 270.97, 263.31, 268.74, 267.57, 256.84, 251.09, 251.64, 245.64, 251.36, 261.1, 267.48, 272.87, 274.5, 278.01, 282.05, 272.14, 265.0, 258.33, 262.01, 267.08, 266.65, 266.49, 268.1, 266.58, 269.45, 271.87, 270.39, 270.5, 273.97];
var numDog3 = 0;
//GOOG
var dog4 = [1728.24, 1740.92, 1735.29, 1787.25, 1807.21, 1766.72, 1746.55, 1754.4, 1740.18, 1736.19, 1790.86, 1886.9, 1891.25, 1901.05, 1899.4, 1917.24, 1830.79, 1863.11, 1835.74, 1901.35, 1927.51, 2070.07, 2062.37, 2098.0, 2092.91, 2083.51, 2095.38, 2095.89, 2104.11, 2121.9];
var numDog4 = 0;
//console.log(dog1);

class Dog {
    constructor(name, values) {
        this.name = name;
        this.values = values;
        this.quantity = 0;
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

        //display stuff on change
        currentDogs += this.quantity;
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

        //display stuff on change
        currentDogs -= this.quantity;
        display();
        return value;
    }
}

//iterates day by 1
//if day has gone past lastStockDay then set to last stock day
function nextDay() {
    stockDay += 1;
    if (stockDay > lastStockDay) {
        stockDay = lastStockDay;
    }
    
    displayDay = stockDay + 1;
    display()
    console.log("current day: " + displayDay);
}

//functions to display on page
function display() {
    document.getElementById("dogs"). innerHTML = currentDogs;
    document.getElementById("money"). innerHTML = currentMoney;
    document.getElementById("day"). innerHTML = displayDay;
    console.log("display");
}

display();
//var intervalID = window.setInterval(display(), 500);


let pup1 = new Dog("pup1", dog1);
console.log("quantity: " + pup1.getQuantity());
console.log("cost on day 0: " + pup1.dailyValue(0));
console.log("Cost of buy 3 and buy 3: " + pup1.buy(3, 0, 90));
console.log("quantity: " + pup1.getQuantity());

console.log("cost on day 1: " + pup1.dailyValue(1));
console.log("Cost of sell 2 and sell 2: " + pup1.sell(2, 1));
console.log("quantity: " + pup1.getQuantity());