<template>
  <div class="content">
    <span class="title">后台管理系统</span>
    <div class="avater">
      <el-dropdown>
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>重新登录</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  computed: {},
  created() {},

  methods: {}
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  // background: #ccc;
  box-shadow: 2px 2px 6px #ccc;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .title {
    font-size: 18px;
  }
  .avater {
    position: absolute;
    height: 100%;
    right: 10px;
    display: flex;
    align-items: center;
  }
}
</style>
