<template>
  <div class="home">
    <navigation :point="[9,5,5,5]"></navigation>
    <br />
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
        <show
          :title="'汇编教材'"
          :article_url="'/blog/article/1'"
          :type="1"
          :time_str="'2020-02-17 10:06:58'"
        ></show>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import navigation from "../components/Navigavition";
import show from "../components/show";
export default {
  name: "Home",
  components: {
    navigation: navigation,
    show: show
  }
};
</script>
<style scoped>
</style>
