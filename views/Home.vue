<template>
  <div class='home'>
    <el-container>
        <!-- aside部分 -->
      <el-aside width="auto" >
        <el-menu :router='true' class="el-menu-admin" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index='1'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index='2'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户权限</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
            <i class="el-icon-menu"></i>
            <span slot="title">权限列表</span>
          </el-menu-item>
          </el-submenu>        
        </el-menu>
      </el-aside>
   
      <el-container> 
        <!-- header部分 -->
      <el-header>
        <i class='myicon myicon-menu toggle-btn' @click= 'toggleCollapse'></i>
        <div class="system-title">电商后台管理系统</div>
        <div>
          <span class="welcome">你好,{{$store.getters.username}}</span>
          <el-button type="text" @click='logout'>退出</el-button>
        </div>
      </el-header>
        <!-- main部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import {getUSerList} from '@/api'
import { getUserList } from "../src/api";

export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    logout(){
      // 清楚登陆状态
      localStorage.removeItem('mytoken')
      // 跳转到登陆界面
      this.$router.push({name:'Login'})
    }
  },

  mounted() {
    let params = { params: { qurey: "", pagenum: 1, pagesize: 1 } };
    getUserList(params).then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #e9eef3;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #b3c0d1;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #b3c0d1;
  }
  // .logo {
  //   height:60px;
  //   background: url(../assets/logo.png);
  //   background-size: cover;
  //   background-color: white;
  // }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
