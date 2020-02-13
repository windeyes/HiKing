<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <flightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <flightsItem
                    v-for="(item,index) in flights"
                    :key="index"
                    :data="item"/>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import flightsListHead from '@/components/air/flightsListHead'
import flightsItem from '@/components/air/flightsItem'

export default {
    data(){
        return {
            flights:[]
        }
    },
    components: {
       flightsListHead,flightsItem
    },
    mounted () {
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            // console.log(res);
            this.flights = res.data.flights.slice(0,12)
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>