<template>
  <div id="app" :style="{height: fullHeight + 'px'}">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  },
  mounted () {
    this.getWindow()
  },
  methods: {
    getWindow () {
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          this.fullHeight = window.fullHeight
        })()
      }
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #333;
}

ul li {
  list-style: none;
}
/* 常规通用样式 */

.d_flex {
  display: flex;
  align-items: center;
}
.d_flex_spbet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
//
.m-content {
  height: 100%;
  .m-wrap {
    height: calc(100% - 40px);
    .search_box {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .search_input {
        width: 200px;
      }
    }
    .table_box {
      height: calc(100% - 40px);
    }
  }
  .m_footer_page {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
