import React, { useState, useEffect } from 'react';
import Separator from '@radui/ui/Separator';
import Button from '@radui/ui/Button';
import { Trash2, FolderPen, TextCursorInput, FileDown, File, Folder as OFolder, FolderClosed, FolderPlus, FileUp, Share2 } from 'lucide-react';
import Dialog from '../components/Dialog';
import Callout from '@radui/ui/Callout';
import Code from "@radui/ui/Code"


function Folder() {
    const [Data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [shareLink, setShareLink] = useState('');
    const [uploadFile, setUploadFile] = useState(null);
    const [calloutData, setCalloutData] = useState('');
    const [showCallout, setShowCallout] = useState(false);
    const [newName, setNewName] = useState('');

    async function fetchFolders(id) {
        if (id == "root") return
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/folder/folder/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
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

    // Function to show callout message and auto-hide after 3 seconds
    const showCalloutMessage = (message) => {
        setCalloutData(message);
        setShowCallout(true);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            setShowCallout(false);
        }, 3000);
    };

    async function fetchFunction({ formData, url, fetchMethod,headers, calloutmsg }) {
        setNewName("")
        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                method: fetchMethod,
                credentials: 'include',
                headers: headers,
                body: formData,
            });

            if (response.ok) {
                showCalloutMessage(calloutmsg);
                // closeDialog();
                fetchFolders(Data.folderid);
            } else {
                const errorData = await response.json();
                showCalloutMessage(`Upload failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            showCalloutMessage('Upload failed: Network error');
        }
    }

    async function uploadHandler() {
        if (!uploadFile) {
            showCalloutMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('filename', uploadFile);
        formData.append('parentid', Data.folderid);

        fetchFunction({
            formData,
            url: 'file/api/upload',
            fetchMethod: 'POST',
            calloutmsg: 'File uploaded successfully'
        })
    }

    function createFolderHandler() {
        if (!title) {
            showCalloutMessage('Please enter a title first');
            return;
        }

        const formData = new FormData();
        formData.append('foldername', newFolderName);
        formData.append('parentid', Data.folderid);

        fetchFunction({
            formData,
            url: 'folder/api/create',
            fetchMethod: 'POST',
            calloutmsg: 'Folder created successfully'
        })
    }

    function deleteFolder(id) {
        fetchFunction({
            formData: JSON.stringify({ folderId: id }),
            url: 'folder/api/delete',
            headers: {'Content-Type': 'application/json'},
            fetchMethod: 'POST',
            calloutmsg: 'Folder deleted successfully'
        })
    }

    function renameFolderHandler(id) {
        fetchFunction({
            formData: JSON.stringify({ folderId: id, newName }),
            url: 'folder/api/rename',
            headers: {'Content-Type': 'application/json'},
            fetchMethod: 'POST',
            calloutmsg: 'Folder renamed successfully'
        })
    }

    function createFolderHandler() {
        fetchFunction({
            formData: JSON.stringify({ foldername: newName, parentid: Data.folderid }),
            url: 'folder/api/create',
            headers: {'Content-Type': 'application/json'},
            fetchMethod: 'POST',
            calloutmsg: 'Folder created successfully'
        })
    }

    function renameFileHandler(id) {
        fetchFunction({
            formData: JSON.stringify({ fileId: id, newname: newName }),
            url: 'file/api/rename',
            headers: {'Content-Type': 'application/json'},
            fetchMethod: 'POST',
            calloutmsg: 'File renamed successfully'
        })
    }

    async function deleteFile(id) {
        fetchFunction({
            formData: JSON.stringify({ fileId: id }),
            url: 'file/api/delete',
            headers: {'Content-Type': 'application/json'},
            fetchMethod: 'POST',
            calloutmsg: 'File deleted successfully'
        })
    }

    async function createShareHandler(id) {
        try {
            const response = await fetch(`http://localhost:3000/file/create/share`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id,
                    expiry: time
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setShareLink(data.shareLink);
                showCalloutMessage("Link created successfully");
                
            } else {
                const errorData = await response.json();
                showCalloutMessage(`Upload failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            showCalloutMessage('Upload failed: Network error');
        }
    }



    return (

        <div className='min-h-screen'>
            {/* Callout message */}
            {showCallout && (
                <Callout className={` ${calloutData.includes('success') ? 'bg-green-500' : 'bg-red-500'
                    } text-white shadow-lg`}>
                    {calloutData}
                </Callout>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>{Data.username}</div>


                    <div className='mt-16 m-4 overflow-y-auto h-screen'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row' onClick={() => fetchFolders(Data.parentFolder)}>
                                <OFolder />...{Data.folderName}
                            </div>
                            <div>
                                <Dialog >
                                    <Dialog.Trigger>
                                        <Button onClick={() => console.log('Dialog opened')}>
                                            <FileUp />
                                        </Button>
                                    </Dialog.Trigger>

                                    <Dialog.Content title="Upload File">
                                        <div>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        setUploadFile(e.target.files[0]);
                                                    }
                                                }}
                                                required
                                            />
                                            <Button type="submit" onClick={uploadHandler}>
                                                Upload File
                                            </Button>
                                        </div>
                                    </Dialog.Content>
                                </Dialog> 
                                <Dialog>
                                                <Dialog.Trigger>
                                                    <Button> <FolderPlus /></Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content title="Create Folder">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            onChange={(e) => {
                                                                setNewName(e.target.value);
                                                            }}
                                                            value={newName}
                                                            required
                                                        />
                                                        <Button type="submit" onClick={() => createFolderHandler()}>
                                                            Create Folder
                                                        </Button>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog>
                                
                            </div>
                        </div>
                        <ul>
                            {Data.childfolders.map((folder) => (

                                <li key={folder.id} className='flex flex-col justify-between'>
                                    <div className='flex justify-between'>

                                        <div className='flex flex-row' onClick={() => fetchFolders(folder.id)}><FolderClosed />{folder.name}</div>
                                        <div>
                                            <Dialog>
                                                <Dialog.Trigger>
                                                    <Button><FolderPen /></Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content title="Rename Folder">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            onChange={(e) => {
                                                                setNewName(e.target.value);
                                                            }}
                                                            value={newName== "" ? folder.name : newName}
                                                            required
                                                        />
                                                        <Button type="submit" onClick={() => renameFolderHandler(folder.id)}>
                                                            Rename Folder
                                                        </Button>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog>
                                            <Dialog>
                                                <Dialog.Trigger>
                                                    <Button><Trash2 /></Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content title="Delete Folder">
                                                    <div>
                                                        <p>Are you sure you want to delete this folder?</p>
                                                        <Button type="submit" onClick={() => deleteFolder(folder.id)}>
                                                            Delete Folder
                                                        </Button>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog>
                                        </div>
                                    </div>
                                  

                                    <Separator />
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {Data.files.map((file) => (
                                <li key={file.id} >
                                    <div className='flex justify-between'>
                                        <div className='flex flex-row '><File /> {file.name}</div>
                <div>   <Dialog>
                                                <Dialog.Trigger>
                                                    <Button><Share2 /></Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content title="Create Share Link">
                                                    <div>
                                                        <input
                                                            type="datetime-local"
                                                            onChange={(e) => {
                                                                setTime(e.target.value);
                                                            }}
                                                            value={time}
                                                            required
                                                        />
                                                        <Button type="submit" onClick={() => createShareHandler(file.id)}>
                                                            Create
                                                        </Button>
                                                        <Code>{shareLink}</Code>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog>
                                            
                                            <a href={`http://localhost:3000/file/api/download/${file.id}`}><Button><FileDown /></Button></a>
                                            <Dialog>
                                                <Dialog.Trigger>
                                                    <Button><TextCursorInput /></Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content title="Rename File">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            onChange={(e) => {
                                                                setNewName(e.target.value);
                                                            }}
                                                            value={newName == "" ? file.name : newName}
                                                            required
                                                        />
                                                        <Button type="submit" onClick={() => renameFileHandler(file.id)}>
                                                            Rename File
                                                        </Button>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog>
                                            <Dialog>
                                                <Dialog.Trigger>
                                                    <Button><Trash2 /></Button>
                                                </Dialog.Trigger>

                                                <Dialog.Content title="Delete File">
                                                    <div>
                                                        <p>Are you sure you want to delete this file?</p>
                                                        <Button type="submit" onClick={() => deleteFile(file.id)}>
                                                            Delete File
                                                        </Button>
                                                    </div>
                                                </Dialog.Content>
                                            </Dialog>
                                        </div>
                                        {/* <a href={`http://localhost:3000/file/api/download/${file.id}`}>Download</a> */}
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