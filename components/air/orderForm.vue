<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in form.user" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.name">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <!-- 渲染保险数据 -->
        <div class="insurance-item" v-for="(item,index) in infodata.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="insuranceId(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span>{{allprice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 乘机人信息
      form: {
        user: [
          {
            name: "",
            id: ""
          }
        ],
        insurances: [],
        contactName: "",
        captcha:'',
        contactPhone: "",
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },
      //机票的详细信息
      infodata:{
      }
    };
  },
  computed: {
    allprice(){
      if(!this.infodata.seat_infos){
        return
      }
      // 总价
      let allprice = 0
      // 算一个人的单价
      // 机票
      allprice += this.infodata.seat_infos.par_price
      // 保险 insurances.par_price
      this.infodata.insurances.forEach(item=>{
        //是否有购买保险
        let valid = this.form.insurances.indexOf(item.id)
        if(valid != -1){
          allprice += item.price
        }
      })
      //计算总价
      allprice *= this.form.user.length; 
      this.$store.commit('air/setallprice',allprice)
      return ""
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: `/airs/${id}`,
      method: "get",
      params: {
        seat_xid: seat_xid
      }
    }).then(res => {
      this.infodata = res.data
      console.log(this.infodata);
      this.$store.commit('air/setOrderdetail',this.infodata)
      
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
        this.form.user.push({
            username:'',
            id:''
        })
    },

    // 移除乘机人
    handleDeleteUser(index) {
        this.form.user.splice(index,1)
    },

    // 发送手机验证码
    handleSendCaptcha() {
        if(!this.form.contactPhone){
            this.$message.error("手机号不能为空")
            return; 
        }
        this.$store.dispatch('user/getcaptcha',this.form.contactPhone)
        .then(res=>{
                this.$message.success('验证码是：000000')
        })
    },

    // 提交订单
    handleSubmit() {
        // 自定义表单规则
        const rules={
            user: {
                errmsg:'乘坐人信息不能为空',
                validator:()=>{
                    let valid  = true
                    this.form.user.forEach(v=>{
                        if(!v.name || !v.id){
                            valid = false
                        }
                    })
                    return valid
                }
            },
            contactName:{
                errmsg:'联系人不能为空',
                validator:()=>{
                    return !!this.form.contactName
                }
            },
            captcha:{
                errmsg:'验证码不能为空',
                validator:()=>{
                    return !!this.form.captcha
                }
            }

        }
        
        // 利用排他实现验证
        let valid = true
        //循环调用所有rules
        Object.keys(rules).forEach(v=>{
            //若有字段不通过，则不执行接下来的代码
            if(!valid) return
            console.log(valid);
            const item = rules[v];
            valid = item.validator()
            if(!valid){
                    this.$message.error(item.errmsg);
                }
        })
        //若未通过则直接返回
         if(!valid) return;
         console.log(this.form)
         this.$axios({
           url:'/airorders',
           method:'POST',
           data:this.form,
           headers:{
             //设置请求头
             Authorization: `Bearer ` + this.$store.state.user.userInfo.token
           }
         }).then(res=>{
           console.log(res);
           
         })

    },
    // 获取所选的保险id
    insuranceId(id){
        let index= this.form.insurances.indexOf(id)
        // 如果已经有了这个id，说明当前是取消的状态
        if(index != -1){
            this.form.insurances.splice(index,1)
        }else{
             this.form.insurances.push(id)
        }

    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>