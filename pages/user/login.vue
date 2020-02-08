<template>
  <div
    class="contain"
    :style="`background:url(${bgimgurl}) center center no-repeat;
      background-size:contain contain
  `"
  >
    <div class="logincard">
      <div class="up clearfix">
        <span
          v-for="(item,index) in ['登录','注册']"
          :key="index"
          :class="{active:index === currentchoice}"
          @click="clickCard(index)"
        >{{item}}</span>
      </div>
      <!-- <div class="down"></div> -->
      <Userlogin v-if="currentchoice === 0"/>
    </div>
  </div>
</template>

<script>
import Userlogin from "@/components/user/Userlogin";
export default {
  data() {
    return {
      bgimgurl: "",
      currentchoice: 0
    };
  },
  mounted() {
    //背景图
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      this.bgimgurl = this.$axios.defaults.baseURL + res.data.data[0].url;
    });
  },
  methods: {
    clickCard(index) {
      this.currentchoice = index;
    }
  },
  components: {
    Userlogin
  }
};
</script>

<style lang="less" scopedd>
.contain {
  height: 700px;
  width: 100%;
  min-width: 1000px;
  padding-top: 300px;
  box-sizing: border-box;
  .logincard {
    width: 400px;
    margin: 0 auto;
    background-color: #fff;
  }
  .up {
    span {
      display: block;
      float: left;
      width: 200px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #ccc;
      color: #666;
    }
    .active {
      color: orange;
      border-top: 2px solid orange;
      background-color: #fff;
    }
  }
}
</style>