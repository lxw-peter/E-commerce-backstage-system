<template>
<div class="orders">
  <el-row>
    <el-col :span="24">   
      <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
    <el-table
    :data="orderList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="order_id"
      label="订单ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="order_price"
      label="商品价格"
      width="180">
    </el-table-column>
    <el-table-column
      prop="order_pay"
      label="支付方式"
      width="180">
    </el-table-column>
    <el-table-column
      prop="is_send"
      label="是否发货">
    </el-table-column>
    <el-table-column
      prop="consignee_addr"
      label="发货地址">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间">
    </el-table-column>
     <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑角色" icon="el-icon-edit" plain ></el-button>
          <el-button type="danger" title="删除角色" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" title="授权角色" icon="el-icon-check" plain @click="showDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
  </el-table>

    <!-- 分页器 -->
  <div class="page">
    <!-- :current-page="currentPage4" -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
import { getOrderList } from "../../src/api/index.js";
export default {
  data () {
    return {
      pagenum: '1',
      pagesize: '10',
      orderList: [],
      total: 0,
      commonTime: ''
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getOrderList({ params: { query: this.query, pagenum : this.pagenum, pagesize: this.pagesize}}).then ( res => {
        // console.log(res)
        if (res.meta.status === 200){
          this.orderList = res.data.goods
          this.total = res.data.total
          console.log(this.orderList)
          for (var i = 0 ,len=this.orderList.length; i<len; i++){
            var unixTimestamp = new Date(this.orderList[i].create_time * 1000) 
            this.orderList[i].create_time = unixTimestamp.toLocaleString()
          }
        }
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.init();
    },
  }
};
</script>
<style lang="scss" scoped>
</style>