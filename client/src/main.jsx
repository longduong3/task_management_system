import { StrictMode } from 'react'
import { SpinnerProvider } from './services/spinnerContext.jsx';
import './index.css'
import ReactDOM from "react-dom/client";
import App from './App.jsx'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <SpinnerProvider>
            <App />
        </SpinnerProvider>
    </StrictMode>,
);