// FormLayout.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormLayout component renders a form layout with an optional title.
 * 
 * @param {Object} props
 * @param {string} [props.title] - The title of the form. Optional.
 * @param {React.ReactNode} props.children - The form elements and other children to be rendered within the form layout.
 */
export const FormLayout = ({ title, children }) => {
    return (
        <div className=" m-y-100 bg-darkSecondaryBg text-darkTextColor max-w-md mx-auto my-10 p-8 border shadow-lg rounded-lg flex items-center justify-center h-1/2">
            <div className=" form-container ">
                {title && <h2 className="text-center text-2xl  mb-6">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

FormLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

