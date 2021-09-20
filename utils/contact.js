const fs = require("fs");

const dirPath = "./data";

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContacts = () => {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

const saveContacts = (contacts) => {
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf-8");
};

const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    console.log(contacts);
    saveContacts(contacts);
};

module.exports = { loadContacts, addContact };
