<template>
  <div id="blog_main">
    <navigation :point="[6,6,6,6]"></navigation>
    <router-view></router-view>
  </div>
</template>
<script>
import navigation from "../../components/Navigavition";
export default {
  name: "blog_main",
  components: {
    navigation: navigation
  }
};
</script>