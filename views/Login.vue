<template>
  <div class="login" >
      <el-form ref="form" :model="form" class='container' :rules="rules" >
        <el-form-item >
          <img src="../src/assets/logo.jpg" alt="" class="avatar">
        </el-form-item>
        <el-form-item prop='username'>
          <el-input v-model="form.username" placeholder="用户名" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key" type="password" @keydown.native.enter="loginSubmit('form')"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class='login-btn' @click="loginSubmit('form')">登陆</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
// 引入用户验证
import { checkUser } from "../src/api/index.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('校验通过');
          checkUser(this.form).then(res => {
            // 成功即跳转页面
            console.log(res);
            if (res.meta.status === 200) {
              localStorage.setItem("mytoken", res.data.token);
              this.$store.commit("setUsername", res.data.username);
              console.log("登陆成功");
              this.$router.push({ name: "Home" });
            } else {
              // 失败则弹出提示框
              this.$message({
                message: res.meta.msg,
                type: "error"
              });
            }
          });
        } else {
          alert("校验不通过");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #b3c0d1;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 150px;
      height: 150px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
