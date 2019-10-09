import axios from 'axios'
import storageConstants from '../constants/storage.constants'
import errorConstants from '../constants/error.constants'
import router from '../router'
import toastr from 'toastr'
import { validateStatus } from '../utils/service.utils'

const userServicies = {
    login,
    logout,
    authUser
}

function login(user) {
    const { login, password } = user
    return async(commit) => {
        commit('set_login_in', true)
        try {
            let response = await axios.post('/login', { login, password }, { headers: { 'Content-type': 'application/json' } })

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
                        failure(errorConstants.WRONG_LOGIN_OR_PASSWORD)
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
            router.push('/')
        }

        function failure(message) {
            commit('set_login_in', false)
            toastr.error(message)
        }
    }
}

async function logout(commit, router) {
    commit('set_logged', false)
    localStorage.removeItem(storageConstants.TOKEN)
    router.push('/login')
}

async function authUser(commit) {
    const token = JSON.parse(localStorage.getItem(storageConstants.TOKEN))
    if (token) {
        try {
            const response = await axios.request({
                url: '/validate_token',
                method: 'POST',
                data: {
                    token: token
                },
                timeout: 10000
            })
            const { status, data } = response
            if (validateStatus(status)) {
                success(data.token)
            }
        } catch (error) {
            try {
                const { response } = error
                const { status } = response

                switch (status) {
                    case 404 || 400:
                        failure(storageConstants.TOKEN);
                        break;
                    case 500:
                        serverError();
                        break;
                    default:
                        serverError();
                }
                failure(errorConstants.WRONG_LOGIN_OR_PASSWORD)
            } catch (e) {
                serverError()
            }
        }
    } else {
        router.push('/login')
        commit('set_starting_app', false)
    }

    function success(token) {
        commit('set_token', token)
        commit('set_logged', true)
        commit('set_starting_app', false)
        localStorage.setItem(storageConstants.TOKEN, JSON.stringify(token))
        const href = window.location.href;
        if (href.includes('login') || href.includes('/server_error')) {
            router.push('/')
        }
    }

    function failure() {
        commit('set_starting_app', false)
        localStorage.removeItem(storageConstants.TOKEN)
        router.push('/login')
    }

    function serverError() {
        commit('set_starting_app', false)
        router.push('/server_error')
    }
}

export default userServicies