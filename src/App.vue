<script>
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style lang="scss">
  @import "./scss/flex.scss";
  @import "./scss/fit.scss";
  @import "./scss/a-ui/a-ui.scss";
</style>
