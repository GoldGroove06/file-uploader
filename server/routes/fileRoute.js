const { Router } = require("express")
const fileRoute = Router()

const {getFiles} = require("../controllers/fileController")

fileRoute.get("/fetchfiles/:folderid", getFiles)
fileRoute.post("/api/upload", )

module.exports = fileRoute;