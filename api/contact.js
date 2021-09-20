const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-fetch");
const { loadContacts, addContact } = require("../utils/contact");

router.get("/", (req, res) => {
    const contacts = loadContacts();
    res.json(contacts);
});

router.post("/add", (req, res) => {
    console.log(req.body);
    const response_key = req.body.captcha;
    const secret_key = "6LffG3McAAAAAGk2-qB11qnqF1ci5WzzYYRhAApE";
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    fetch(url, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((google_response) => {
            if (google_response.success == true) {
                const data = {
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message,
                };
                addContact(data);
                res.sendStatus(201);
            } else {
                return res.send({ response: "Failed" });
            }
        })
        .catch((error) => {
            return res.json({ error });
        });
});

module.exports = router;
