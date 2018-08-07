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
    <!-- 添加按钮 -->
      <el-row>
      <el-button type="primary" plain @click="addDialogFormVisible=true">添加角色</el-button>
    </el-row>
      <!-- 角色列表 -->
    <el-table  
      class="margin-top_15"  
      v-loading="loading"
      :data = 'roleList'
      border
      style="width: 100%">
       <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
              <el-col :span="4" >
                <el-tag closable type="" @close="deleteRight(scope.row,firstChildren.id)">{{firstChildren.authName}}</el-tag>
                <i class='el-icon-arrow-right' v-if="firstChildren.authName.length !== 0"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                  <el-col :span="4">
                    <el-tag closable type="success" @close="deleteRight(scope.row,secondChildren.id)">{{secondChildren.authName}}</el-tag>
                    <i class='el-icon-arrow-right' v-if="secondChildren.authName.length !== 0"></i>
                    </el-col>
                  <el-col :span="20" ><el-tag closable type="warning" @close="deleteRight(scope.row,thrirChildren.id)" v-for="thrirChildren in secondChildren.children" :key="thrirChildren.id">{{thrirChildren.authName}}</el-tag></el-col>
                </el-row>
              </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0"><el-col :span="24">该角色没有分配权限,请前往分配!</el-col></el-row>
        </template>
      </el-table-column>
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      
      <el-table-column
          prop="roleName"
          label="角色名称"
          width="100">
      </el-table-column>

      <el-table-column
          prop="roleDesc"
          label="描述"
          width="220">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑角色" icon="el-icon-edit" plain ></el-button>
          <el-button type="danger" title="删除角色" icon="el-icon-delete" plain></el-button>
          <el-button type="warning" title="授权角色" icon="el-icon-check" plain @click="showDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <div class="tree-container">
        <el-tree
          :data="rightList"
          show-checkbox
          ref="tree"
          :default-expand-all="true"
          node-key="id"
          :default-checked-keys="selectedRights"
          :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGrant">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleList,deleteRoleRight,getRightList,grantRoleRight} from "../../src/api"
export default {
  data() {
    return {
      roleList: [],
      rightList: [],
      loading: true,
      dialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      selectedRights: [],  // 保存默认选中的权限id
      currentRole: {} //保存点击的角色
    };
  },
  created(){
    this.initList();
  },
  methods: {
    // 初始化表格数据
    initList(){
      this.loading = true
      // 获取角色列表
      getRoleList().then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          console.log('获取成功')
          this.roleList = res.data
          this.roleList.roleName = res.data.roleName
          this.roleList.roleDesc = res.data.roleDesc
          this.loading = false
        }
      })
      
    },
    //  删除权限 
    deleteRight(row, rightId) {
      deleteRoleRight({roleId: row.id, rightId: rightId}).then(res => {
        console.log('删除成功')
        console.log(res)
        if (res.meta.status === 200) {
          row.children = res.data
        } else {
          this.$messagt({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },  
    // 授权角色 
    showDialog(row){
      this.dialogFormVisible = true
      this.currentRole =row
      console.log(this.currentRole)
      getRightList({type: "tree"}).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.rightList = res.data 
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
      // 清空selectedRights
      this.selectedRights.length = 0
      this.currentRole.children.forEach(first => {
        if (first.children && first.children.length !== 0){
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0){
              second.children.forEach(third => {
                this.selectedRights.push(third.id)
              })
            }
          })      
        }
      })
      
    },
    submitGrant() {
      let rids = this.$refs.tree.getCheckedKeys().join(',')
      grantRoleRight(this.currentRole.id, {rids: rids}).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.dialogFormVisible = false
          this.initList()
        }
      })
    }

    
    },
  }

</script>

<style lang="scss" scoped>
  .roles {
    .el-tag {
      margin: 5px;
    }
    .tree-container {
      height: 300px;
      overflow: auto; 
    }
  }
</style>