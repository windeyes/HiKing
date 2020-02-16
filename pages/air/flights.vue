<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
            <flightsFilters :data="data" @getdata="getdata"/>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside" >
        <!-- 侧边栏组件 -->
        <flightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead";
import flightsItem from "@/components/air/flightsItem";
import flightsFilters from "@/components/air/flightsFilters";
import flightsAside from "@/components/air/flightsAside"
export default {
  data() {
    return {
      flights: [],
      currentPage:1,
      pageSize:5,
      total:0,
      data:{
        flights:[],
        options:{}
      }
    };
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
    flightsAside
  },
  mounted() {
    this.getpagelist()
  },
  methods: {
    handleSizeChange(value){
        this.pageSize = value
    },
    handleCurrentChange(value){
        this.currentPage = value
    },
    getdata(arr)    {
      this.total = arr.length
      this.flights = arr
    },
    //请求页面数据
    getpagelist(){

        this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flights = res.data.flights;
        this.total = res.data.total
        this.data = {...res.data}
      })

    }
  },
//   1        0-5      （页码-1）*每页条数 页码*每页条数
//   2        5-10
//   3        10-15
    computed: {
        dataList(){
            let start = (this.currentPage - 1)*this.pageSize
            let end = this.currentPage*this.pageSize
            let arr = this.flights.slice(start,end)
            return arr
        }
    },
    // watch: {
    //   // $route(){
    //   //   this.currentPage = 1;
    //   //   this.getpagelist()
    //   // }
      
    // }
    beforeRouteUpdate (to, from, next) {
        // 每次url变化时候把pageIndex初始化为1
        this.pageIndex = 1;
        next();
        // 请求机票列表数据
        this.getpagelist();
        
    },	    
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>