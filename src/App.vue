<template>
  <div id="app">
    <router-view />
    <!-- <baidu-map class="bm-view"
               :center="center"
               :zoom="zoom"
               @ready="handler"></baidu-map> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: '北京',
      zoom: 10
    }
  },
  methods: {
    handler({ BMap, map }) {}
  }
}
</script>

<style lang="less">
#app {
  .bm-view {
    width: 100%;
    height: 300px;
  }
}
</style>
