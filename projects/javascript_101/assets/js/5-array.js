var friend1 = "Adam";
var friend2 = "Flimp-Flomp";
var friend3 = "PV";
var friend4 = "Björk";

var friends = ["Adam", "Flim-Flomp", "PV", "Björk"]; //strings, numbers, booleans, objects

function newName() {
    friends[2] = "Göran";
    friends[3] = false;
}

newName();

console.log(friends[1] + " </3 " + friends[3]);


var colors = [];
var colors = new Array();
var randomArray = ["String", 31, true, false];
console.log(randomArray.length);

/* Arrays - built i nmethods*/ 

//push() - add an item at the end of an array
colors = ["red", "green", "blue"];
console.log(colors);
colors.push("purple");

//pop() - remove last item in an array
colors.pop(colors[0]);
console.log(colors);

//unshift() - add an item at the begining of an array
colors.unshift("Yellow");
console.log(colors);

//shift() - remove item at begining of an array
colors.shift();
console.log(colors);

// indexOf() -
console.log(colors.indexOf("green")); // index of an item in the array
console.log(colors.indexOf("brown")); // -1 if the value is not found

// slice - copy parts of an array
var fruits = ["banana", "orange", "lemon", "mango", "pear"];
// copy 2nd and 3rd fruit
var citrus = fruits.slice(1, 3)
console.log(citrus);

var copyFruits = fruits.slice(fruits);
console.log(copyFruits);

// Arrays - iterations- upprepning
//            0         1        2        3         4        5         6
var cars = ["Audi" , "Volvo", "Ford", "Ferrari", "Landa", "Lambo", "Citron"]
for (var i = 0; i < cars.length; i++){
    console.log(cars[i]);
}

// Arrays - iteration - forEach

var countries = ["Sweden", "Norway", "Finland", "Denmark", "Island"];
countries.forEach(function(country){
    console.log(country);
});

function countryList(country){
    console.log("**********");
    console.log(country);
    console.log("**********");
    console.log("");
}

countries.forEach(countryList);

// Array skriftlig övning
/*
var notReversed = [1, 2, 3, 4, 5];

console.log(notReversed);

notReversed.reverse();

console.log(notReversed);*/


function printReverse(myArr){
    for(var i = myArr.length -1; i >= 0; i--){
        console.log(myArr[i]);;
    }
};

printReverse([1,2,3,4,5])


function isIdentical(array) {
    var first = array[0];
    for(var i = 1; i < array.length; i++) {
        if(array[i] !== first) {
            return false;
        }
    }
    return true;
}

console.log(isIdentical([1,1,1,1,1]));
console.log(isIdentical([1,1,1,1,2]));

function sumArray(array){
    var summary = 0;
    for(var i = 0; i < array.length; i++) {
        summary = summary += array[i];
    }
    return summary;
}
console.log(sumArray([1,5,123,4,2,1]));

function max(array){
    var max = 0;
    for(var i = 0; i < array.length; i++) {
        if(max < array[i])
        {
            max = array[i];
        }
    }
    return max;
}
console.log(max([1,5,123,4,2,1]));