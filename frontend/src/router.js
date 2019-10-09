import Vue from 'vue'
import Router from 'vue-router'
import Preloader from './components/preloader/Preloader.vue'
import store from './store/store'

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

const notFound = () => ({
    component: import ('./pages/not_found/NotFoundPage.vue'),
    loading: Preloader
})

const ServerError = () => ({
    component: import ('./pages/server_error/ServerErrorPage.vue'),
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
        },
        {
            path: '/server_error',
            name: 'server_error',
            component: ServerError
        },
        {
            path: '*',
            name: 'not_found',
            component: notFound
        }
    ],
    beforeEach: beforeEach
})

function beforeEach(to, from, next) {
    if (store.state.startingApp) {
        next()
        return
    }
    if (store.state.logged) {
        next()
        return
    }
    next('/login')

}

export default router