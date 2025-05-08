const { Router } = require("express")
const fileRoute = Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {getFiles, getForm, uploadFile, renameFile, deleteFile} = require("../controllers/fileController")

fileRoute.get("/fetchfiles/:folderid", getFiles)
fileRoute.post("/api/upload", upload.single('filename'), uploadFile)
fileRoute.get("/newfile", getForm)
fileRoute.post("/api/rename", renameFile)
fileRoute.post("/api/delete", deleteFile)

module.exports = fileRoute;