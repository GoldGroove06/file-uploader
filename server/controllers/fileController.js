const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

async function uploadFile(req, res) {
    
}
async function getFiles(req, res) {
    const { folderid } = req.params;
    console.log(folderid)
    if (!folderid) {
        return res.status(400).json({ error: "Folder ID is required" });
    }
    let data;
    try{
        data = await prisma.file.findMany({
            where: {
                userEmail: req.session.passport.user,
                folderId: parseInt(folderid)
            }
        })

    }
    catch(error) {
        console.error("Error fetching files:", error);
        return res.status(500).json({ error: "Internal server error" });

    }

    if (!data) {
        return res.status(404).json({ error: "Files not found" });
    }
    console.log(data)

    const responseData = [
        {
            name: "file1.pdf",
            size: "2MB",
        },
        {
            name: "file2.pdf",
            size: "2MB",
        },
        {
            name: "file3.pdf",
            size: "2MB",
        }
    ]
    const jsonContent = JSON.stringify(responseData);
    res.end(jsonContent);
}

module.exports = {
    getFiles
}