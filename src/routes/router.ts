import ForgotPassword from '@/pages/forgotPassword/ForgotPassword';
import Login from '@/pages/login/Login';
import ChangePassword from '@/pages/changePassword/ChangePassword';
import Unauthorized from '@/pages/unauthorized/Unauthorized';

const publicRoutes = [
    {path: 'login',component: Login},
    {path: 'forgot',component: ForgotPassword},
    {path: 'change-password',component: ChangePassword},
    {path:'unauthorized',component: Unauthorized},
];

export { publicRoutes};