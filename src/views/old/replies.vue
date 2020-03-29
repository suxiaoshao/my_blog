<template>
  <div id="replies">
    <br />
    <br />
    <el-row>
      <el-col :xs="{span:22,offset:1}" :sm="{span:14,offset:5}" :md="{span:10,offset:7}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <el-link :href="url.split('$$')[0]" target="_blank" :underline="false">评论链接</el-link>
            </span>
          </div>
          <div :key="content" class="text item">{{content}}</div>
          <br />
          <el-button
            style="float: left"
            type="success"
            icon="el-icon-folder-checked"
            @click="retain_reply"
          >保留</el-button>
          <el-button
            style="float: right"
            type="danger"
            icon="el-icon-folder-delete"
            @click="delete_reply"
          >删除</el-button>
          <br />
          <br />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "replies",
  data() {
    return {
      content: "还没评论呢",
      url: "dfhbkdvbfh$$"
    };
  },
  mounted() {
    this.get_main_json();
  },
  methods: {
    get_main_json() {
      this.axios
        .get("https://www.sushao.top/api/old/replies/base")
        .then(response => {
          if (response.data.success === true) {
            this.content = response.data.data.content;
            this.url = response.data.data.url;
          } else {
            this.$alert("请刷新试试", "没有了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    delete_reply() {
      this.axios
        .post("https://www.sushao.top/api/old/replies/base", {
          ok: false,
          data: { content: this.content, url: this.url }
        })
        .then(response => {
          if (response.data.success === true) {
            this.$notify({
              title: "成功",
              message: "成功删除评论",
              duration: 0,
              type: "success"
            });
            this.get_main_json();
          } else {
            this.$alert("请刷新试试", "出错了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    retain_reply() {
      this.axios
        .post("https://www.sushao.top/api/old/replies/base", {
          ok: true,
          data: { content: this.content, url: this.url }
        })
        .then(response => {
          if (response.data.success === true) {
            this.$notify({
              title: "成功",
              message: "成功保留评论",
              duration: 0,
              type: "success"
            });
            this.get_main_json();
          } else {
            this.$alert("请刷新试试", "出错了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
</style>