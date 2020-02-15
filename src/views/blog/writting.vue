<template>
  <div id="blog_writting">
    <br />
    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
      <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入内容" v-model="textarea2"></el-input>
    </el-col>
  </div>
</template>
<script>
export default {
  name: "blog_writting",
  data() {
    return {
      textarea2: ""
    };
  }
};
</script>
<style scoped>
</style>