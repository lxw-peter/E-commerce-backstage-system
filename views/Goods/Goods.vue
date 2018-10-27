<template>
<div class="goods">
  <el-row>
    <el-col :span="24">   
      <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row>
    <el-button type="success" plain @click="toAddGoods">添加商品</el-button>
  </el-row>
  <!-- 商品列表 -->
  <el-table  
     v-loading="loading"
    class="margin-15"  
    :data = 'goodsList'
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="220">
    </el-table-column>

    <el-table-column
      prop="goods_price"
      label="价格"
      width="100">
    </el-table-column>

    <el-table-column
      prop="goods_number"
      label="数量"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="重量"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goods_state"
      label="商品状态"
      width="100">
    </el-table-column>
    <el-table-column
      prop="add_time"
      label="添加时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="upd_time"
      label="更新时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="hot_mumber"
      label="热销数量"
      width="100">
    </el-table-column>
    <el-table-column
      label="热销"
      width="100">
        <template slot-scope="scope">
          <el-switch style="display: block" v-model="scope.row.is_promote"  active-color="#13ce66" inactive-color="#ff4949" disabled>
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" title="编辑商品" plain @click="showEditDialog(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" title="删除商品" plain @click="showDeleteDialog(scope.row)"></el-button>
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
import {getGoodsList} from '../../src/api/index.js'
export default {
  data() {
    return {
      goodsList: [],
      pagesize: 10,
      pagenum: 1,
      total: 0,
      loading: true
    }
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      // this.loading = true;
      getGoodsList({ params: { query: this.query, pagenum:this.pagenum, pagesize: this.pagesize} }).then(
        res => {
          // console.log(res);
          this.goodsList = res.data.goods;
          this.total = res.data.total;
          this.loading = false;
        }
      );
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initList();
    },
    toAddGoods() {
      this.$router.push({ name: "AddGoods" });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>