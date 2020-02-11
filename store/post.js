
export const actions={
    getPlace(store,data){
        return this.$axios({
            url:'/airs/city',
            params:{
                // name:this.userdata.departCity
                name:data
            }
        }).then(res=>{
            // this.departCity = res.data
            
             res.data.data.map(item=>{
                item.value = item.name.replace('市',"") 
            })
            return res.data.data
        })
    }
}