<template>
  <div id="blog_writting" v-loading="loading">
    <br />
    <!-- 表单数据 -->
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
        <el-form :inline="true">
          <!-- 标题选择 -->
          <el-form-item>
            <el-input placeholder="标题" v-model="title"></el-input>
          </el-form-item>
          <!-- 文章类型选择 -->
          <el-form-item>
            <el-select v-model="type" placeholder="文章类型">
              <el-option v-for="(item,index) in options" :key="index" :label="item" :value="index"></el-option>
            </el-select>
          </el-form-item>
          <!-- 文章上传 -->
          <el-form-item>
            <el-button @click="post_content" :disabled="!post_allow">
              上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 编辑和预览区 -->
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">
        <article-written v-model="markdown"></article-written>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import written from "../../components/article/article_write";
export default {
  name: "blog_writting",
  components: {
    "article-written": written
  },
  data() {
    return {
      markdown: "", // markdown内容
      title: "", // 标题
      loading: false, // 编辑和预览区的loading属性
      type: "", //文章类型
      options:['学习', '代码', '其他', '工具']
    };
  },
  computed: {
    post_allow() {
      //是否可以上传
      return (
        this.type >= 0 &&
        this.type <= this.options.length &&
        this.type !== "" &&
        this.markdown !== ""
      );
    }
  },
  methods: {
    // 上传文章
    post_content() {
      this.loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/article/upload_content", {
          content: this.markdown,
          title: this.title,
          type: this.type
        })
        .then(response => {
          if (response.data.success) {
            // 上传成功，跳转至文章页面
            this.loading = false;
            this.$notify({
              title: "成功",
              message: "成功上传",
              duration: 0,
              type: "success"
            });
            this.$router.push({
              name: "blog_article",
              params: { aid: response.data.aid }
            });
          } else {
            this.loading = false;
            this.$notify({
              title: "错误",
              message: "上传失败",
              duration: 0,
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style scoped>
</style>