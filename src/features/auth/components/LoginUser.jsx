// LoginUser.js
import React from 'react';
import { useLogin } from '../hooks/useLogin'; 
import { FormLayout } from '../../../shared/FormLayout'; 


/**
 * LoginUser component for rendering the login form.
 * 
 * Utilizes the useLogin custom hook for state management and form submission logic,
 * and FormLayout for consistent styling.
 */
const LoginUser = () => {
    const { username, setUsername, password, setPassword, handleSubmit } = useLogin();

    return (
        <FormLayout className="bg-darkSecondaryBg" title="LOGIN">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-darkBackground"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-darkBackground m-0.5"
                />
                <div className='flex justify-center w-full'>
                    <button type="submit" className="rounded-lg py-1.5 px-3 border border-darkBorderColor bg-darkSecondaryBg text-darkTextColor cursor-pointer text-base outline-none hover:bg-gray-400 focus:bg-gray-700 hover:text-white focus:text-white">Submit</button>
                </div>
            </form>
        </FormLayout>
    );
};

export default LoginUser;
