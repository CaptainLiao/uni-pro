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

@media (min-width: 800px) {
    html {
        background: #eee;
    }
    body {
        margin: 0 auto;
        width: 800px;
        transform: translate(0, 0);
        overflow: hidden;
    }
    #app {
        overflow: auto;
    }
}

@media (-webkit-max-device-pixel-ratio: 1) {
     ::-webkit-scrollbar {
        width: 4px;
        height: 8px;
    }
     ::-webkit-scrollbar-track-piece {
        background-color: #fff;
    }
     ::-webkit-scrollbar-thumb {
        background-color: #c2c2c2;
        min-height: 28px;
    }
     ::-webkit-scrollbar-thumb:hover {
        background-color: #a0a0a0;
    }
}
</style>
