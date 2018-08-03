<template>
  <div class='roles'>
  <!-- 导航条 -->
    <el-row>
      <el-col :span="24">   
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
      <!-- 角色列表 -->
    <el-table  
      class="margin-15"  
      v-loading="loading"
      :data = 'roleList'
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
    </el-table>
  </div>
</template>
<script>
import {getRoleList} from "../../src/api"
export default {
  data() {
    return {
      roleList: [],
      loading: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>