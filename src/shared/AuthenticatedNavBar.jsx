import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Navigation bar for authenticated users.
 * 
 * Displays navigation options for users who are currently logged in. It includes links to
 * the Dashboard and Filter pages, as well as an account dropdown with a logout option.
 * Utilizes React Router's `useNavigate` for navigation and `AuthContext` for logout functionality.
 * 
 * The account dropdown visibility is controlled by a local state, `showDropdown`, toggled by mouse events.
 * 
 * @returns {React.ReactElement} A navigation bar component for authenticated users.
 */
const AuthenticatedNavBar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="bg-darkSecondaryBg text-gray-500 p-4 border-b border-darkBorderColor sticky top-0 z-10 ">
            <nav>
                <ul className="flex justify-end space-x-4">
                    <li className = "hover:text-darkTextColor"><button onClick={() => navigate('/dashboard')}>Dashboard</button></li>
                    <li className = "hover:text-darkTextColor"><button onClick={() => navigate('/filter')}>Filter</button></li>
                    <li className="relative">
                    <div onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}>
                        <button className="hover:text-darkTextColor">
                            Account
                        </button>
                        {showDropdown && (
                            <ul className="absolute right-0 bg-white border border-gray-200 rounded shadow-lg">
                                <li className="hover:text-darkTextColor hover:bg-gray-100 p-2">
                                    <button onClick={() => logout(navigate)}>Logout</button>
                                </li>
                            </ul>
                        )}
                    </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default AuthenticatedNavBar;




