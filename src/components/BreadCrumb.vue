<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, key) in breadList" :key="key">
        <router-link :to="{path: item.path}">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: []
    };
  },
  computed: {
    breadcrumb() {
      return this.$route.meta.breadcrumb;
    }
  },
  created() {},
  watch: {
    $route: {
      handler(to, oldVal) {
        this.$emit("getRoute", to.name);
        this.breadList = [];
        for (const routeInfo of to.matched) {
          let obj = {
            path: routeInfo.path,
            name: this.getBreadList(routeInfo.name)
          };
          this.breadList.push(obj);
        }
      },
      immediate: true
    }
  },
  methods: {
    getBreadList(val) {
      let name = {};
      switch (val) {
        case "home":
          name = "首页";
          break;
        case "studentManage":
          name = "学生管理";
          break;
        case "approveManage":
          name = "审批管理";
          break;
        case "couponManage":
          name = "优惠券管理";
          break;
        case "businessManage":
          name = "商家管理";
          break;
        case "messageNotice":
          name = "消息通知";
          break;
        default:
          break;
      }
      return name;
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  height: 20px;
  line-height: 20px;
  background: #fff;
  display: flex;
  align-items: center;
}
</style>
