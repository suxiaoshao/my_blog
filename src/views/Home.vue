<template>
  <div class="home">
    <navigation :point="[9,5,5,5]"></navigation>
    <br />
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
        <div v-for="(item,index) in all_data" :key="index">
          <show
            :title="item.title"
            :article_url="'/blog/article/'+String(item.aid)"
            :type="Number(item.type)"
            :time_str="item.time_str"
            :img_key="String(index)"
          ></show>
          <br />
          <br />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import navigation from "../components/Navigavition";
import show from "../components/show";
export default {
  name: "Home",
  components: {
    navigation: navigation,
    show: show
  },
  data() {
    return {
      article_num: 0,
      offset: 0,
      limit_num: 20,
      all_data: []
    };
  },
  methods: {
    get_base(find_condition) {
      this.axios
        .post("http://122.51.194.238:5000/api/blog/home/base", {
          find_condition: find_condition
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
    get_data(find_condition, limit_num, offset) {
      this.axios
        .post("http://122.51.194.238:5000/api/blog/home/article_list", {
          find_condition: find_condition,
          limit_num: limit_num,
          offset: offset
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
  mounted() {
    this.get_base({});
    this.get_data({}, this.limit_num, this.offset);
  }
};
</script>
<style scoped>
</style>
