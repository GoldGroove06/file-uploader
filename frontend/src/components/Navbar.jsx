import React from 'react';
import Button from '@radui/ui/Button';

function Navbar({isDarkMode, setDarkMode}) {
    return (
        <div className='top-0 sticky flex flex-row justify-between '>
            <div>Uploader</div>
            <div>
            <Button onClick={() => setDarkMode(!isDarkMode)}>Theme</Button>
            <Button>Sign Up</Button>
            <Button>Log In</Button>
            </div>
        </div>
    );
}

export default Navbar;