import Login from '../pages/login';
import Home from '../pages/home';
import List from '../pages/list';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/list', component: List },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
