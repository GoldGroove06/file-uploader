const { name } = require("ejs");

async function getFolder(req, res) {
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


async function getFiles(req, res) {
  
    responseData = [
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
    getFiles
}