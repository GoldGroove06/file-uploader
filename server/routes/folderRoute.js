import { Router } from "express"
const folderRoute = Router()

import { getFolder, createFolder, folderCreate, deleteFolder, renameFolder } from "../controllers/folderController"

folderRoute.get("/folder/:id", getFolder)
folderRoute.post("/api/create", createFolder)
folderRoute.get("/create", folderCreate)
folderRoute.post("/api/delete", deleteFolder)
folderRoute.post("/api/rename", renameFolder)

export default folderRoute