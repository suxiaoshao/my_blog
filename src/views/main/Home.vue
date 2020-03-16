<template>
  <div class="home">
    <br />
    <br />
    <br />
    <br />
    <br />
    <el-row v-loading="loading">
      <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" :md="{span:12,offset:6}">
        <!-- 文章展示 -->
        <div v-for="(item,index) in all_data" :key="index">
          <show
            :title="item.title"
            :article_aid="String(item.aid)"
            :type="Number(item.type)"
            :time_str="item.time_str"
            :img_key="String(index)"
          ></show>
          <br />
          <br />
        </div>
        <div class="block" style="background-color:rgba(255,255,255, 0.7)">
          <el-pagination
            :hide-on-single-page="true"
            @current-change="handleCurrentChange"
            :current-page="real_page"
            :page-size="limit_num"
            layout="prev, pager, next,jumper"
            :total="article_num"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <navigation :activeIndex="'0'"></navigation>
  </div>
</template>

<script>
// @ is an alias to /src
import navigation from "../../components/Navigavition";
import show from "../../components/show";
export default {
  name: "Home",
  // 导入文章展示组件show和导航栏组件navigation
  components: {
    navigation: navigation,
    show: show
  },
  data() {
    return {
      article_num: 0, // 文章总数
      limit_num: 10, // 获取文章list的总数
      all_data: [], //文章list
      real_page: this.$route.query.page, //显示的页面数量
      loading: false //页面是否加载
    };
  },
  computed: {
    // 偏移量
    offset() {
      return (this.page - 1) * this.limit_num;
    },
    // 页面页数
    page() {
      if (this.$route.query.page === undefined) {
        return 1;
      } else {
        return Number(this.$route.query.page);
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({ name: "Home", query: { page: val } });
      this.get_base();
    },
    // 获取基本信息
    get_base() {
      this.loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/home/base", {
          find_condition: {}
        })
        .then(response => {
          if (response.data.success) {
            this.article_num = response.data.article_num;
            // 如果还没有文章
            if (this.article_num === 0) {
              this.loading = false;
              // 提示信息
              this.$message({
                showClose: true,
                message: "还没有篇文章",
                type: "warning"
              });
              // 删除all_data
              this.all_data = [];
            } else {
              // 有文章的话访问
              this.get_data();
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          } else {
            this.loading = false;
            this.$message({
              showClose: true,
              message: "发生错误,请刷新试试",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取文章list数据
    get_data() {
      this.loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/home/article_list", {
          find_condition: {}, //文章的限制
          limit_num: this.limit_num, //获取的总数
          offset: this.offset //偏移量
        })
        .then(response => {
          if (response.data.success) {
            this.loading = false;
            this.all_data = response.data.data;
          } else {
            this.loading = false;
            // 如果数据错误,退回第一页
            this.$message({
              showClose: true,
              message: "发生错误,自动转到第一页",
              type: "error"
            });
            this.$router.push({ name: "Home" });
            this.get_base();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.get_base();
  }
};
</script>
<style scoped>
</style>
