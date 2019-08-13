<template>
  <div id="app" :style="{height: fullHeight + 'px'}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      fullHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    this.getWindow()
  },
  methods: {
    getWindow() {
      window.onresize = () => {
        console.log("宽度发生变化了")
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          this.fullHeight = window.fullHeight;
          console.log(fullHeight)
        })();
      };
    }
  }
};
</script>

<style>
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
</style>
