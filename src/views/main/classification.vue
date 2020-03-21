<template>
  <div id="classification">
    <br />
    <br />
    <br />
    <br />
    <el-row v-loading="loading">
      <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" :md="{span:12,offset:6}">
        <!-- 文章类型选择器 -->
        <el-button
          v-for="(item,index) in article_type"
          :key="item"
          :href="'/classification?type='+String(index)"
          :disabled="index===Number(type)"
          type="primary"
          @click="go_to_url(index)"
        >{{item}}</el-button>
        <br />
        <br />

        <!-- 文章的展示 -->
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
        
        <!-- 导航栏 -->
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
    <navigation :activeIndex="'1'"></navigation>
  </div>
</template>

<script>
import navigation from "../../components/Navigavition";
import show from "../../components/main/show";

export default {
  name: "classification",
  data() {
    return {
      article_num: 0, //总文章数
      limit_num: 10, // 获取文章list的总数
      all_data: [], //文章list
      article_type: ["学习", "代码", "其他", "工具"], // 文章类型总数
      real_page: this.$route.query.page, //显示的页面数量
      loading: false //页面是否在加载中
    };
  },
  // 导入文章展示组件show和导航栏组件navigation
  components: {
    navigation: navigation,
    show: show
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({
        name: "classification",
        params: { tid: this.type },
        query: { page: val }
      });
      this.get_base();
    },
    // 根据类型选择器跳转到相应url
    go_to_url(tid) {
      this.$router.push({ name: "classification", params: { tid: tid } });
      this.get_base();
    },
    // 获取文章总数
    get_base() {
      this.loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/home/base", {
          find_condition: { type: this.type }
        })
        .then(response => {
          if (response.data.success) {
            this.article_num = response.data.article_num;
            if (this.article_num === 0) {
              this.$message({
                showClose: true,
                message: "还没有篇文章",
                type: "warning"
              });
              this.all_data = [];
              this.loading = false;
            } else {
              this.get_data();
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          } else {
            this.$message({
              showClose: true,
              message: "发生错误,请刷新试试",
              type: "error"
            });
            this.loading = false;
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
          find_condition: { type: this.type }, //文章的限制
          limit_num: this.limit_num, //获取的总数
          offset: this.offset //偏移量
        })
        .then(response => {
          if (response.data.success) {
            this.loading = false;
            this.all_data = response.data.data;
          } else {
            this.loading = false;
            this.$message({
              showClose: true,
              message: "发生错误,自动转到第一页",
              type: "error"
            });
            this.$router.push({ name: "classification", params: { tid: tid } });
            this.get_base();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    // 文章的类型编号
    type() {
      return Number(this.$route.params.tid);
    },
    // 文章偏移量
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
  mounted() {
    // 获取文章总数和list数据
    this.get_base();
  }
};
</script>

<style scoped>
</style>