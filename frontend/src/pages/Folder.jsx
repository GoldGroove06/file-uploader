import React from 'react';
import Separator from '@radui/ui/Separator';

function Folder() {
    const sampleData = {
  username: "john_doe",
  folderName: "My Projects",
  folderId: "abc123",
  childFolders: [
    { id: "f1", name: "Designs" },
    { id: "f2", name: "Documents" },
    { id: "f3", name: "2025 Archive" },
  ],
  files: [
    { id: "file1", name: "resume.pdf" },
    { id: "file2", name: "project.zip" },
    { id: "file3", name: "logo.png" },
  ],
};
    return (
        <div className='min-h-screen'>
      <div>{sampleData.username}</div>
      <div>{sampleData.folderName}</div>

      <h1>Folders Viewer</h1>

      {/* Create Folder Form */}
      <form action="/folder/api/create" method="POST">
        <label htmlFor="foldername">Folder Name:</label>
        <input type="text" id="foldername" name="foldername" required />
        <input type="hidden" id="parentid" name="parentid" value={sampleData.folderId} />
        <button type="submit">Create Folder</button>
      </form>

      {/* Upload File Form */}
      <form
        action="/file/api/upload"
        method="POST"
        encType="multipart/form-data"
      >
        <label htmlFor="filename">File Name:</label>
        <input type="file" id="filename" name="filename" required />
        <input type="hidden" id="parentid" name="parentid" value={sampleData.folderId} />
        <button type="submit">Upload File</button>
      </form>

    
      <div className='mt-16 m-4'>
      <ul>
        {sampleData.childFolders.map((folder) => (
          <li key={folder.id} className='flex flex-col justify-between'>
            <a href={`/folder/folder/${folder.id}`}>{folder.name}</a>

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
            <Separator/>
          </li>
        ))}
      </ul>
      <ul>
        {sampleData.files.map((file) => (
          <li key={file.id} >
            <div className='flex justify-between'>
            {file.name}

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

            <a href={`/file/api/download/${file.id}`}>Download</a>
            </div>
            <Separator/>
          </li>
        ))}
      </ul>
      </div>
    </div>
    );
}

export default Folder;