const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getFolder(req, res) {
    const id = req.params.id;
    
    const user = req.session.passport.user;
    console.log(req.session.passport.user)
    let data;
    if (id == parseInt(id)) {
         data = await prisma.folder.findFirst({
            where: {
                userEmail:user,
                parentId: null
            }
        })
    }
    else{

     data = await prisma.folder.findUnique({
        where: {
            userEmail:user,
            id: parseInt(id)
        }
    })
}
    console.log(data)
    res.render("folders", {
        username:"arsh",
        folderName: "folder1",
        parentFolder: "root",
        childfolders: [
        "folder2",
        "folder3",
        "folder4"
        ],
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
    const { foldername,parentid } = req.body;
    if (!foldername || !parentid) {
        return res.status(400).json({ error: "Folder name and parent id are required" });
    }
    const user = req.session.passport.user;
    let data
    try{

        data = await prisma.folder.create({
            data: {
                name: foldername,
                userEmail: user,
                parentId: parentid == "root" ? parseInt(parentid) : null
            }
        })
    }
    catch (error) {
        console.error("Error creating folder:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    

    res.status(200).json({ message: "Folder created successfully", folder: data });
}

async function getFiles(req, res) {
  
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
    getFolder,
    getFiles,
    createFolder
}