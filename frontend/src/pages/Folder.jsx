import React, { useState } from 'react';
import Separator from '@radui/ui/Separator';
import Button from '@radui/ui/Button';
import { Trash2, FolderPen, TextCursorInput, FileDown, File, Folder as OFolder, FolderClosed, FolderPlus, FileUp, Share2 } from 'lucide-react';
import { useEffect } from 'react';


function Folder() {
    const [Data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    async function fetchFolders(id) {
        if (id == "root") return
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/folder/folder/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data.parentId);
            console.log(data);
            setData(data);
            setLoading(false);
        }

        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchFolders(0)
    }, [])



    return (
        <div className='min-h-screen'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>{Data.username}</div>


                    {/* <h1>Folders Viewer</h1> */}


                    {/* <form action="/folder/api/create" method="POST">
                <label htmlFor="foldername">Folder Name:</label>
                <input type="text" id="foldername" name="foldername" required />
                <input type="hidden" id="parentid" name="parentid" value={Data.folderId} />
                <button type="submit">Create Folder</button>
            </form>


            <form
                action="/file/api/upload"
                method="POST"
                encType="multipart/form-data"
            >
                <label htmlFor="filename">File Name:</label>
                <input type="file" id="filename" name="filename" required />
                <input type="hidden" id="parentid" name="parentid" value={Data.folderId} />
                <button type="submit">Upload File</button>
            </form> */}


                    <div className='mt-16 m-4'>
                        <div className='flex flex-row mb-4 justify-between'><div className='flex flex-row' onClick={() => fetchFolders(Data.parentFolder)}><OFolder />...{Data.folderName}</div> <div><Button><FileUp /></Button> <Button> <FolderPlus /></Button></div></div>
                        <ul>
                            {Data.childfolders.map((folder) => (

                                <li key={folder.id} className='flex flex-col justify-between'>
                                    <div className='flex justify-between'>

                                        <div className='flex flex-row' onClick={() => fetchFolders(folder.id)}><FolderClosed />{folder.name}</div>
                                        <div>
                                            <Button><FolderPen /></Button>
                                            <Button><Trash2 /></Button>
                                        </div>
                                    </div>
                                    {/* 
            <form action="/folder/api/delete" method="POST">
              <input type="hidden" name="folderId" value={folder.id} />
              <button type="submit">Delete Folder</button>
            </form>

            
            <form action="/folder/api/rename" method="POST">
              <input type="text" name="newName" required />
              <input type="hidden" name="folderId" value={folder.id} />
              <button type="submit">Rename Folder</button>
            </form> */}

                                    <Separator />
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {Data.files.map((file) => (
                                <li key={file.id} >
                                    <div className='flex justify-between'>
                                        <div className='flex flex-row '><File /> {file.name}</div>

                                        {/* 
            <form action="/file/api/rename" method="POST">
              <input type="text" name="newname" required />
              <input type="hidden" name="fileId" value={file.id} />
              <button type="submit">Rename File</button>
            </form>

            
            <form action="/file/api/delete" method="POST">
              <input type="hidden" name="fileId" value={file.id} />
              <button type="submit">Delete File</button>
            </form> */}
                                        <div>
                                            <Button><Share2 /></Button>
                                            <Button><FileDown /></Button>
                                            <Button><TextCursorInput /></Button>
                                            <Button><Trash2 /></Button>
                                        </div>
                                        {/* <a href={`/file/api/download/${file.id}`}>Download</a> */}
                                    </div>
                                    <Separator />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Folder;