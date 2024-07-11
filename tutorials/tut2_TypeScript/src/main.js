// Variables
var hello = 'wolrd';
var strHello = 'world';
//Specify type
var intNumber = 3;
// Functions
var getFullName = function (name, surname) {
    return name + ' ' + surname;
};
getFullName("Katlego", "Maredi");
// Objects
var userObj = {
    name: "Moster",
    age: 30
};
var userObj2 = {
    name: "Moster",
    age: 30
};
var userObj3 = {
    name: "Fez",
    age: 23,
    getMessage: function () {
        return "Hello " + name;
    },
};
console.log(userObj3.age, userObj3.name);
