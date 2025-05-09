import React from 'react';
import Button from '@radui/ui/Button';

function Signup() {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form method="post" className='flex flex-col justify-center items-center'>
                <span>Name: <input type="text" name="name" required /></span>
                <span>Email: <input type="text" name="email" required /></span>
                <span>Password: <input type="password" name="password" required /></span>
                <span>Confirm Password: <input type="password" name="confirmPassword" required /></span>
                <span><input type="submit" value="Sign up" /></span>
                <span>Already have an account? <a href="/signin" className='underline'>Sign in</a></span>
            </form>
        </div>
    );
}

export default Signup;