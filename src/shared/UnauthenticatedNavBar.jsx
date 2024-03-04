import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Navigation bar for unauthenticated users.
 * 
 * Provides navigation options for users who are not currently logged in. Includes buttons
 * to navigate to the login and signup pages using React Router's `useNavigate` hook.
 * 
 * @returns {React.ReactElement} A navigation bar component for unauthenticated users.
 */
const UnauthenticatedNavBar = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-darkSecondaryBg text-gray-500 p-4 border-b border-darkBorderColor sticky top-0 z-10">
            <nav>
                <ul className="flex justify-end space-x-4">
                    <li className="hover:text-darkTextColor"><button onClick={() => navigate('/login')}>Login</button></li>
                    <li className="hover:text-darkTextColor"><button onClick={() => navigate('/signup')}>Signup</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default UnauthenticatedNavBar;
