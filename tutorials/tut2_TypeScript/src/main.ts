// Variables
const hello = 'wolrd';
let strHello = 'world';

//Specify type
let intNumber: number = 3;

// Functions
const getFullName = (name: string, surname: string): string => {
    return name + ' ' + surname;
}

getFullName("Katlego", "Maredi");

// Objects
const userObj: { name: string, age: number } = {
    name: "Moster",
    age: 30
}

const userObj2: { name: string, age: number } = {
    name: "Moster",
    age: 30
}

// Interfaces
interface User {
    name: string
    age?: number
    //Use '?' to indicate that it is not required
    getMessage():string
}

const userObj3:User={
    name:"Fez",
    age:23,
    getMessage() {
        return "Hello "+name
    },
}

console.log(userObj3.age,userObj3.name);