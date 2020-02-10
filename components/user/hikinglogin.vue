<template>
  <div class="inputcontainer">
    <el-form :model="user" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userlogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    userlogin() {
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('user/login',this.user).then(res=>{
              console.log(this.$store.state.user.userInfo)
              this.$message.success('登录成功')
              this.$router.push('/')
            })
           
          } else {
            console.log('略略类');
            return false;
          }
        })
    }

  }
};
</script>

<style lang="less" scoped>
.inputcontainer {
  padding-top: 20px;
  .el-button {
    width: 100%;
  }
}
</style>