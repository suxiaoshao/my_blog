<template>
  <div id="blog_writting" v-loading="loading">
    <br />
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="标题" v-model="title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="文章类型">
              <el-option v-for="(item,index) in options" :key="index" :label="item" :value="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="post_content" :disabled="!post_allow">
              上传
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">
        <Markdown
          :toolbars="{uploadImage:true,image:false}"
          @on-upload-image="post_jpg"
          v-model="markdown"
        ></Markdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Markdown from "vue-meditor";
export default {
  name: "blog_writting",
  components: {
    Markdown: Markdown
  },
  data() {
    return {
      markdown: "",
      title: "",
      loading: false,
      value: ""
    };
  },
  computed: {
    options() {
      return this.$store.state.article_type;
    },
    post_allow() {
      return (
        this.value >= 0 &&
        this.value <= this.options.length &&
        this.value !== "" &&
        this.markdown !== ""
      );
    }
  },
  methods: {
    post_jpg(file) {
      if (file.type.search(/image\/.+/) !== -1) {
        let param = new FormData();
        param.append("file", file);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        this.axios
          .post(
            "http://192.168.0.103:5000/api/blog/article/upload_pic",
            param,
            config
          )
          .then(response => {
            if (response.data.success) {
              this.markdown += `![](${response.data.url})`;
            } else {
              this.$alert("上传失败", "警告");
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$alert("请选择图片文件", "警告");
      }
    },
    post_content() {
      this.loading = true;
      this.axios
        .post("http://192.168.0.103:5000/api/blog/article/upload_content", {
          content: this.markdown,
          title: this.title
        })
        .then(response => {
          if (response.data.success) {
            this.loading = false;
            this.$message({
              showClose: true,
              message: "成功上传",
              type: "success"
            });
            this.$router.push({
              name: "blog_article",
              params: { aid: response.data.aid }
            });
          } else {
            this.loading = false;
            this.$message({
              showClose: true,
              message: "上传失败",
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