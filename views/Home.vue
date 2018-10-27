<template>
  <div class='home'>
    <el-container>
        <!-- aside部分 -->
      <el-aside width="auto" >
        <el-menu :router='true' :unique-opened='true' class="el-menu-admin" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu :index='item.path' v-for="item in menusData" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="tag.path" v-for="tag in item.children" :key="tag.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{tag.authName}}</span>
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
import {getUserList, menusRight} from "../src/api";

export default {
  data() {
    return {
      isCollapse: false,
      menusData: []
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
    },
  },
  created() {
    menusRight().then(res => {
      // console.log(res)
      this.menusData = res.data
    })
  },
  mounted() {
    let params = { params: { qurey: "", pagenum: 1, pagesize: 1 } };
    getUserList(params).then(res => {
      // console.log(res);
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
