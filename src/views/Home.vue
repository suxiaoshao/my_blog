<template>
  <div class="home">
    <navigation :point="[9,5,5,5]"></navigation>
  </div>
</template>

<script>
// @ is an alias to /src
import navigation from "../components/Navigavition";
export default {
  name: "Home",
  components: {
    navigation: navigation
  }
};
</script>
