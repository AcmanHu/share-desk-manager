<template>
  <div class="content">
    <div class="wrap">
      <span class="title">共享书桌后台管理系统</span>
      <div class="avater">
        <el-dropdown @command="exit">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="重新登陆">重新登录</el-dropdown-item>
            <el-dropdown-item command="退出">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
  methods: {
    exit(e) {
      // console.log(e);

      localStorage.removeItem("token");
      this.$router.replace({ name: "login" });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  // background: #ccc;
  // box-shadow: 2px 2px 6px #ccc;
  font-weight: bold;
  display: flex;
  justify-content: center;
  justify-content: center;
  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    .title {
      font-size: 20px;
    }
    .avater {
      position: absolute;
      height: 100%;
      left: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
