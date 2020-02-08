<template>
  <div class="formcontain">
    <el-form :model="user" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
       <el-button type="primary" @click="submitForm()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password:""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
      //登录操作
      submitForm(){
          this.$refs.ruleForm.validate((valid)=>{
              if(valid){
                  /* this.$axios({
                      url:'/accounts/login',
                      method:'POST',
                      data:this.user
                  }).then(res=> {
                      this.$message.success('登录成功');
                      this.$router.push('/')
                    //   this.$store.state
                     this.$store.commit('user/setuser', res.data)
                  }) */
                  this.$store.dispatch('user/login',this.user).then(()=>{
                      this.$message.success('登录成功');
                      this.$router.push('/')
                  })
              }else{
                  return false;
              }
          })
      }
  }
};
</script>

<style lang="less" scoped>
.formcontain {
    box-sizing: border-box;
    width: 400px;
    padding:20px 20px;
    .el-button{
        width: 100%;
    }
}
</style>