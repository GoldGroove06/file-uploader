import React, { children } from 'react';
import Theme from '@radui/ui/Theme';
import Navbar from './Navbar';
import Footer from './Footer';

function ThemeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    return (
        <Theme >
            <div className=' bg-[linear-gradient(135deg,_#2b1055,_#3c2a91,_#5f4db0,_#7597de)] text-white md:p-4 md:pb-0' >

           
            <Navbar isDarkMode={isDarkMode} setDarkMode={setIsDarkMode}/>
            {children}
            <Footer/>
             </div>
        </Theme>
    );
}

export default ThemeProvider;