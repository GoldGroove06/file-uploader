import React from 'react';

function Footer() {
    return (
        <div className='bg-[#1b1b2f]/90 text-white py-8 flex flex-col items-center justify-center rounded-t-2xl mt-12 shadow-inner'>
            <div className='font-bold text-2xl mb-3'>File Uploader</div>
            <div className='mb-4 opacity-80'>Fast and easy file sharing</div>
            <div className='flex items-center'>
                Made with ❤️ by <a href="https://github.com/GoldGroove06" className='underline ml-1 hover:text-pink-200 transition-colors'>GoldGroove06</a>
            </div>
        </div>
    );
}

export default Footer;