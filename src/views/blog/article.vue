<template>
  <div id="blog_article" v-loading="loading">
    <br />
    <br />

    <!-- 目录 -->
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
    <!-- 文章内容 -->
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
        <article-content :article_data="article_data"></article-content>
      </el-col>
    </el-row>
    <br />
    <br />

    <!-- 文章评论 -->
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
        <article-reply :aid="Number(aid)" :reply_num="Number(article_data.reply_num)"></article-reply>
      </el-col>
    </el-row>

    <!-- 工具球 -->
    <div style="position:fixed;right:10%;bottom:10%;">
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
import content from "../../components/article/article_show";
import reply from "../../components/article/article_reply";
export default {
  name: "blog_article",
  components: {
    "article-content": content,
    "article-reply": reply
  },
  data() {
    return {
      // 文章数据
      article_data: {
        title: "", // 文章标题
        time_str: "", // 时间字符串
        content: "", // 文章内容
        time_stamp: 0, // 时间戳
        directory: [], // 目录
        type: null, // 文章类型
        read_num: 0, //阅读次数
        reply_num: -1 //评论次数
      },
      dialogVisible: false, // 目录是否显示
      loading: false
    };
  },
  created() {
    // 页面加载时，获取文章信息
    this.get_base();
  },
  methods: {
    // 获取文章信息
    get_base() {
      this.loading = true;
      this.axios
        .post("https://www.sushao.top/api/blog/article/base", {
          aid: this.aid
        })
        .then(response => {
          // 成功返回正确数据后 页面名字和文章内容获取
          if (response.data.success) {
            this.loading = false;
            this.article_data = response.data.article_data;
            window.document.title = response.data.article_data.title;
          } else {
            this.loading = false;
            this.$notify({
              title: "错误",
              message: "没有此文章",
              duration: 0,
              type: "error"
            });
            this.$router.push({ name: "Home" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 工具球点击
    handleCommand(item) {
      if (item === "a") {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else if (item === "b") {
        this.dialogVisible = true;
      }
    },
    // 判断是否hash值和目录是否相同
    judge(directory_flag, item) {
      return "#" + encodeURI(item) === directory_flag;
    },
    // 点击目录跳转到hash
    go_to_hash(hash) {
      window.location.hash = "#" + hash;
      window.document.title = this.article_data.title;
      this.dialogVisible = false;
    }
  },
  watch: {
    // 监听aid是否发生变化如果变化,执行get_base()
    aid() {
      this.get_base();
    }
  },
  computed: {
    // 获取页面hash值
    directory_flag() {
      return this.$route.hash;
    },
    // 是否为手机
    is_phone() {
      return document.documentElement.clientWidth <= 750;
    },
    // 文章的aid
    aid() {
      return this.$route.params.aid;
    }
  }
};
</script>
<style scoped>
</style>