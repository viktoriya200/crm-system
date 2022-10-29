module.exports = {
    publicPath: '/crm-system/',
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/common.scss";`,
            },
        },
    },
}
