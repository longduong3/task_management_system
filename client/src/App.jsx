import {Fragment} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {publicRoutes} from "./services/routerService.jsx";
import { DefaultLayout } from './components/molecules/layout';
import './App.css'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map(({path, component: Component, layout}, index) => {
                        const Layout = layout === null ? Fragment : layout || DefaultLayout;
                        const showSidebar = path !== '/login';
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Layout showSidebar={showSidebar}>
                                        <Component/>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
