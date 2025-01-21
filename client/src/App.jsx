import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './services/routerService.jsx';
import { DefaultLayout } from './components/molecules/layout';
import './App.css';
import ProtectedRoute from './services/protectedRoutes.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map(({ path, component: Component, layout, isProtected }, index) => {
                        const Layout = layout === null ? Fragment : layout || DefaultLayout;
                        const showSidebar = path !== '/' && path !== '/signUp';

                        const element = isProtected ? (
                            <ProtectedRoute>
                                <Layout showSidebar={showSidebar}>
                                    <Component />
                                </Layout>
                            </ProtectedRoute>
                        ) : (
                            <Layout showSidebar={showSidebar}>
                                <Component />
                            </Layout>
                        );

                        return <Route key={index} path={path} element={element} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;