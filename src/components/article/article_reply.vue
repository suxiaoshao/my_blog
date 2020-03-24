<template>
  <div id="article_reply">
    <el-card shadow="hover" style="background-color:rgba(255,255,255,0.75)">
      <div slot="header">
        <div class="title_1">评论区</div>
      </div>

      <!-- 发送评论 -->
      <div class="reply_post" v-loading="post_loading">
        <div class="title_2">添加新评论</div>
        <el-row :gutter="20">
          <el-col :sm="8" :xs="24">
            <div class="input_1">
              <el-input
                v-model="post_data.name"
                placeholder="名字(必填)"
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </div>
          </el-col>
          <el-col :sm="8" :xs="24">
            <div class="input_1">
              <el-input
                v-model="post_data.email"
                placeholder="邮箱(必填)"
                prefix-icon="el-icon-message"
              ></el-input>
            </div>
          </el-col>
          <el-col :sm="8" :xs="24">
            <div class="input_1">
              <el-input v-model="post_data.url" placeholder="网址(选填)" prefix-icon="el-icon-link"></el-input>
            </div>
          </el-col>
        </el-row>
        <br />
        <el-input
          type="textarea"
          :autosize="{ minRows: 7, maxRows: 12}"
          placeholder="评论内容"
          v-model="post_data.content"
        ></el-input>
        <br />
        <br />
        <center>
          <el-button icon="el-icon-position" @click="post_reply">发送</el-button>
        </center>
      </div>

      <!-- 评论内容 -->
      <div class="reply" v-loading="get_loading">
        <div class="title_2">评论区内容</div>
        <div class="reply_item" v-for="(item,index) in reply_data_list" :key="index">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <blockquote class="reply_content">
            <p class="reply_p">{{item.content}}</p>
          </blockquote>
          <div style="text-align: center;">
            <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-edit el-icon--right"></i>
              {{"by "+item.name}}
            </span>
            <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-time"></i>
              {{item.time_str}}
            </span>
          </div>
          <el-divider></el-divider>
        </div>
      </div>

      <!-- 评论翻页 -->
      <div class="block">
        <el-pagination
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="limit_num"
          layout="prev, pager, next,jumper"
          :total="real_num"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "article_reply",
  props: {
    aid: Number,
    reply_num: Number
  },
  data() {
    return {
      reply_data_list: [],
      page: 1,
      limit_num: 20,
      post_data: {
        name: "",
        email: "",
        url: "",
        content: ""
      },
      real_num: this.reply_num,
      post_loading: false,
      get_loading: false
    };
  },
  computed: {
    offset() {
      return (Number(this.page) - 1) * Number(this.limit_num);
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.get_reply();
    },
    get_reply() {
      this.get_loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/reply/base", {
          aid: this.aid,
          offset: this.offset,
          limit_num: this.limit_num
        })
        .then(response => {
          if (response.data.success) {
            this.reply_data_list = response.data.data;
            this.reply_num = response.data.reply_num;
            this.get_loading = false;
          } else {
            this.get_loading = false;
            this.$message({
              showClose: true,
              message: "没有评论",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    post_reply() {
      this.post_loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/reply/post", {
          aid: this.aid,
          content: this.post_data.content,
          name: this.post_data.name,
          email: this.post_data.email,
          url: this.post_data.url
        })
        .then(response => {
          if (response.data.success) {
            this.post_loading = false;
            this.$message({
              showClose: true,
              message: "成功发送",
              type: "success"
            });
            console.log(this.reply_data_list, typeof this.reply_data_list);
            this.reply_data_list.push(response.data.data);
            this.real_num++;
          } else {
            this.post_loading = false;
            this.$message({
              showClose: true,
              message: "发生错误,刷新试试",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    reply_num: function(val) {
      if (val !== -1) {
        this.real_num = val;
        this.get_reply();
      }
    }
  }
};
</script>

<style scoped>
.title_1 {
  font-family: "Tahoma For Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
  box-sizing: border-box;
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}
.title_2 {
  font-family: "Tahoma For Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 0;
  box-sizing: border-box;
  color: #262626;
  font-size: 18px;
  padding: 8px 0;
  font-weight: 600;
}
.input_1 {
  margin-top: 10px;
}
.reply_content {
  color: #303133;
  font-family: "Tahoma For Number", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  position: relative;
  background: #f7f7f7;
  padding: 6px 12px;
  border-left: 5px solid #d9d9d9;
  border-radius: 2px;
  margin: 8px 0;
}
.reply_p {
  line-height: 1.15;
  color: #444;
  font-family: BlinkMacSystemFont, "Microsoft YaHei", "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 95%;
  list-style: none;
}
</style>