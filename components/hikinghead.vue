<template>
  <div class="hikinghead">
    <el-row type="flex" justify="space-around">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <div class="ul">
        <ul>
          <el-row type="flex">
            <li class="active">
              <nuxt-link to="/">首页</nuxt-link>
            </li>
            <li>
              <nuxt-link to="post">旅游攻略</nuxt-link>
            </li>
            <li>
              <nuxt-link to="hotel">酒店</nuxt-link>
            </li>
            <li>
              <nuxt-link to="air">国内机票</nuxt-link>
            </li>
          </el-row>
        </ul>
      </div>
      <div class="message">
        <span>消息</span>
        <nuxt-link to="#" v-if="this.$store.state.user.userInfo.token">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img
                :src="this.$axios.defaults.baseURL+this.$store.state.user.userInfo.user.defaultAvatar"
                alt="tup"
              />
              {{this.$store.state.user.userInfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="self">个人中心</el-dropdown-item>
              <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </nuxt-link>

        <span v-else>
          <nuxt-link to="/user/login">登录/注册</nuxt-link>

        </span>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      if (command === "signout") {
        this.$store.commit('user/setuserinfo',"")
        this.$message.success('已退出登录');
        this.$router.push('/');
        console.log(123); 
        console.log(123)
      }
    }
  }
};
</script>

<style scoped lang="less">
.hikinghead {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  line-height: 60px;
  font-size: 16px;
  .logo {
    margin-right: 20px;
    img {
      width: 156px;
      vertical-align: middle; 
    }
  }
  .ul {
    flex: 1;
    a {
      display: block;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      box-sizing: border-box;
      &:hover {
        border-bottom: 2px solid #409eff;
      }
    }
    /*处于选中状态时*/
    .nuxt-link-exact-active {
      background-color: #409eff;
    }
  }
  .message {
    font-size: 14px;
    > span {
      margin-left: 20px;
    }

    a:hover {
      color: #409eff;
      text-decoration: underline;
    }
    a {
      /*头像 */
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        vertical-align: middle;
        margin-left: 20px;
        box-sizing: border-box;
        &:hover {
          border: 2px solid #409eff;
        }
      }
    }
  }
}
</style>