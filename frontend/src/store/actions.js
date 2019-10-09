import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexChromePlugin from 'vuex-chrome-plugin'
import userServicies from '../servicies/user.servicies.js'
import adServicies from '../servicies/advertisement.sericies.js'
import router from '../router'
import urlConstants from '../constants/url.constants'

const actions = {
    startApp: async({ commit, state }) => {
        userServicies.authUser(commit, state)
    },
    login: async({ commit, state }, user) => {
        userServicies.login(user)(commit, state)
    },
    logout: async({ commit }) => {
        userServicies.logout(commit, router)
    },
    get_advertisements: async({ commit, state }) => {
        adServicies.getAllAds(commit, state)
    },
    delete_ad: async({ commit, state }, id) => {
        adServicies.deleteAd(id)(commit, state)
    },
    create_ad: async({ commit }, formData) => {
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
}
export default actions