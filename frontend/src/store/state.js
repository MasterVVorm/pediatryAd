const state = {
    logged: false,
    loginIn: false,
    loading: false,
    ad_updating: {
        status: false,
        id: null
    },
    startingApp: true,
    token: null,
    error: false,
    error_message: '',
    advertisements: [],
    current_ad: null,
    updating: {
        title: false,
        description: false,
        image: false,
        video_url: false,
        product_url: false,
        index: false,
        time: false
    }
}

export default state