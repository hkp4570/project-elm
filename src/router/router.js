const Home = () => import(/* webpackChunkName: "Home" */ '../pages/home/home.vue')
const City = () => import(/* webpackChunkName: "City" */ '../pages/city/city.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/login/login.vue')
const Msite = () => import(/* webpackChunkName: "Msite" */ '../pages/msite/msite.vue')
const Profile = () => import(/* webpackChunkName: "Profile" */ '../pages/profile/profile.vue')
const Info = () => import(/* webpackChunkName: "Info" */ '../pages/profile/children/info.vue')
const BaseLayout = () => import(/* webpackChunkName: "BaseLayout" */ '../layouts/baseLayout.vue')
const SetUsername = () => import(/* webpackChunkName: "SetUsername" */ '../pages/profile/children/setUsername.vue')
const Forget = () => import(/* webpackChunkName: "Forget" */ '../pages/profile/children/forget.vue')
const Address = () => import(/* webpackChunkName: "Address" */ '../pages/profile/children/address.vue')
const AddAddress = () => import(/* webpackChunkName: "AddAddress" */ '../pages/profile/children/addAddress.vue')
const AddAddressDetail = () => import(/* webpackChunkName: "AddAddressDetail" */ '../pages/profile/children/addAddressDetail.vue')
const Balance = () => import(/* webpackChunkName: "Balance" */ '../pages/balance/balance.vue')
const BalanceDetail = () => import(/* webpackChunkName: "BalanceDetail" */ '../pages/balance/children/detail.vue')
const Discount = () => import(/* webpackChunkName: "Discount" */ '../pages/discount/discount.vue')
const HbDescription = () => import(/* webpackChunkName: "HbDescription" */ '../pages/discount/children/hbDescription.vue')
const HbHistory = () => import(/* webpackChunkName: "HbHistory" */ '../pages/discount/children/hbHistory.vue')
const Commend = () => import(/* webpackChunkName: "Commend" */ '../pages/discount/children/commend.vue')
const Exchange = () => import(/* webpackChunkName: "Exchange" */ '../pages/discount/children/exchange.vue')
const Coupon = () => import(/* webpackChunkName: "Coupon" */ '../pages/discount/children/coupon.vue')
const Points = () => import(/* webpackChunkName: "Points" */ '../pages/points/points.vue')
const PointsDetail = () => import(/* webpackChunkName: "PointsDetail" */ '../pages/points/children/detail.vue')
const Search = () => import(/* webpackChunkName: "Search" */ '../pages/search/search.vue')
const Food = () => import(/* webpackChunkName: "Food" */ '../pages/food/food.vue')
const Shop = () => import(/* webpackChunkName: "Shop" */ '../pages/shop/shop.vue')

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
        component: BaseLayout,
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
            },
            {
                path: 'forget',
                component: Forget,
            },
            {
                path: 'address',
                component: Address,
            },
            {
                path: 'addaddress',
                component: AddAddress,
            },
            {
                path: 'addaddressdetail',
                component: AddAddressDetail,
            }
        ]
    },
    {
        path: '/balance',
        component: BaseLayout,
        children: [
            {
                path: '',
                component: Balance,
            },
            {
                path: 'detail',
                component: BalanceDetail,
            }
        ]
    },
    {
        path: '/discount',
        component: BaseLayout,
        children: [
            {
                path: '',
                component: Discount,
            },
            {
                path: 'hbDescription',
                component: HbDescription,
            },
            {
                path: 'hbHistory',
                component: HbHistory,
            },
            {
                path: 'commend',
                component: Commend,
            },
            {
                path: 'exchange',
                component: Exchange,
            },
            {
                path: 'coupon',
                component: Coupon,
            }
        ]
    },
    {
        path: '/points',
        component: BaseLayout,
        children: [
            {
                path: '',
                component: Points,
            },
            {
                path: 'detail',
                component: PointsDetail,
            }
        ]
    },
    {
        path: '/search/:geohash',
        component: Search,
    },
    {
        path: '/food',
        component: Food,
    },
    {
        path: '/shop',
        component: BaseLayout,
        children: [
            {
                path: '',
                component: Shop,
            }
        ]
    }
]