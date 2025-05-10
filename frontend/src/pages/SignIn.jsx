import React from 'react';

function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function signIn() {
        const response = await fetch('http://localhost:3000/auth/signin', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        if(data.message=="Logged in"){
            window.location.href = '/folder';
        };
    }
//     await fetch('http://localhost:3000/auth/signin', {
//   method: 'POST',
//   credentials: 'include', // allow cookies
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email: 'user@example.com', password: 'password' }),

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form action={signIn} method="post" className='flex flex-col justify-center items-center'>
                <span>Email: <input type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/></span>
                <span>Password: <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/></span>
                <span><input type="submit" value="Sign in" /></span>
                <span>Dont have an account? <a href="/signup" className='underline'>Sign up</a></span>
            </form>
        </div>
    );
}

export default SignIn;