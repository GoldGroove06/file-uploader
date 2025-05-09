import React from 'react';
import Button from '@radui/ui/Button';

function Navbar({isDarkMode, setDarkMode}) {
    return (
        <div className='top-0 sticky flex flex-row justify-between '>
            <div><a href="/"> File Uploader</a></div>
            <div>
            <Button onClick={() => setDarkMode(!isDarkMode)}>Theme</Button>
            <a href="/signup"><Button>Sign Up</Button></a>
            <a href="/signin"><Button>Log In</Button></a>
            </div>
        </div>
    );
}

export default Navbar;