import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexChromePlugin from 'vuex-chrome-plugin'
import userServicies from '../servicies/user.servicies.js'
import adServicies from '../servicies/advertisement.sericies.js'
import router from '../router'
import urlConstants from '../constants/url.constants'
import actions from './actions'
import state from './state'
import mutations from './mutations'
import getters from './getters'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? urlConstants.DEV : urlConstants.PROD;

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store