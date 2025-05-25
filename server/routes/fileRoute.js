import { Router } from "express"
const fileRoute = Router()
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

import { getFiles, getForm, uploadFile, renameFile, deleteFile, downloadFile, createShareLink } from "../controllers/fileController"

fileRoute.get("/fetchfiles/:folderid", getFiles)
fileRoute.post("/api/upload", upload.single('filename'), uploadFile)
fileRoute.get("/newfile", getForm)
fileRoute.post("/api/rename", renameFile)
fileRoute.post("/api/delete", deleteFile)
fileRoute.get("/api/download/:id", downloadFile)

fileRoute.post("/create/share", createShareLink)

export default fileRoute;