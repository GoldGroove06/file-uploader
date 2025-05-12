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
        <div className='top-0 sticky flex flex-row justify-between bg-[#1b1b2f]/80  shadow-md p-3 z-10 mr-2 ml-2 rounded-lg' >
            <div className='text-xl font-bold text-white p-2'><a href="/" className='hover:opacity-80 transition-opacity'> File Uploader</a></div>
            <div className='flex items-center gap-4'>
                <a href="/signup">Sign Up</a>
                <a href="/signin">Log In</a>
                <Button onClick={logout} >Log Out</Button>
            </div>
        </div>
    );
}

export default Navbar;