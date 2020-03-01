<template>
  <div id="blog_main">
    <br />
    <br />
    <br />
    <router-view></router-view>
    <navigation></navigation>
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