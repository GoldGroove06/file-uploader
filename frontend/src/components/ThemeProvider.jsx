import React, { children } from 'react';
import Theme from '@radui/ui/Theme';
import Navbar from './Navbar';
import Footer from './Footer';

function ThemeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    return (
        <Theme >
            <div className=' bg-[#639799] text-white' >

           
            <Navbar isDarkMode={isDarkMode} setDarkMode={setIsDarkMode}/>
            {children}
            <Footer/>
             </div>
        </Theme>
    );
}

export default ThemeProvider;