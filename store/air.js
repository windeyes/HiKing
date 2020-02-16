export const state = () => {
    return {
        // 历史查询数组
        history: [],
        orderdetail:{
            seat_infos: {}
        },
        allprice:0
    }
}

export const mutations = {
    // 把传入的表单数据存储在history
    setHistory(state, data){
        state.history.push(data);
    },
    setOrderdetail(state,data){
        state.orderdetail = data
    },
    setallprice(state,data){
        state.allprice = data
    }
} 