"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
const utils_1 = require("./utils");
(0, utils_1.greet)();
class ShoppingCart {
    constructor(items) {
        this.items = items;
        this.items = items;
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i.id !== item.id);
    }
    getItems() {
        return this.items;
    }
}
exports.ShoppingCart = ShoppingCart;
const cart = new ShoppingCart([]);
const product1 = {
    id: 'id-1',
    name: 'nike',
    price: 200000,
};
const product2 = {
    id: 'id-2',
    name: 'adidas',
    price: 200000,
};
cart.addItem(product1);
cart.addItem(product2);
console.log(cart.getItems());
cart.removeItem(product1);
console.log(cart.getItems());
const stock = {
    c001: 10,
    c002: 20,
    c003: 30,
    c004: 40
};
// Test 2
let username = 'Ethan';
console.log(username);
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50
};
const student = {
    name: 'Ethan',
    GPA: 3.5,
    classes: [100, 200]
};
console.log(student.test);
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
// Test 6
let someValue = 'Hello, TypeScript';
let strLength = someValue.length;
