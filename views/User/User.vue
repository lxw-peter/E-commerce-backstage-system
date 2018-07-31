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
      <!-- 给非DOM元素绑定keydown事件时需要使用.native的修饰符-->
      <el-input placeholder="请输入内容"  class="search-input" v-model="query" @keydown.native.enter='initList'>
        <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
      </el-input>
      <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
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
          <el-switch style="display: block" v-model="scope.row.mg_state" @change="changeUserState(scope.row)" active-color="#13ce66" inactive-color="#ff4949" >
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="50"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop='mobile'>
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList,changeUserState,addUser} from "../../src/api";
export default {
  data() {
    return {
      userList: [],
      query: '',
      total: 0,
      pagenum: 1,
      pagesize: 10,
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur'},
          { type: 'email', message: '请输入邮箱地址', trigger: 'blur,change'}

        ],
        mobile: [
          { required: true, message: '电话不能为空', trigger: 'blur'}
        ]
      }
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
      // this.loading = true;
      getUserList({ params: { query: this.query, pagenum:this.pagenum, pagesize: this.pagesize} }).then(
        res => {
          console.log(res);
          this.userList = res.data.users;
          this.total = res.data.total;
          // this.loading = false;
        }
      );
    },
    // 改变用户状态
    changeUserState (row) {
      console.log(row)
      changeUserState({uid: row.id,type:row.mg_state}).then(res => {
        if (res.meta.status === 200) {
          // 弹出状态提醒
          this.$message({
            type: 'success',
            message: '修改用户状态成功'    
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.meta.msg 
          })
        }
      })
    },
    // 添加用户
    addUserSubmit (formName) {
      this.$refs[formName].validate (valide => {
        if (valide) {
          // 执行添加用户方法
          addUser(this.addForm).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: '创建用户成功'
              })
            }
            this.addDialogFormVisible = false
            this.initList()
          })
        }
      })
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
