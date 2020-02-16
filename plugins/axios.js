// 统一处理错误
import {Message} from 'element-ui'
export default data =>{
    data.$axios.onError(error=>{
        if(error.response.status === 400){
            Message.error(error.response.data.message)
        }
        if(error.response.status === 401 || error.response.status === 403){
            // 跳转到登录页
            console.log(123);
            
            data.redirect(200, "/user/login", {
                returnUrl: data.route.fullPath
            })
        }
    })
}
