import axios from 'axios'
import storageConstants from '../constants/storage.constants.js'
import errorConstants from '../constants/error.constants.js'
const adServicies = {
    getAllAds,
    createAd,
    deleteAd
}

function getAllAds(token) {
    return axios.request({
        url: '/advertisements',
        params: {
            token: token
        }
    })
}

function createAd(formData) {
    console.log(formData)
    return async(commit, router) => {
        commit('set_loading', true)
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/advertisement',
                data: formData,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            const { status } = response
            if (status === 201) {
                success()
            } else {
                failure()
            }
        } catch (error) {
            failure()
        }

        function success() {
            commit('set_loading', false)
            router.push('/')
        }

        function failure() {
            commit('set_loading', false)
            commit('set_error', true)
            commit('set_error_message', errorConstants.SMTH_WRONG)
        }
    }
}

function deleteAd(id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    return async(commit, state) => {
        commit('set_ad_updating', { status: true, id: id })

        try {
            const response = await axios.request({
                method: 'DELETE',
                url: '/advertisement',
                data: {
                    token: token,
                    id: id
                }
            })
            const { status } = response
            if (status >= 200 && status < 300) {
                success()
            } else {
                failure()
            }

        } catch (error) {
            failure()
        }

        function success() {
            const newAds = state.advertisements.filter(ad => ad.id != id)
            commit('set_ads', newAds)
            commit('set_ad_updating', { status: false, id: null })
        }

        function failure() {
            commit('set_ad_updating', { status: false, id: null })
            commit('set_error', true)
            commit('set_error_message', errorConstants.SMTH_WRONG)
        }
    }
}

function updateActive(id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    return async(commit, state) => {
        commit('set_ad_updating', { status: true, id: id })

        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_active',
                data: {
                    token: token,
                    id: id
                }
            })
            const { status } = response
            if (status >= 200 && status < 300) {
                success()
            } else {
                failure()
            }

        } catch (error) {
            failure()
        }

        function success() {
            const updatedAd = state.advertisements.filter(ad => ad.id == id)
            updatedAd.active = !ad.active
            const newAds = state.advertisements.map(ad => ad.id == id ? updatedAd : ad)
            commit('set_ads', newAds)
            commit('set_ad_updating', { status: false, id: null })
        }

        function failure() {
            commit('set_ad_updating', { status: false, id: null })
            commit('set_error', true)
            commit('set_error_message', errorConstants.SMTH_WRONG)
        }
    }
}

function updateTitle() {

}

function updateDescription() {

}

function addImage() {

}

function deleteImage() {

}

function updateTimes() {

}

export default adServicies