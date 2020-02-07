<template>
  <div id="bilibili">
    <navigation :point="[5,9,5,5]"></navigation>
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:12,offset:6}">
        <a :href="'https://www.bilibili.com/video/av'" target="_blank">
          <el-button>原视频 :</el-button>
        </a>
        <el-button type="success" icon="el-icon-check" circle></el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navigation from "../components/Navigavition";
export default {
  name: "bilibili",
  components: {
    navigation: navigation
  }
};
</script>
<style scoped>
</style>