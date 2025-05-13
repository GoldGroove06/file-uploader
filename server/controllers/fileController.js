const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function getForm ( req, res ) {
    res.render("newfileform")
}

async function uploadFile(req, res) {
    const { parentid } = req.body;
    console.log(parentid)
    if (!req.file) {
        return res.status(400).json({ error: "File is required" });
    }
    console.log(req.file)
    try {
        const file = await prisma.file.create({
            data: {
                name: req.file.originalname,
                savename: req.file.filename,
                size: req.file.size,
                userEmail: req.user.email,
                folderId: parseInt(parentid)
            }
        })
         
    }
    catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "File uploaded successfully" });
    
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
                userEmail: req.user.email,
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
    const jsonContent = JSON.stringify(data);
    res.end(jsonContent);
}

async function downloadFile(req,res) {
    const id = req.params.id;
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: parseInt(id),

            }
        })
        console.log(file)
        const fileLocation = `${__dirname}/../uploads/${file.savename}`;
        res.download(fileLocation, file.name);
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function renameFile(req, res) {
    const {newname, fileId} = req.body
    try{
        await prisma.file.update({
            where: {
                id: parseInt(fileId),

            },
            data: {
                name: newname
            }
        })
        res.status(200).json({message: "File renamed successfully"})
    }
    catch(error) {
        console.error("Error renaming file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteFile(req, res) {
    console.log(req.body)
    const { fileId } = req.body;
    console.log(fileId)
    if (!fileId) {
        return res.status(400).json({ error: "File ID is required" });
    }
    try {
        await prisma.file.delete({
            where: {
                id: parseInt(fileId),
            }
        });
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createShareLink(req, res) {
    const { id, expiry } = req.body;
    console.log(id, expiry)
    console.log(new Date(expiry))
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }
        const shareName = `${file.savename}-${Date.now()}-${file.id}`;
        const shareLinkPrisma = await prisma.fileShare.create({
            data: {
                fileId: file.folderId,
                uniqueLink: shareName,
                expiryDate : new Date(expiry),
            }
        })
        const shareLink = `http://localhost:3000/share/${shareName}-${shareLinkPrisma.id}`;
        res.status(200).json({ shareLink });
    } catch (error) {
        console.error("Error generating share link:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getFiles,
    getForm,
    uploadFile,
    renameFile,
    deleteFile,
    downloadFile,
    createShareLink

}