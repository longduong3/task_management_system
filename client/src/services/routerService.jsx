import Login from '../pages/login';
import Home from '../pages/home';
import List from '../pages/list';
import SignUp from '../pages/signUp';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/list', component: List },
    { path: '/signUp', component: SignUp },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
