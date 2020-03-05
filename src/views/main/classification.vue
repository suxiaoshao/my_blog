<template>
  <div id="classification">
    <br />
    <br />
    <br />
    <br />
    <el-row>
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
            :article_url="'/blog/article/'+String(item.aid)"
            :type="Number(item.type)"
            :time_str="item.time_str"
            :img_key="String(index)"
            @click="go_to_url(index)"
          ></show>
          <br />
          <br />
        </div>
        <div class="block" style="background-color:rgba(255,255,255, 1)">
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
import show from "../../components/show";

export default {
  name: "classification",
  data() {
    return {
      article_num: 0, //总文章数
      limit_num: 20, // 获取文章list的总数
      all_data: [], //文章list
      article_type: ["学习", "代码", "其他", "工具"], // 文章类型总数
      real_page: this.$route.query.page //显示的页面数量
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
        params: { tid: tid },
        query: { page: val }
      });
      this.get_base();
      this.get_data();
    },
    // 根据类型选择器跳转到相应url
    go_to_url(tid) {
      this.$router.push({ name: "classification", params: { tid: tid } });
      this.get_base();
      this.get_data();
    },
    // 获取文章总数
    get_base() {
      this.axios
        .post("http://www.sushao.top/api/blog/home/base", {
          find_condition: { type: this.type }
        })
        .then(response => {
          if (response.data.success) {
            this.article_num = response.data.article_num;
          } else {
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
      this.axios
        .post("http://www.sushao.top/api/blog/home/article_list", {
          find_condition: { type: this.type }, //文章的限制
          limit_num: this.limit_num, //获取的总数
          offset: this.offset //偏移量
        })
        .then(response => {
          if (response.data.success) {
            this.all_data = response.data.data;
          } else {
            this.$message({
              showClose: true,
              message: "发生错误,自动转到第一页",
              type: "error"
            });
            this.$router.push({ name: "classification", params: { tid: tid } });
            this.get_base();
            this.get_data();
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
    this.get_data();
  }
};
</script>

<style scoped>
</style>