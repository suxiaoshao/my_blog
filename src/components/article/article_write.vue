<template>
  <div id="article_writen">
    <Markdown
      :toolbars="{uploadImage:true,image:false}"
      @on-upload-image="post_jpg"
      v-model="markdown"
      theme="dark"
    ></Markdown>
  </div>
</template>
<script>
import Markdown from "../../components/markdown/simple";
export default {
  name: "article_writen",
  components: {
    Markdown: Markdown
  },
  data() {
    return {
      markdown: ""
    };
  },
  props: {
    value: String
  },
  mounted() {
    this.init();
  },
  watch: {
    markdown() {
      this.$emit("input", this.markdown);
    },
    value() {
      if (this.markdown !== this.value) {
        this.markdown = this.value;
      }
    }
  },
  methods: {
    init() {
      this.markdown = this.value;
    },
    post_jpg(file) {
      if (file.type.search(/image\/.+/) !== -1) {
        //是否是图片类型
        let param = new FormData();
        param.append("file", file);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        this.axios
          .post(
            "https://www.sushao.top/api/blog/article/upload_pic",
            param,
            config
          )
          .then(response => {
            if (response.data.success) {
              //如果成功将图片加入markdown中
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
    }
  }
};
</script>