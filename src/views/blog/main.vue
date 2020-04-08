<template>
  <div id="blog_main" class="router">
    <el-container>
      <el-header>
        <my-navigation></my-navigation>
      </el-header>
      <el-main>
        <router-view></router-view>
        <record-show></record-show>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import navigation from "../../components/Navigavition";
import record_show from "../../components/record_show";
export default {
  name: "blog_main",
  components: {
    "my-navigation": navigation,
    "record-show":record_show
  }
};
</script>