import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { mapActions } from 'vue-router'
import VuexChromePlugin from 'vuex-chrome-plugin'
import userServicies from './servicies/user.servicies.js'
import errorConstants from './constants/error.constants.js'
import storageConstants from './constants/storage.constants.js'
import adServicies from './servicies/advertisement.sericies.js'
import { validateStatus } from './utils/service.utils.js'
import router from './router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        logged: false,
        loginIn: false,
        loading: false,
        startingApp: true,
        token: null,
        error: false,
        error_message: '',
        advertisements: [],
    },
    mutations: {
        set_starting_app(state, payload) {
            state.startingApp = payload
        },
        set_logged(state, payload) {
            state.logged = payload
        },
        set_token(state, payload) {
            state.token = payload
        },
        set_login_in(state, payload) {
            state.loginIn = payload
        },
        set_loading(state, payload) {
            state.loading = payload
        },
        set_error(state, payload) {
            state.error = payload
        },
        set_error_message(state, payload) {
            state.error_message = payload
        },
        set_ads(state, payload) {
            state.advertisements = payload
        }
    },
    actions: {
        startApp: async({ commit, state }) => {
            const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
            if (token) {
                try {
                    const response = await userServicies.validateToken(token)
                    const { status, data } = response
                    if (validateStatus(status)) {
                        success(data.token)
                    }
                } catch (error) {
                    try {
                        const { response } = error
                        const { data, status } = response
                        failure(errorConstants.WRONG_LOGIN_OR_PASSWORD)
                    } catch (e) {
                        failure(errorConstants.SERVER)
                    }
                }
            } else {
                commit('set_starting_app', false)
            }

            function success(token) {
                commit('set_token', token)
                commit('set_logged', true)
                commit('set_starting_app', false)
                localStorage.setItem(storageConstants.TOKEN, JSON.stringify(token))
                if (window.location.href.includes('login')) {
                    router.push('/')
                }
            }

            function failure(message) {
                commit('set_starting_app', false)
                localStorage.removeItem(storageConstants.TOKEN)
                router.push('/login')
            }
        },
        login: async({ commit, state }, user) => {
            commit('set_login_in', true)
            try {
                let response = await userServicies.login(user)
                const { status } = response
                if (validateStatus(status)) {
                    success(response.data.token)
                }
            } catch (error) {
                try {
                    const { response } = error
                    switch (response.status) {
                        case 404:
                            failure(errorConstants.WRONG_LOGIN_OR_PASSWORD)
                            break
                        default:
                            failure(errorConstants.SERVER)
                            break;
                    }
                } catch (e) {
                    failure(errorConstants.SERVER)
                }
            }

            function success(token) {
                commit('set_token', token)
                commit('set_logged', true)
                commit('set_login_in', false)
                localStorage.setItem(storageConstants.TOKEN, JSON.stringify(token))
            }

            function failure(message) {
                commit('set_login_in', false)
                commit('set_error', true)
                commit('set_error_message', message)
            }
        },
        get_advertisements: async({ commit, state }) => {
            commit('set_loading', true)
            try {
                const response = await adServicies.getAllAds(state.token)
                const { status, data } = response
                if (validateStatus(status)) {
                    success(data.ads)
                } else {
                    failure(errorConstants.SERVER)
                }
            } catch (error) {
                try {
                    const { response } = error
                    const { status } = response
                } catch (e) {
                    failure(errorConstants.SERVER)
                }
            }

            function success(ads) {
                commit('set_ads', ads)
                commit('set_loading', false)
            }

            function failure(message) {
                commit('set_loading', false)
                commit('set_error', true)
                commit('set_error_message', message)
            }
        }
    },
    getters: {
        LOGGED: state => state.logged,
        TOKEN: state => state.token,
        ADS: state => state.advertisements,
        LOADING: state => state.loading
    }
})



export default store