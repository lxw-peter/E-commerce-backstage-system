<template>
  <div class="user">
    <!-- 导航条 -->
    <el-row>
      <el-col :span="24">   
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
      <!-- 给非DOM元素绑定keydown事件时需要使用native方法-->
      <el-input placeholder="请输入内容"  class="search-input" v-model="query" @keydown.native.enter='initList'>
        <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </el-row>
    <!-- 列表 -->
    <el-table    
      :data = 'userList'
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>

      <el-table-column
        prop="email"
        label="邮箱"
        width="220">
      </el-table-column>

      <el-table-column
        prop="mobile"
        label="电话"
        width="220">
      </el-table-column>

      <el-table-column
        label="用户状态"
        width="120">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="value1"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  <!-- 分页器 -->
    <div class="page">
      <!-- :current-page="currentPage4" -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getUserList } from "../../src/api";
export default {
  data() {
    return {
      userList: [],
      query: '',
      value1: ""
    };
  },
  created() {
    this.initList();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initList();
    },
    // 初始化表格数据
    initList() {
      this.loading = true;
      getUserList({ params: { query: this.query, pagenum: 1, pagesize: 5 } }).then(
        res => {
          console.log(res);
          this.userList = res.data.users;
          this.total = res.data.total;
          this.loading = false;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #d3dce6;
  }
}
</style>
