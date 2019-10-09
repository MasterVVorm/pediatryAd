import axios from 'axios'
import storageConstants from '../constants/storage.constants.js'
import errorConstants from '../constants/error.constants.js'
import toastr from 'toastr'
import { validateStatus, successUpdating, failureUpdating } from '../utils/service.utils.js'

const adServicies = {
    getAllAds,
    getAd,
    createAd,
    deleteAd,
    updateActive,
    updateTitle,
    updateDescription,
    updateVideoUrl,
    updateProductUrl,
    updateIndex,
    updateImage,
    updateTime
}

async function getAllAds(commit, state) {
    commit('set_loading', true)
    try {
        const response = await axios.request({
            url: '/companies',
            params: {
                token: state.token
            }
        })
        const { status, data } = response
        if (validateStatus(status)) {
            data.ads.forEach(ad => {
                ad.images[0].url = axios.defaults.baseURL.replace('/api', '') + ad.images[0].url
            })
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

function createAd(formData) {

    return async(commit, router) => {
        commit('set_loading', true)
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/company',
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
            toastr.success('Рекламная компания создана')
            router.push('/')
        }

        function failure() {
            commit('set_loading', false)
            commit('set_error', true)
            commit('set_error_message', errorConstants.SMTH_WRONG)
            toastr.error(errorConstants.SMTH_WRONG)
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
                url: '/company',
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
            toastr.success('Рекламная компания удалена')
        }

        function failure() {
            commit('set_ad_updating', { status: false, id: null })
            commit('set_error', true)
            commit('set_error_message', errorConstants.SMTH_WRONG)
            toastr.error(errorConstants.SMTH_WRONG)

        }
    }
}

function getAd(id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    return async(commit, state) => {
        commit('set_loading', true)
        try {
            const response = await axios.request({
                method: 'GET',
                url: '/company',
                params: {
                    token: token,
                    id: id
                }
            })
            const { data, status } = response
            if (status >= 200 && status < 300) {
                const { ad } = data
                ad.images[0].url = axios.defaults.baseURL.replace('/api', '') + ad.images[0].url
                success(ad)
            } else {
                failure()
            }

        } catch (error) {
            try {
                const { response } = error
                switch (response.status) {
                    case 400:
                        failure(errorConstants.SMTH_WRONG)
                        break
                    case 401:
                        failure('Токен устарел')
                        break
                    case 404:
                        failure()
                        break
                    default:
                        failure()
                        break
                }

            } catch (error) {

            }
        }

        function success(ad) {
            commit('set_current_ad', ad)
            commit('set_loading', false)
        }

        function failure(message) {
            commit('set_loading', false)
            commit('set_error', true)
            commit('set_error_message', message)
            toastr.error(message)

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
            if (validateStatus(status)) {
                success()
            } else {
                failure()
            }

        } catch (error) {
            failure()
        }

        function success() {
            const updatedAd = state.advertisements.filter(ad => ad.id == id)[0]
            updatedAd.active = !updatedAd.active
            const newAds = state.advertisements.map(ad => ad.id == id ? updatedAd : ad)
            commit('set_ads', newAds)
            commit('set_ad_updating', { status: false, id: null })
            toastr.success('Статус активности рекламной компании обновлен')
        }

        function failure() {
            commit('set_ad_updating', { status: false, id: null })
            commit('set_error', true)
            commit('set_error_message', errorConstants.SMTH_WRONG)
        }
    }
}

function updateTitle(title, id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    const KEY = 'title'
    return async(commit, state) => {
        commit('set_updating', { key: 'title', status: true })
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_title',
                data: {
                    token: token,
                    id: id,
                    title: title
                }
            })
            const { status } = response
            if (validateStatus(status)) {
                successUpdating(KEY, title, 'Заголовок обновлен')(commit, state)
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating('Что-то пошло не так', KEY, commit)

            } catch (error) {
                failureUpdating('Что-то пошло не так', KEY, commit)
            }
        }
    }
}

function updateDescription(description, id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    const KEY = 'description'
    return async(commit, state) => {
        commit('set_updating', { key: KEY, status: true })
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_description',
                data: {
                    token: token,
                    id: id,
                    description: description
                }
            })
            const { status } = response
            if (validateStatus(status)) {
                successUpdating(KEY, description, 'Рекламное описание обновлено')(commit, state)
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating('Что-то пошло не так', KEY, commit)
            } catch (error) {
                failureUpdating(errorConstants.SERVER, KEY, commit)
            }
        }
    }
}

function updateVideoUrl(video_url, id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    const KEY = 'video_url'
    return async(commit, state) => {
        commit('set_updating', { key: KEY, status: true })
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_video',
                data: {
                    token: token,
                    id: id,
                    video_url: video_url
                }
            })
            const { status } = response
            if (validateStatus(status)) {
                successUpdating(KEY, video_url, 'Ссылка на видео обновлена')(commit, state)
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating(errorConstants.SMTH_WRONG, KEY, commit)
            } catch (error) {
                failureUpdating(errorConstants.SERVER, KEY, commit)
            }
        }
    }
}

function updateProductUrl(product_url, id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    const KEY = 'product_url'
    return async(commit, state) => {
        commit('set_updating', { key: KEY, status: true })
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_product',
                data: {
                    token: token,
                    id: id,
                    product_url: product_url
                }
            })
            const { status } = response
            if (validateStatus(status)) {
                successUpdating(KEY, product_url, 'Ссылка на рекламный продукт обновлена')(commit, state)
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating(errorConstants.SMTH_WRONG, KEY, commit)
            } catch (error) {
                failureUpdating(errorConstants.SERVER, KEY, commit)
            }
        }
    }
}

function updateIndex(index, id) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    const KEY = 'index'
    return async(commit, state) => {
        commit('set_updating', { key: KEY, status: true })
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_index',
                data: {
                    token: token,
                    id: id,
                    index: index
                }
            })
            const { status } = response
            if (validateStatus(status)) {
                successUpdating(KEY, index, 'Индекс рекламы обновлен')(commit, state)
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating(errorConstants.SMTH_WRONG, KEY, commit)
            } catch (error) {
                failureUpdating(errorConstants.SERVER, KEY, commit)
            }
        }
    }
}

function updateImage(formData) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))

    const KEY = 'image'
    return async(commit, state) => {
        commit('set_updating', { key: KEY, status: true })
        formData.append('token', token)
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_image',
                data: formData,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            const { status, data } = response
            if (validateStatus(status)) {
                successUpdating(KEY, data, 'Изображение обновлено')(commit, state)
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating(errorConstants.SMTH_WRONG, KEY, commit)
            } catch (error) {
                failureUpdating(errorConstants.SERVER, KEY, commit)
            }
        }
    }
}

function updateTime(time, id) {
    const { start_time, end_time } = time
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    const KEY = 'time'
    return async(commit, state) => {
        commit('set_updating', { key: KEY, status: true })
        try {
            const response = await axios.request({
                method: 'POST',
                url: '/update_times',
                data: {
                    token,
                    id,
                    start_time,
                    end_time
                }
            })
            const { status } = response
            if (validateStatus(status)) {
                success('Период активности компании обновлен')
            }
        } catch (error) {
            try {
                const { response } = error
                failureUpdating('Что-то пошло не так', KEY, commit)
            } catch (error) {
                failureUpdating(errorConstants.SERVER, KEY, commit)
            }
        }

        function success(message) {
            let newCurrentAd = state.current_ad
            newCurrentAd['start_time'] = start_time * 1000
            newCurrentAd['end_time'] = end_time * 1000
            commit('set_current_ad', newCurrentAd)
            commit('set_updating', { key: KEY, status: false })
            toastr.success(message)
        }
    }
}

export default adServicies