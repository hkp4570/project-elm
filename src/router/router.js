const Home = () => import(/* webpackChunkName: "Home" */ '../pages/home/home.vue')
const City = () => import(/* webpackChunkName: "City" */ '../pages/city/city.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/login/login.vue')
const Msite = () => import(/* webpackChunkName: "Msite" */ '../pages/msite/msite.vue')
const Profile = () => import(/* webpackChunkName: "Profile" */ '../pages/profile/profile.vue')
const Info = () => import(/* webpackChunkName: "Info" */ '../pages/profile/children/info.vue')
const ProfileLayout = () => import(/* webpackChunkName: "ProfileLayout" */ '../pages/profile/profileLayout.vue')
const SetUsername = () => import(/* webpackChunkName: "SetUsername" */ '../pages/profile/children/setUsername.vue')

export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/city/:cityid',
        component: City
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/msite',
        component: Msite,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/profile',
        component: ProfileLayout,
        children: [
            {
                path: '',
                component: Profile,
            },
            {
                path: 'info',
                component: Info,
            },
            {
                path: 'setusername',
                component: SetUsername,
            }
        ]
    }
]