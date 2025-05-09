import React from 'react';

function SignIn() {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form action="/auth/signin" method="post" className='flex flex-col justify-center items-center'>
                <span>Email: <input type="text" name="email" required /></span>
                <span>Password: <input type="password" name="password" required /></span>
                <span><input type="submit" value="Sign in" /></span>
                <span>Dont have an account? <a href="/signup" className='underline'>Sign up</a></span>
            </form>
        </div>
    );
}

export default SignIn;