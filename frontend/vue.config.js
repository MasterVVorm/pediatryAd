module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/scss/colors.scss";
                    @import "@/scss/global.scss";
                    `
            }
        }
    }
}