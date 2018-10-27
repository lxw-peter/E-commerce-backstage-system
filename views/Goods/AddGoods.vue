<template>
<div class="addGoods">
  <el-row>
    <el-col :span="24">   
      <el-breadcrumb separator='/'>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-steps :active="active" finish-status="success">
    <el-step title="步骤 1"></el-step>
    <el-step title="步骤 2"></el-step>
    <el-step title="步骤 3"></el-step>
    <el-step title="步骤 4"></el-step>
    <el-step title="步骤 5"></el-step>
  </el-steps>
  <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
  <div class="editGoodsInfo">
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position='left'>
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="goodsInfo" :model="goodsInfo" label-width="80px">
          <el-form-item label="商品名称" prop='goods_name'>
            <el-input v-model="goodsInfo.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop='goods_price'>
            <el-input v-model="goodsInfo.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop='goods_weight'>
            <el-input v-model="goodsInfo.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop='goods_number'>
            <el-input v-model="goodsInfo.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="active" placeholder="请选择分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否促销" prop="is_promote">
            <el-switch v-model="goodsInfo.is_promote"></el-switch>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
          class="upload-demo"
          action="http://111.231.234.250:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :headers='getToken()'
          :on-success='handleSuccess'
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="five">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      activeName: 'first',
      is_promote: false,
      goodsInfo: []
    }
  },
  methods: {
    next() {
        if (this.active++ > 3) this.active = 0;
      },
    handleClick(tab, event) {
      this.active = Number(tab.index)
      // console.log(tab, event);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    getToken(){
      
      return {'Authorization' : localStorage.getItem('mytoken')}
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      this.$message({
        type: 'success',
        message: response.meta.msg
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.editGoodsInfo {
  margin-top: 30px;
  
}

</style>