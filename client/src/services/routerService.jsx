import Login from '../pages/login';
import Home from '../pages/home';
import List from '../pages/list';
import SignUp from '../pages/signUp';

const publicRoutes = [
    { path: '/', component: Login, isProtected: false, },
    { path: '/home', component: Home, isProtected: true,},
    { path: '/list/:id', component: List, isProtected: true,},
    { path: '/signUp', component: SignUp, isProtected: false,},
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
