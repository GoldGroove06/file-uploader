const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const passport = require("passport");
const session = require("express-session");
const {getFolder, getFiles } = require("./controllers/folderController")

const path = require("node:path");
const { get } = require('node:http');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("arsh")
})

app.get("/folder/:id", getFolder)

app.get("/api/fetchfiles/", getFiles)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})