import axios from 'axios'

const userServicies = {
    login,
    validateToken
}

function login(user) {
    const { login, password } = user
    return axios.post('/login', { login, password }, { headers: { 'Content-type': 'application/json' } })
}

function validateToken(token) {
    return axios.request({
        url: '/validate_token',
        method: 'POST',
        data: {
            token: token
        }
    })
}

export default userServicies