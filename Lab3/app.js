const people = require("./people");
const stocks = require("./stocks");

async function main() {
    try {
        const peopleData = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
    try {
        const peopleData = await people.getPersonById();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.sameStreet("Sutherland", "Point");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
    try {
        const peopleData = await people.sameStreet();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.manipulateSsn();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.manipulateSsn("101");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await people.sameBirthday("6", "9");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
    try {
        const peopleData = await people.sameBirthday("     ", "25");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await stocks.listShareholders();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
    try {
        const peopleData = await stocks.listShareholders("7283e5d6-7481-41cb-83b3-5a4a2da34717");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await stocks.topShareholder("Nuveen Floating Rate Income Fund");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
    try {
        const peopleData = await stocks.topShareholder();
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await stocks.listStocks("Grenville", "Pawelke");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await stocks.listStocks("Harshal", "Vaidya");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }

    try {
        const peopleData = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
    try {
        const peopleData = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log(peopleData);
    } catch(e) {
        console.log(e);
    }
}

main();