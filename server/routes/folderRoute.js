const { Router } = require("express")
const folderRoute = Router()

const { getFolder, createFolder, folderCreate, deleteFolder, renameFolder } = require("../controllers/folderController")

folderRoute.get("/folder/:id", getFolder)
folderRoute.post("/api/create", createFolder)
folderRoute.get("/create", folderCreate)
folderRoute.post("/api/delete", deleteFolder)
folderRoute.post("/api/rename", renameFolder)

module.exports = folderRoute