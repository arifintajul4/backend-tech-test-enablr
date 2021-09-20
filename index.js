const express = require("express");
const cors = require("cors");
const contact = require("./api/contact");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/contact", contact);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
