import toastr from 'toastr'

export const validateStatus = status => status >= 200 && status < 300

export const successUpdating = (key, payload, message) => {
    return (commit, state) => {
        let newCurrentAd = state.current_ad
        newCurrentAd[key] = payload
        commit('set_current_ad', newCurrentAd)
        commit('set_updating', { key: key, status: false })
        toastr.success(message)
    }
}

export const failureUpdating = (message, key, commit) => {
    commit('set_updating', { key: key, status: false })
    toastr.error(message)
}