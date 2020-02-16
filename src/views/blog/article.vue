<template>
  <div id="blog_article">
    <br />
    <br />
    <el-backtop :visibility-height="0"></el-backtop>
    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
      <el-card shadow="hover">
        <div slot="header">
          <div
            style="text-align: center;font-size: 1.5rem;margin: 20px auto;"
          >{{article_data.title}}</div>
        </div>
        <MarkdownPreview :initialValue="article_data.content"></MarkdownPreview>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import { MarkdownPreview } from "vue-meditor";
export default {
  name: "blog_article",
  components: {
    MarkdownPreview: MarkdownPreview
  },
  data() {
    return {
      article_data: {
        title: "",
        // time: "",
        content: ""
      },
      article_loading: true
    };
  },
  mounted() {
    this.get_base();
  },
  methods: {
    get_base() {
      this.axios
        .post("http://192.168.0.103:5000/api/blog/article/base", {
          aid: this.$route.params.aid
        })
        .then(response => {
          if (response.data.success) {
            this.article_data = response.data.article_data;
            window.document.title = response.data.article_data.title;
            this.article_loading = false;
          } else {
            this.$alert("文章连接错误", "警告");
            this.$router.push({ name: "Home" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {}
};
</script>
<style scoped>
</style>