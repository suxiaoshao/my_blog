<template>
  <div id="blog_article">
    <br />
    <br />
    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
      <el-card shadow="hover" v-loading="article_loading">
        <div slot="header">
          <h1 class="article-title" style="text-align: center">{{article_data.title}}</h1>
        </div>
        <div id="content" v-html="real_content"></div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
let marked = require("marked");
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
export default {
  name: "blog_article",
  data() {
    return {
      article_data: {
        title: "",
        time: "",
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
  computed: {
    real_content() {
      return marked(this.article_data.content);
    }
  }
};
</script>
<style>
#content img {
  width: 100%;
  display: block;
}
#content a {
  background: 0 0;
  color: #4183c4;
  text-decoration: none;
}
#content a:hover {
  color: grey;
  outline: 0;
  text-decoration: underline;
}
#content p {
  margin-top: 0;
  margin-bottom: 16px;
}
</style>