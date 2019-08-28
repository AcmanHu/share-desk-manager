<template>
  <div class="login">
    <div class="page_container">
      <div class="header d_flex">
        <!-- <div class="font_head">img</div> -->
        <a href="#" class="header_logo"></a>
        <div class="ways">登录</div>
      </div>
      <div class="content_wrap">
        <div class="inner_left">
          <div class="box" v-if="changeLoginWay">
            <div class="head">
              <ul>
                <li
                  :class="[{active:isChooseIndex === key} ,'js-tab-password-login']"
                  v-for="(item, key) in loginWays"
                  :key="key"
                  @click="chooseWay(key)"
                >{{item}}</li>
                <!-- <li class="active js-tab-captcha-login">验证码登录</li> -->
              </ul>
              <div class="qrcode">
                <span class="tip">扫码登录</span>
                <img
                  src="//b.yzcdn.cn/wsc-pc-account/images/qrcode@2x.png"
                  @click="loginWayPassword"
                />
              </div>
            </div>
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
                        />
                      </div>
                    </div>
                  </div>
                  <div class="input_box">
                    <div class="inner_wrap">
                      <div class="input_wrap" v-if="isChooseIndex === 0">
                        <input
                          class="input_style input_password"
                          type="password"
                          placeholder="请输入密码"
                          v-model="password"
                        />
                        <i class="el-icon-view"></i>
                      </div>
                      <div class="input_wrap" v-else>
                        <input
                          class="input_style input_password"
                          type="password"
                          placeholder="填写6位短信验证码"
                        />
                        <span class="get_code">获取短信验证码</span>
                      </div>
                    </div>
                  </div>
                  <div class="actions_box">
                    <div class="auto_login">
                      <el-checkbox>三天内自动登录</el-checkbox>
                    </div>
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
                        <router-link :to="{name:'register'}">免费注册</router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="box" v-if="!changeLoginWay">
            <div class="head">
              <ul>
                <li class="active js-tab-password-login">扫码登录</li>
                <!-- <li class="active js-tab-captcha-login">验证码登录</li> -->
              </ul>
              <div class="qrcode js-tab-scan-code-login">
                <span class="tip">密码登录</span>
                <img src="https://b.yzcdn.cn/wsc-pc-account/images/pc@2x.png" @click="loginWayCode" />
              </div>
            </div>
            <div class="content">
              <div class="qrcode_content">
                <div class="qrcode_wrap">
                  <div class="qrcode_inner_box">
                    <div class="qrcode_box">
                      <div class="qrcode_box_img">
                        <img src />
                      </div>
                    </div>
                    <div class="info">
                      <div class="center_middle">
                        <div class="status">二维码已失效</div>
                        <el-button type="primary" size="small">点击刷新</el-button>
                      </div>
                    </div>
                  </div>

                  <div class="platform">
                    <h4>请使用以下App扫码登录更安全</h4>
                    <ul class="clearfix">
                      <li>
                        <img
                          src="//b.yzcdn.cn/public_files/2019/04/11/68045e9de244b89c96adae4871a26c0c.png"
                        />
                        <div class="download">
                          <h6>扫码下载</h6>
                          <img
                            src="//img.yzcdn.cn/public_files/2016/12/02/64f14f3b24ae96d6a8935ffc65054664.png"
                          />
                          <div class="tip">微商城手机客户端</div>
                        </div>
                      </li>
                      <li>
                        <img
                          src="//b.yzcdn.cn/public_files/2019/04/11/af1f40ace31934f879d62b148d44b7d9.png"
                        />
                        <div class="download">
                          <h6>扫码下载</h6>
                          <img src="//img.yzcdn.cn/retail/img/app/retail.png" />
                          <div class="tip">零售手机客户端</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="register">
                  <router-link :to="{name:'register'}">免费注册</router-link>
                  <!-- <a href>免费注册</a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inner_right">
          <div class="box_img">
            <!-- <img src="../assets/logo.jpg" /> -->
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: 'admin',
      password: '123456',
      isChooseIndex: 0,
      loginWays: ['密码登录', '验证码登录'],
      changeLoginWay: true
    }
  },
  methods: {
    chooseWay (key) {
      this.isChooseIndex = key
    },
    loginWayPassword () {
      this.changeLoginWay = false
    },
    loginWayCode () {
      this.changeLoginWay = true
    },
    login () {
      // this.$http({
      //   method: "POST",
      //   url: "/login",
      //   data: { username: "123", code: "456" },
      //   dataType: 'json',
      // }).then(res => {
      //   console.log(res);
      // });

      this.$http
        .post('/login', {
          username: this.username,
          code: this.password
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            localStorage.setItem('token', res.data.data)
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.$router.replace({ name: 'home' })
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error('网络错误，请稍后再试哦')
          console.log(err)
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
      .clear {
        clear: both;
      }
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
          height: 360px;
          // margin-top: 23px;
          img {
            width: 380px;
            height: 100%;
          }
        }
      }
    }
  }
}

// h1 {
//   font-size: 30px;
//   font-weight: 700;
//   text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
// }

// form {
//   position: relative;
//   width: 305px;
//   margin: 15px auto 0 auto;
//   text-align: center;
// }

// input {
//   width: 270px;
//   height: 42px;
//   line-height: 42px;
//   margin-top: 25px;
//   padding: 0 15px;
//   background: #2d2d2d; /* browsers that don't support rgba */
//   *background-color: transparent;
//   background: rgba(45, 45, 45, 0.15);
//   -moz-border-radius: 6px;
//   -webkit-border-radius: 6px;
//   border-radius: 6px;
//   border: 1px solid #3d3d3d; /* browsers that don't support rgba */
//   border: 1px solid rgba(255, 255, 255, 0.15);
//   -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
//   -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
//   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
//   font-family: "PT Sans", Helvetica, Arial, sans-serif;
//   font-size: 14px;
//   color: #fff;
//   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//   -o-transition: all 0.2s;
//   -moz-transition: all 0.2s;
//   -webkit-transition: all 0.2s;
//   -ms-transition: all 0.2s;
// }

// input:-moz-placeholder {
//   color: #fff;
// }
// input:-ms-input-placeholder {
//   color: #fff;
// }
// input::-webkit-input-placeholder {
//   color: #fff;
// }

// input:focus {
//   outline: none;
//   -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
// }

// button {
//   cursor: pointer;
//   width: 300px;
//   height: 44px;
//   margin-top: 25px;
//   padding: 0;
//   background: #ef4300;
//   -moz-border-radius: 6px;
//   -webkit-border-radius: 6px;
//   border-radius: 6px;
//   border: 0px;
//   -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   font-family: "PT Sans", Helvetica, Arial, sans-serif;
//   font-size: 14px;
//   font-weight: 700;
//   color: #fff;
//   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//   -o-transition: all 0.2s;
//   -moz-transition: all 0.2s;
//   -webkit-transition: all 0.2s;
//   -ms-transition: all 0.2s;
// }

// button:hover {
//   -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
// }

// button:active {
//   -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
//     0 2px 7px 0 rgba(0, 0, 0, 0.2);
//   box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1) inset,
//     0 1px 4px 0 rgba(0, 0, 0, 0.1);

//   border: 0px solid #ef4300;
// }

// .connect {
//   width: 800px;
//   margin: 50px auto 0 auto;
//   font-size: 14px;

//   text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
// }
// .connect p {
//   position: relative;
//   left: -140%;
//   top: 0;
// }
// .connect a {
//   display: inline-block;
//   width: 32px;
//   height: 35px;
//   margin-top: 15px;
//   -o-transition: all 0.2s;
//   -moz-transition: all 0.2s;
//   -webkit-transition: all 0.2s;
//   -ms-transition: all 0.2s;
// }
// .alert {
//   width: 310px;
//   height: 200px;
//   background: #000;
//   position: absolute;
//   top: -40%;
//   left: 50%;
//   margin: -101px 0 0 -151px;
// }
// .alert h2 {
//   height: 40px;
//   padding-left: 8px;
//   font-size: 14px;
//   background: #ff0543;
//   text-align: left;
//   line-height: 40px;
// }
// .alert .alert_con {
//   background: #fff;
//   height: 160px;
// }
// .alert .alert_con p {
//   color: #000;
//   line-height: 90px;
// }
// .alert .alert_con .btn {
//   padding: 3px 10px;
//   color: #fff;
//   cursor: pointer;
//   background: #72d1ff;
//   border: 1px solid #72d1ff;
//   border-radius: 4px;
// }
// .alert .alert_con .btn:hover {
//   background: #4fb2ef;
//   border: 1px solid #4fb2ef;
//   border-radius: 4px;
// }
</style>

<style lang="scss" scoped>
.login {
  .page_container {
    .content_wrap {
      .inner_left {
        .box {
          .content {
            .qrcode_content {
              text-align: center;
              .qrcode_wrap {
                margin-top: 10px;
                .qrcode_inner_box {
                  width: 152px;
                  height: 152px;
                  margin: 0 auto;
                  position: relative;
                  .qrcode_box {
                    overflow: hidden;
                    .qrcode_box_img {
                      width: 152px;
                      height: 152px;
                      img {
                        display: block;
                        width: 130px;
                        height: 130px;
                        padding: 10px;
                        border: 1px solid #e5e5e5;
                        margin: 0 auto;
                      }
                    }
                  }
                  .info {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    display: table;
                    background: hsla(0, 0%, 100%, 0.9);
                    .center_middle {
                      display: table-cell;
                      vertical-align: middle;
                      text-align: center;
                      .status {
                        margin-bottom: 15px;
                      }
                    }
                  }
                }
                .platform {
                  h4 {
                    font-size: 14px;
                    color: #999;
                    line-height: 20px;
                    margin: 20px 0 10px;
                    font-weight: 400;
                  }
                  .clearfix:after {
                    display: block;
                    content: " ";
                    clear: both;
                  }
                  ul {
                    margin: 0 auto;
                    width: 100px;
                    height: 24px;
                    li {
                      float: left;
                      margin-right: 24px;
                      position: relative;
                      img {
                        display: block;
                        width: 24px;
                        height: 24px;
                      }
                      .download {
                        display: none;
                        text-align: center;
                        width: 160px;
                        height: 174px;
                        position: absolute;
                        bottom: 100%;
                        margin-bottom: 10px;
                        box-sizing: border-box;
                        padding: 20px 30px;
                        background: #fff;
                        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
                        border-radius: 2px;
                        margin-left: -5px;
                        font-size: 12px;
                        line-height: 17px;
                        &::before {
                          content: " ";
                          display: block;
                          position: absolute;
                          bottom: -4px;
                          left: 14px;
                          width: 8px;
                          height: 8px;
                          background: #fff;
                          box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.3);
                          transform: rotate(45deg);
                          z-index: 1;
                        }
                        &::after {
                          content: " ";
                          display: block;
                          position: absolute;
                          bottom: 0;
                          left: 8px;
                          width: 19px;
                          height: 8px;
                          background: #fff;
                          z-index: 2;
                        }
                      }
                    }
                  }
                }
              }
              .register {
                text-align: right;
                font-size: 12px;
                a {
                  color: #38f;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
