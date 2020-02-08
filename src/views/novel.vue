<template>
  <div id="novel">
    <navigation :point="[5,5,9,5]"></navigation>
    <br />
    <reserch-bar @get_research_result="get_research"></reserch-bar>
  </div>
</template>
<script>
import navigation from "../components/Navigavition";
import reserch from "../components/Research_bar";
export default {
  name: "novel",
  components: {
    navigation: navigation,
    "reserch-bar": reserch
  },
  data() {
    return {};
  },
  methods: {
    get_research(research_list) {
      console.log(research_list);
    }
  }
};
</script>
<style scoped>
</style>