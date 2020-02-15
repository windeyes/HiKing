<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{this.$route.query.departCity}} - {{this.$route.query.destCity}}
        /
        {{this.$route.query.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>
     {{filter}}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    filter() {
      // console.log(this.data)
      let arr = this.data.flights.filter((item, index) => {
        let valid = true;
        //若机场名非选定
        if (this.airport && this.airport != item.org_airport_name) {
          valid = false;
        }
        //若公司名非选定
        if (this.company && this.company != item.airline_name) {
          valid = false;
        }
        if(this.airSize && this.airSize !=  item.plane_size){
            valid = false
        }
        // 符合条件;
        // 条件
        // this.flightTimes.split(",")[0]  this.flightTimes.split(",")[1]
        //this.flightTimes.split(",")[0] < +dep_time.split(":")[0] <..[1]
        //+dep_time.split(":")[0]  出发的小时
        if (this.flightTimes) {
          
          if (
            item.dep_time.split(":")[0] < this.flightTimes.split(",")[0] ||
            item.dep_time.split(":")[0] >= this.flightTimes.split(",")[1]
          ) {
            console.log( item.dep_time)
            valid = false;
          }
        }
        return valid;
      });
      this.$emit("getdata", arr);
    //   console.log(this.data.flights.filter((item,index)=>{
    //       return true
    //   }))
    // console.log(arr)
      return "";
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {},

    // 选择出发时间时候触发
    handleFlightTimes(value) {
    },

    // 选择航空公司时候触发
    handleCompany(value) {
        // console.log(this.company)
    },

    // 选择机型时候触发
    handleAirSize(value) {},

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport= "", // 机场
      this.flightTime= "", // 出发时间
      this.company= "", // 航空公司
      this.airSize= "" // 机型大小
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>