import React, { createContext, useContext, useState } from 'react';
import {Atom} from 'react-loading-indicators';

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const showSpinner = () => setIsVisible(true);
    const hideSpinner = (delay = 500) => {
        setTimeout(() => {
            setIsVisible(false);
        }, delay);
    }


    return (
        <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
            {children}
            {isVisible && <Spinner />}
        </SpinnerContext.Provider>
    );
};

export const useSpinner = () => useContext(SpinnerContext);

// Spinner component
const Spinner = () => (
    <div style={overlayStyle}>
        <Atom color="#0070e5" size="large" text="loading" textColor="#436ec1" />
    </div>
);

// Styles for overlay
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(255 255 255 / 90%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
};

