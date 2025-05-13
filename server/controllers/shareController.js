const { PrismaClient } = require('@prisma/client');
const { downloadFile } = require('./fileController');
const prisma = new PrismaClient();

async function shareDownload(req, res){
    const uid = req.params.uid
    const id = uid.split("-");
    console.log(id[2], id[3])
    const sharefile = await prisma.fileShare.findUnique({
        where:{
            id: parseInt(id[3])
        }
    })

    if (sharefile){
        if (sharefile.expiryDate > Date.now()){
            req.params.id = id[2];
            downloadFile(req, res)
        }
    }
    else{
         res.status(404).json({ error: "Link expired or File not found" });
    }
   
}

module.exports ={
    shareDownload
}