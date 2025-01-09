import Login from '../pages/login';
import Home from '../pages/home';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
