<template>
  <div id="ResearchBar">
    <el-row :gutter="10">
      <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:8,offset:8}">
        <el-input placeholder="回车搜索" v-model="inputs" clearable @keyup.enter.native="research"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ResearchBar",
  data() {
    return {
      inputs: ""
    };
  },
  methods: {
    research() {
      let research_list = this.inputs.split(/ +/);
      research_list = research_list.filter(function(item) {
        return item != "";
      });
      if (research_list.length === 0) {
        this.inputs = "";
        this.$message({
          showClose: true,
          message: "搜索信息不可为空",
          type: "error"
        });
      } else {
        this.$emit("get_research_result", research_list);
      }
    }
  }
};
</script>

<style scoped>
#ResearchBar {
  text-align: center;
}
</style>