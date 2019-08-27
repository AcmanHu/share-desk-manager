<template>
  <div class="home pb_height">
    <el-container class="ele_container pb_height">
      <el-aside width="200px" class="ele_aside pb_height">
        <div class="logo_box">
          <img src="../assets/logo.jpg" alt />
        </div>
        <el-menu
          :default-active="navActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <router-link :to="{name:item.path}" tag="li" v-for="(item, key) in navList" :key="key">
            <el-menu-item :index="key+''">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="box-shadow: 2px 2px 6px #ccc;">
          <myHead></myHead>
        </el-header>
        <el-main class="ele_main" style="height: 100%;">
          <div class="m_main">
            <bread-crumb @getRoute="getRoute"></bread-crumb>
            <div class="m_main_content">
              <router-view />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myHead from '@/components/head'
export default {
  components: {
    myHead
  },
  data () {
    return {
      navActive: '',
      navList: [
        {
          path: 'studentManage',
          name: '学生管理',
          icon: 'el-icon-user'
        },
        {
          path: 'approveManage',
          name: '审批管理',
          icon: 'el-icon-edit-outline'
        },
        {
          path: 'couponManage',
          name: '优惠券管理',
          icon: 'el-icon-notebook-1'
        },
        {
          path: 'businessManage',
          name: '商家管理',
          icon: 'el-icon-thumb'
        },
        {
          path: 'messageNotice',
          name: '消息通知',
          icon: 'el-icon-chat-dot-round'
        },
        {
          path: 'orderManage',
          name: '订单管理',
          icon: 'el-icon-edit-outline'
        }
      ]
    }
  },
  methods: {
    getRoute (e) {
      this.navList.forEach((item, index) => {
        if (item.path === e) {
          this.navActive = index.toString()
        }
        if (e === 'home') {
          this.navActive = '0'
        }
      })
      // console.log(this.navActive)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.pb_height {
  height: 100%;
}
.home {
  .logo_box {
    height: 130px;
    width: 100%;
    background: #ccc;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .ele_container {
    .ele_aside {
      ul {
        height: calc(100% - 130px);
      }
    }
  }
  .m_main {
    height: 100%;
    .m_main_content {
      height: calc(100% - 20px);
    }
  }
}
</style>
