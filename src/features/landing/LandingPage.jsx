import React from "react";

/**
 * LandingPage component that serves as the entry point of the application.
 * Presents a welcoming message and introduces the user to MIDAS.
 * 
 * @returns {React.ReactElement} The LandingPage component.
 */
const LandingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-darkBackground text-darkTextColor">
            <div className="text-center">
                <h1 className="text-6xl font-bold underline decoration-darkTextColor decoration-4">
                    MIDAS
                </h1>
                <p className="text-xl mt-4">
                    Welcome to MIDAS
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
