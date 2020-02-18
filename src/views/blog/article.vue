<template>
  <div id="blog_article">
    <br />
    <br />

    <el-dialog title="目录" :visible.sync="dialogVisible" :fullscreen="is_phone">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-menu-item
          :disabled="judge(directory_flag,item)"
          v-for="(item,index) in article_data.directory"
          :key="index"
          @click="go_to_hash(item)"
        >
          <span slot="title">{{item}}</span>
        </el-menu-item>
      </el-menu>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="float:left;">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
      <el-card shadow="hover">
        <div slot="header">
          <div
            style="text-align: center;font-size: 1.5rem;margin: 20px auto;"
          >{{article_data.title}}</div>
          <div style="text-align: center;">
            <span style="margin-right: 10px;color: #606266;">{{"#"+article_data.read_num+'次阅读'}}</span>
            <el-link :underline="false" style="margin-right: 10px;font-size: 16px;">
              <span>{{'#'+article_type[article_data.type]}}</span>
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
            <span style="margin-right: 10px;color: #606266;">{{"#"+article_data.time_str}}</span>
          </div>
        </div>
        <MarkdownPreview :initialValue="article_data.content"></MarkdownPreview>
      </el-card>
    </el-col>
    <div style="position:fixed;
    right:10%;
    bottom:10%;">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button type="primary" icon="el-icon-more-outline" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">回到顶部</el-dropdown-item>
          <el-dropdown-item command="b">目录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
        time_str: "",
        content: "",
        time_stamp: 0,
        directory: [],
        aid: 0
      },
      article_loading: true,
      dialogVisible: false
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
    },
    handleCommand(item) {
      if (item === "a") {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else if (item === "b") {
        this.dialogVisible = true;
      }
    },
    judge(directory_flag, item) {
      return "#" + encodeURI(item) === directory_flag;
    },
    go_to_hash(hash) {
      window.location.hash = "#" + hash;
      this.dialogVisible = false;
    }
  },
  computed: {
    directory_flag() {
      return this.$route.hash;
    },
    is_phone() {
      return document.documentElement.clientWidth <= 750;
    },
    article_type() {
      return this.$store.state.article_type;
    }
  }
};
</script>
<style scoped>
</style>