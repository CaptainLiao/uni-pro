
<template>
<div :class="['a-text-14', {'fx-row': horizon}]">
  <div v-for="item in list" :key="item.id" 
      :class="['step', horizon ? 'is-horizon' : 'is-vertical']" 
      :style="stepStyle">
    <div :class="['step-seq']">
      <div :class="['step-line', {'checked': item.checked}]"></div>
      <div :class="['step-icon', {'checked': item.checked}]">{{item.id}}</div>
    </div>
    <div>
      <div class="step-title">{{item.title}}</div>
      <div class="step-desc a-text-12" v-if="item.desc">{{item.desc}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    horizon: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: () => [
        {id: 1, title: '第一步', desc: '第一步第一步第一步第一步', checked: true},
        {id: 2, title: '第二步', desc: '第二步', checked: false},
        {id: 3, title: '第三步', checked: false},
      ]
    }
  },

  computed: {
    stepStyle() {
      const width = 100 / this.list.length + '%';
      return this.horizon && `flex-basis: ${width}`
    }
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
@import "@/scss/a-ui/_vars.scss";

.step {
  &:last-child {
    .step-line  {
      border: none;
      background: transparent;
    }
  }
}

.is-horizon {
  text-align: center;
  .step-line {
    top: 50%;
    left: 50%;
    right: -50%;
    border: 1px solid $c-main-light;
    &.checked {
      border-color: $c-main;
    }
  }
  .step-icon {
    margin: 0 auto;
  }
}

.is-vertical {
  display: flex;
  
  .step-seq {
    top: 10upx;
    margin-right: 20upx;
  }

  .step-line {
    bottom: 0;
    left: 28upx;
    top: 0;

    width: 2px;
    background: #ccc;
    &.checked {
      background: $c-main;
    }
  }
}

.step-seq {
  position: relative;
  .step-line {
    position: absolute;
  }
}

.step-icon {
  position: relative;
  z-index: 1;
  width: 60upx;
  line-height: 60upx;

  text-align: center;
  border-radius: 100upx;
  background: #e9e9e9;
  &.checked {
    background: $c-main;
  }
}
.step-title {
  margin-top: 20upx;
}
.step-desc {
  margin-top: 4upx;
}
</style>