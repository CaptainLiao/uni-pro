<script>
export default {
    mpType: 'app',

    onLaunch() {
        console.log('App Launch')
    },

    onShow() {
        console.log('App Show')
    },

    onHide() {
        console.log('App Hide')
    },

    onError(e) {
        console.error(e)
    }
}
</script>

<style lang="scss">
@import "./scss/flex.scss";
@import "./scss/fit.scss";
@import "./scss/a-ui/a-ui.scss";
</style>
