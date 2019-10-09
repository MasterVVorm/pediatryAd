const mutations = {
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
}

export default mutations