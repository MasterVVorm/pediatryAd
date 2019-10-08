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
import toastr from 'toastr'
import urlConstants from './constants/url.constants'
import { async } from 'q'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? urlConstants.DEV : urlConstants.PROD;

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        logged: false,
        loginIn: false,
        loading: false,
        ad_updating: {
            status: false,
            id: null
        },
        startingApp: true,
        token: null,
        error: false,
        error_message: '',
        advertisements: [],
        current_ad: null,
        updating: {
            title: false,
            description: false,
            image: false,
            video_url: false,
            product_url: false,
            index: false,
            time: false
        }
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

        set_ad_updating(state, payload) {
            state.ad_updating = payload
        },
        set_ads(state, payload) {
            state.advertisements = payload
        },
        set_current_ad(state, payload) {
            state.current_ad = payload
        },
        set_updating(state, { key, status }) {
            state.updating[key] = status
        }
    },
    actions: {
        startApp: async({ commit, state }) => {
            userServicies.authUser(commit, state)
        },
        login: async({ commit, state }, user) => {
            userServicies.login(user)(commit, state)
        },
        get_advertisements: async({ commit, state }) => {
            adServicies.getAllAds(commit, state)
        },
        delete_ad: async({ commit, state }, id) => {
            adServicies.deleteAd(id)(commit, state)
        },
        create_ad: async({ commit, state }, formData) => {
            adServicies.createAd(formData)(commit, router)
        },
        update_active: async({ commit, state }, id) => {
            adServicies.updateActive(id)(commit, state)
        },
        get_ad: async({ commit, state }, id) => {
            adServicies.getAd(id)(commit, state)
        },
        update_title: async({ commit, state }, { id, payload }) => {
            adServicies.updateTitle(payload, id)(commit, state)
        },
        update_description: async({ commit, state }, { id, payload }) => {
            adServicies.updateDescription(payload, id)(commit, state)
        },
        update_video_url: async({ commit, state }, { id, payload }) => {
            adServicies.updateVideoUrl(payload, id)(commit, state)
        },
        update_product_url: async({ commit, state }, { id, payload }) => {
            adServicies.updateProductUrl(payload, id)(commit, state)
        },
        update_index: async({ commit, state }, { id, payload }) => {
            adServicies.updateIndex(payload, id)(commit, state)
        },
        update_image: async({ commit, state }, formData) => {
            adServicies.updateImage(formData)(commit, state)
        },
        update_time: async({ commit, state }, { id, time }) => {
            adServicies.updateTime(time, id)(commit, state)
        }
    },
    getters: {
        LOGGED: state => state.logged,
        LOGIN_IN: state => state.loginIn,
        TOKEN: state => state.token,
        LOADING: state => state.loading,
        AD_UPDATING: state => state.ad_updating,
        ADS: state => state.advertisements,
        CURRENT_AD: state => state.current_ad,
        UPDATING: state => state.updating

    }
})



export default store