import axios from 'axios'

const adServicies = {
    getAllAds,
}

function getAllAds(token) {
    return axios.request({
        url: '/advertisements',
        params: {
            token: token
        }
    })
}

function createAd() {

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