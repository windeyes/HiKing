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
          }).then(res=>{
            store.commit('setuserinfo',res.data)  
          })
    }
}