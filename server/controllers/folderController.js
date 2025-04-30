const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getFolder(req, res) {
    const id = req.params.id;

    const user = req.session.passport.user;
    console.log(req.session.passport.user)
    let data;
    try {
        if (parseInt(id) == 0) {
            data = await prisma.folder.findFirst({
                where: {
                    userEmail: user,
                    parentId: null
                },

                include: {
                    files: true,
                    children: true
                }
            })
        }
        else {

            data = await prisma.folder.findUnique({
                where: {
                    userEmail: user,
                    id: parseInt(id)
                },

                include: {
                    files: true,
                    children: true
                }
            })
        }
        console.log(data)
    }
    catch (error) {
        console.error("Error fetching folder:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    if (!data) {
        return res.status(404).json({ error: "Folder not found" });
    }

    res.render("folders", {
        username: req.session.passport.user,
        folderName: data.name,
        parentFolder: "root",
        childfolders: data.children,
        files: [
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

    })

}

async function createFolder(req, res) {
    const { foldername, parentid } = req.body;
    console.log(foldername, parentid)
    if (!foldername || !parentid) {
        return res.status(400).json({ error: "Folder name and parent id are required" });
    }
    const user = req.session.passport.user;
    let data
    try {

        data = await prisma.folder.create({
            data: {
                name: foldername,
                userEmail: user,
                parentId: parentid == "root" ? null : parseInt(parentid)
            }
        })
    }
    catch (error) {
        console.error("Error creating folder:", error);
        return res.status(500).json({ error: "Internal server error" });
    }


    res.status(200).json({ message: "Folder created successfully", folder: data });
}

async function deleteFolder(req, res) {
    const { folderId } = req.body;
    if (!folderId) {
        return res.status(400).json({ error: "Folder ID is required" });
    }
    try {
        await prisma.folder.delete({
            where: {
                id: parseInt(folderId)
            }
        });
        res.status(200).json({ message: "Folder deleted successfully" });
    } catch (error) {
        console.error("Error deleting folder:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function renameFolder(req, res) {
    const { folderId, newName } = req.body;
    if (!folderId || !newName) {
        return res.status(400).json({ error: "Folder ID and new name are required" });
    }
    try {
        await prisma.folder.update({
            where: {
                id: parseInt(folderId)
            },
            data: {
                name: newName
            }
        });
        res.status(200).json({ message: "Folder renamed successfully" });
    } catch (error) {
        console.error("Error renaming folder:", error);
        res.status(500).json({ error: "Internal server error" });
    }


}



async function folderCreate(req, res) {
    res.render("newform")
}

module.exports = {
    getFolder,
    createFolder,
    folderCreate,
    deleteFolder,
    renameFolder
}