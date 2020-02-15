<template>
  <div id="novel">
    <navigation :point="[6,6,6,6]"></navigation>
    <br />
    <reserch-bar @get_research_result="get_research" v-if="is_main"></reserch-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import navigation from "../../components/Navigavition";
import reserch from "../../components/Research_bar";
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
      this.$router.push({
        name: "novel_research",
        query: {
          content: research_list
        }
      });
    }
  },
  computed: {
    is_main() {
      if (
        this.$route.name === "novel" ||
        this.$route.name === "novel_research"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
</style>