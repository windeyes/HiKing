
import {Message} from 'element-ui'
export const state = () => {
    return {
        userInfo: {
            user: {}
        }
    }

}
export const mutations = {
    setuserinfo(state, data) {
        state.userInfo = data
    }
}
export const actions={
    login(store,data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
<<<<<<< HEAD
          }).then(res=>{
            store.commit('setuserinfo',res.data)  
          })
    },
    getcaptcha(store,data){
        return this.$axios({
            url:'/captchas',
            method:'POST',
            data:{
                tel:data
            }
=======
        }).then(res=> {
            // this.$message.success('登录成功');
            // console.log(res.data)
            // console.log(this.$store.state.user.userInfo);
            // this.$router.push('/')
          //   this.$store.state
           store.commit('setuser', res.data)
           return res.data;
>>>>>>> 472b9b3bdaba03e7048815d944fd3a4e86b5ee5c
        })
    }
}