import React from 'react';
import Button from '@radui/ui/Button';

function Navbar({isDarkMode, setDarkMode}) {
    async function logout() {
        const response = await fetch('http://localhost:3000/log-out', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
    }
    return (
        <div className='top-0 sticky flex flex-row justify-between '>
            <div><a href="/"> File Uploader</a></div>
            <div>
            <Button onClick={() => setDarkMode(!isDarkMode)}>Theme</Button>
            <a href="/signup"><Button>Sign Up</Button></a>
            <a href="/signin"><Button>Log In</Button></a>
            <Button onClick={logout}>Log Out</Button>
            </div>
        </div>
    );
}

export default Navbar;