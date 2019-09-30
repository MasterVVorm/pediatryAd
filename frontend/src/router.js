import Vue from 'vue'
import Router from 'vue-router'
import Preloader from './components/preloader/Preloader.vue'
import store from './store'

const Home = () => ({
    component: import ('./pages/home/HomePage.vue'),
    loading: Preloader

})
const Login = () => ({
    component: import ('./pages/login/LoginPage.vue'),
    loading: Preloader
})
const CreateAd = () => ({
    component: import ('./pages/create_ad/CreateAdPage.vue'),
    loading: Preloader
})
const EditAd = () => ({
    component: import ('./pages/edit_ad/EditAdPage.vue'),
    loading: Preloader
})

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: EditAd
        },
        {
            path: '/create',
            name: 'create',
            component: CreateAd
        }
    ]
})

export default router