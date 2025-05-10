import React from 'react';
import Button from '@radui/ui/Button';

function Signup() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    async function signUp() {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password, confirmPassword: confirmPassword }),
        });
        const data = await response.json();
        console.log(data);
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form method="post" action={signUp} className='flex flex-col justify-center items-center'>
                <span>Name: <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)}/></span>
                <span>Email: <input type="text" name="email" required value={ email} onChange={(e) => setEmail(e.target.value)}/></span>
                <span>Password: <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/></span>
                <span>Confirm Password: <input type="password" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/></span>
                <span><input type="submit" value="Sign up" /></span>
                <span>Already have an account? <a href="/signin" className='underline'>Sign in</a></span>
            </form>
        </div>
    );
}

export default Signup;