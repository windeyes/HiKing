<template>
  <div class="inputcontainer">
    <el-form :model="user" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="captcha">
        <el-row type="flex">
          <el-input v-model="user.captcha" ref="captcha" placeholder=" 验证码"></el-input>
          <el-button class="captcha" @click="getcaptcha">验证码</el-button>
        </el-row>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="user.nickname" placeholder="请输入你的昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkpassword">
        <el-input type="password" v-model="user.checkpassword" placeholder="请在此输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="register" @click="goRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    //验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        let reg = /^1[3-9][0-9]{9}$/;
        if (!reg.test(this.user.username)) {
          callback(new Error("手机输入格式不正确"));
        }
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {
        username: "",
        nickname: "",
        captcha: "",
        checkpassword: "",
        password: ""
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: "blur" }
          //   { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatePass2, trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入您的昵称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取验证码
    getcaptcha() {
      this.$store.dispatch("user/getcaptcha", this.user.username).then(res => {
        this.$message.success("获得的验证码是" + res.data.code);
      });
    },
    //点击注册
    goRegister() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { checkpassword, ...userdata } = this.user;
          this.$axios({
            url: "/accounts/register",
            data: userdata,
            method: "POST"
          }).then(res => {
            // this.$message.success('注册成功')
            console.log(res);
            this.$store.commit('user/setuserinfo',res.data);
            this.$router.push('/')
          });
        }
      });
    }
  }
};
</script>

<style>
/* 注册按钮 */
.register {
  width: 100%;
}
.captcha {
  /* width: 112px; */
  flex: 0 0 120px;
  background-color: #f5f7fa;
}
.mybtn {
  width: 120px;
}
</style>