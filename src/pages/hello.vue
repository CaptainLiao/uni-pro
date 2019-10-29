<!--  -->
<template>
  <div class="box">hello world</div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  onLoad() {
    console.log(this.$route.params)
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
@import "@/scss/a-ui/_vars.scss";

.box {
  width: 12*$px;
  height: 12*$px;
  background: #ccc;
}
</style>