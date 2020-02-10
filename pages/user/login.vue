<template>
  <div

    class="container"
    :style="`background:url(${bgimg}) center center no-repeat;
    background-size:contain contain;`"
    
  >
    <div class="logincontainer">
      <el-tabs type="border-card" @tab-click="titleClick" :stretch="true">
        <el-tab-pane label="登录">
          <userlogin/>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <register/>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import userlogin from '@/components/user/hikinglogin'
import register from '@/components/user/hikingRegister'
export default {
  data() {
    return {
      bgimg: "" 
    };
  },
  mounted() {
    //背景图片
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      this.bgimg = this.$axios.defaults.baseURL + res.data.data[0].url;
    });
  },
  methods: {
    titleClick(tab, event){
      console.log(tab.index)
    }
  },
  components: {
    // 用户登录
    userlogin,register

  }
};
</script>


<style lang="less" scoped>
/* 最外的容器 */
.container {
  height: 750px;
  width: 100%;
  min-width: 1000px;
  box-sizing: border-box;
    padding-top:200px;
  .logincontainer {
    width: 400px;
    margin:0 auto;
    /deep/.el-tabs__item{
      height: 50px;
      line-height: 50px;
      &:hover{
        color:#909399
      }
    }
    /deep/.is-active{
      color:orange;
      border-top:2px solid orange;
      &:hover{
        color:orange;
      }

    }
  }
}
</style>