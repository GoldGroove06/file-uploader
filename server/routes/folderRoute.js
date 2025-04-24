const {Router} = require("express")
const folderRoute = Router()

const {getFolder, getFiles, createFolder } = require("../controllers/folderController")

folderRoute.get("/:id", getFolder)
folderRoute.get("/fetchfiles/", getFiles)
folderRoute.post("/create", createFolder)

module.exports = folderRoute