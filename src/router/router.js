
const Home  = () => import(/* webpackChunkName: "Home" */ '../pages/home/home.vue')
const City = () => import(/* webpackChunkName: "City" */ '../pages/city/city.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/login/login.vue')

export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
        meta:{
            keepAlive: true
        }
    },
    {
        path: '/city/:cityid',
        component: City
    },
    {
        path: '/login',
        component: Login
    }
]