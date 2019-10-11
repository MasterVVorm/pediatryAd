import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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