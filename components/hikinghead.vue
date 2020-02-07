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
              <nuxt-link to="/"  >首页</nuxt-link>
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
        <span>
          <nuxt-link to="#">登录/注册</nuxt-link>
        </span>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
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
    a{
      display: block;
      height: 60px;
      line-height: 60px;
      padding:0 20px;
      box-sizing: border-box;
      &:hover{
        border-bottom: 2px solid #409eff
      }
    }
    /*处于选中状态时*/
    .nuxt-link-exact-active{
      background-color: #409eff
    }

  }
  .message{
    font-size: 14px;
    a:hover{
      color:#409eff;
      text-decoration: underline;
    }
  }
} 
</style>