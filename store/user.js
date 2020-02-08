export const state =()=>{
    return {
        userInfo:'123'
    }
}
export const mutations={
    setuser(state,data){
        state.userInfo = data
    }
}
export const actions={
    login(store,data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        }).then(res=> {
            // this.$message.success('登录成功');
            // console.log(res.data)
            // console.log(this.$store.state.user.userInfo);
            // this.$router.push('/')
          //   this.$store.state
           store.commit('setuser', res.data)
           return res.data;
        })
    }
}