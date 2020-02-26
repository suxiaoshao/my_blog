<template>
  <div id="article-content">
    <el-card shadow="hover" style="background-color:rgba(255,255,255,0.7)">
      <div slot="header">
        <div style="text-align: center;font-size: 1.5rem;margin: 20px auto;">{{article_data.title}}</div>
        <div style="text-align: center;">
          <span style="margin-right: 10px;color: #606266;">{{"#"+article_data.read_num+'次阅读'}}</span>
          <el-link :underline="false" style="margin-right: 10px;font-size: 16px;">
            <i class="el-icon-view el-icon--right"></i>
            <span>{{article_type[article_data.type]}}</span>
          </el-link>
          <span style="margin-right: 10px;color: #606266;">
            <i class="el-icon-time"></i>
            {{article_data.time_str}}
          </span>
        </div>
      </div>
      <MarkdownPreview
        :initialValue="article_data.content"
        theme="dark"
        style="background-color:transparent"
      ></MarkdownPreview>
    </el-card>
  </div>
</template>
<script>
import MarkdownPreview from "../../components/markdown/preview";
export default {
  name: "article-content",
  components: {
    MarkdownPreview: MarkdownPreview
  },
  props: {
    article_data: Object
  },
  computed: {
    article_type() {
      return this.$store.state.article_type;
    }
  }
};
</script>
<style scoped>
</style>