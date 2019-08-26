<template>
  <div class="login">
    <div class="page_container">
      <div class="header d_flex">
        <!-- <div class="font_head">img</div> -->
        <a href="#" class="header_logo"></a>
        <div class="ways">免费注册</div>
      </div>
      <div class="content_wrap">
        <div class="inner_left">
          <div class="box">
            <div class="content">
              <div class="login_wrap">
                <form action method="post">
                  <div class="input_box">
                    <div class="inner_wrap">
                      <div class="input_wrap">
                        <div class="select">中国+86</div>
                        <input
                          class="input_style input_phone"
                          v-model="username"
                          type="text"
                          placeholder="注册时填写的手机号"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="input_box">
                    <div class="inner_wrap">
                      <div class="input_wrap">
                        <input
                          class="input_style input_password"
                          type="password"
                          placeholder="填写6位短信验证码"
                        >
                        <span class="get_code">获取短信验证码</span>
                      </div>
                    </div>
                  </div>
                  <div class="input_box">
                    <div class="inner_wrap">
                      <div class="input_wrap">
                        <input
                          class="input_style input_password"
                          type="password"
                          placeholder="8-20位字符，包含字母和数字"
                          v-model="password"
                        >
                        <i class="el-icon-view"></i>
                      </div>
                    </div>
                  </div>
                  <div class="input_box">
                    <div class="inner_wrap">
                      <div class="input_wrap">
                        <input
                          class="input_style input_password"
                          type="password"
                          placeholder="请再次输入密码"
                          v-model="password"
                        >
                        <i class="el-icon-view"></i>
                      </div>
                    </div>
                  </div>
                  <div class="actions_box">
                    <div class="btn_group">
                      <el-button type="primary" @click="login">登录</el-button>
                    </div>
                    <div class="extra_group d_flex_spbet">
                      <el-checkbox class="check">
                        已经阅读并同意
                        <a href>《用户使用协议》</a>
                      </el-checkbox>
                      <div class="pull_right">
                        <a href class="forget_pass">忘记密码</a>
                        <router-link :to="{name:'register'}">
                          免费注册
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="inner_right">
          <div class="box_img">
            <img src="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let that = this
      if (!that.username) {
        this.$message.error('请输入账户名！')
        return
      } else if (!that.password) {
        this.$message.error('请输入密码！')
        return
      }
      this.$axios
        .post(this.GVER.BasicPort + '/api/Authorize/Token', {
          User: that.username,
          Password: that.password,
          Role: 'System',
          Type: 1
        })
        .then(function (data) {
          if (data.StatusCode === 1) {
            that.$message({
              message: '登录成功',
              type: 'success'
            })
            sessionStorage.setItem('token', data.Value.Token)
            sessionStorage.setItem('loginTime', new Date())
            if (data.Value.OperationShop) {
              sessionStorage.setItem(
                'shopInfo',
                JSON.stringify(data.Value.OperationShop)
              )
              that.$store.commit('setshopInfo', data.Value.OperationShop)
            } else {
              console.error('没有获取到店铺信息')
              return false
            }
            that.$router.replace({ name: 'mainFrame' })
          } else if (data.StatusCode === 0) {
            that.$message.error(data.Value)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background: white;
  text-align: left;
  .page_container {
    width: 900px;
    margin: 0 auto;
    position: relative;
    .header {
      border-bottom: 1px solid #e5e5e5;
      padding: 50px 0 21px;
      height: 24px;
      .header_logo {
        float: left;
        width: 100px;
        height: 60px;
        position: relative;
        background: url(../assets/logo1.png) no-repeat;
        background-size: 100%;
      }
      .font_head {
        font-size: 16px;
        font-weight: bold;
        width: 70px;
      }
      .ways {
        font-size: 16px;
        color: #333;
        margin-left: 10px;
        padding-left: 10px;
        border-left: 1px solid #e8e8e8;
      }
    }
    .content_wrap {
      padding-top: 40px;
      .inner_left {
        width: 500px;
        float: left;
        .box {
          width: 410px;
          min-height: 360px;
          background: #fff;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
          margin: 2px 20px;
          box-sizing: border-box;
          padding: 15px;
          .head {
            position: relative;
            ul {
              overflow: hidden;
              .active {
                color: #333;
                font-weight: 700;
                cursor: default;
              }
              li {
                float: left;
                font-size: 18px;
                line-height: 20px;
                color: #999;
                margin-top: 15px;
                padding: 0 15px;
                position: relative;
                cursor: pointer;
              }
            }
            .qrcode {
              width: 40px;
              height: 40px;
              position: absolute;
              right: 0;
              top: 0;
              .tip {
                display: inline-block;
                background-color: rgba(51, 136, 255, 0.13);
                color: #38f;
                border: 1px solid #38f;
                padding: 5px 8px;
                white-space: nowrap;
                position: absolute;
                right: 100%;
                top: 0;
                margin-right: 6px;
                &::after,
                &::before {
                  content: " ";
                  display: block;
                  position: absolute;
                  left: 100%;
                  top: 50%;
                  margin-top: -6px;
                }

                &::before {
                  border: 6px solid transparent;
                  border-left-color: #38f;
                  z-index: 1;
                }
                &::after {
                  border: 6px solid transparent;
                  border-left-color: #e5f0ff;
                  transform: translateX(0.5px);
                  margin-left: -2px;
                  z-index: 2;
                }
              }
              img {
                display: block;
                width: 100%;
                height: 100%;
                cursor: pointer;
              }
            }
          }
          .content {
            padding: 20px 15px 0;
            .login_wrap {
              width: 350px;
              font-size: 14px;
              color: #333;
              .input_box {
                padding-top: 18px;
                height: 35px;
                border-bottom: 1px solid #e5e5e5;
                margin-bottom: 1px;
                .inner_wrap {
                  width: 100%;
                  .input_wrap {
                    display: flex;
                    align-items: center;
                    position: relative;
                    height: 30px;
                    max-height: 36px;
                    .get_code {
                      color: #38f;
                    }
                    i {
                      font-size: 20px;
                      color: #ccc;
                    }
                    .select {
                      min-width: 90px;
                      width: 90px;
                    }
                    .input_style {
                      flex: 1;
                      height: 100%;
                      color: #333;
                      outline: none;
                      background: none;
                      // background-color: rgba(0,0,0,0);
                      border: 0;
                      box-shadow: none;
                      &:-webkit-autofill {
                        -webkit-animation: autofill-fix 1s infinite;
                        -webkit-text-fill-color: #333;
                      }
                      @-webkit-keyframes autofill-fix {
                        from {
                          background-color: transparent;
                        }
                        to {
                          background-color: transparent;
                        }
                      }
                    }
                    .input_phone {
                    }
                  }
                }
              }
              input[type="text"]:focus,
              input[type="password"]:focus .input_box {
                border: 2px solid #f00;
              }
              .actions_box {
                .auto_login {
                  padding-top: 26px;
                  height: 35px;
                }
                .btn_group {
                  width: 100%;
                  button {
                    width: 100%;
                    color: #fff;
                    height: 45px;
                    background: #38f;
                    border-color: #38f;
                    border-radius: 2px;
                  }
                }
                .extra_group {
                  padding-top: 20px;
                  font-size: 12px;
                  color: #666;
                  a {
                    color: #38f;
                  }
                  /deep/ .el-checkbox__label {
                    font-size: 12px;
                  }
                  .check {
                    font-size: 12px;
                  }
                  .pull_right {
                    font-size: 12px;
                    .forget_pass {
                      padding-right: 5px;
                      margin-right: 5px;
                      border-right: 1px solid #e5e5e5;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .inner_right {
        width: 400px;
        float: left;
        .box_img {
          text-align: center;
          margin-top: 23px;
          img {
            width: 380px;
          }
        }
      }
    }
  }
}
</style>
