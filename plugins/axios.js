// 统一处理错误
import {Message} from 'element-ui'
export default data =>{
    data.$axios.onError(error=>{
        if(error.response.status === 400){
            Message.error(error.response.data.message)
        }
    })
}
