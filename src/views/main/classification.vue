<template>
  <div id="classification">
    <br />
    <br />
    <br />
    <br />
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
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
      article_num: 0,
      offset: 0,
      limit_num: 20,
      all_data: []
    };
  },
  components: {
    navigation: navigation,
    show: show
  },
  methods: {
    go_to_url(tid) {
      this.$router.push({ name: "classification", params: { tid: tid } });
      this.get_base();
      this.get_data();
    },
    get_base() {
      this.axios
        .post("http://www.sushao.top//api/blog/home/base", {
          find_condition: this.find_condition
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
    get_data() {
      this.axios
        .post("http://www.sushao.top//api/blog/home/article_list", {
          find_condition: this.find_condition,
          limit_num: this.limit_num,
          offset: this.offset
        })
        .then(response => {
          if (response.data.success) {
            this.all_data = response.data.data;
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
    }
  },
  computed: {
    find_condition() {
      let find_condition = { type: Number(this.$route.params.tid) };
      return find_condition;
    },
    article_type() {
      return this.$store.state.article_type;
    },
    type() {
      return Number(this.$route.params.tid);
    }
  },
  mounted() {
    this.get_base();
    this.get_data();
  }
};
</script>

<style scoped>
</style>