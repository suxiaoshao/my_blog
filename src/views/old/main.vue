<template>
  <div id="old_main">
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
  name: "old_main",
  components: {
    navigation: navigation
  }
};
</script>