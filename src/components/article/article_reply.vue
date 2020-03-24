<template>
  <div id="article_reply">
    <el-card shadow="hover" style="background-color:rgba(255,255,255,0.75)">
      <div slot="header">
        <div class="title_1">评论区</div>
      </div>

      <!-- 发送评论 -->
      <div class="reply_post" v-loading="post_loading">
        <div class="title_2">添加新评论</div>
        <el-form :model="post_data" :rules="rules" ref="post_data">
          <el-row :gutter="20">
            <!-- 名字输入 -->
            <el-col :sm="8" :xs="24">
              <el-form-item prop="name">
                <el-input
                  maxlength="20"
                  v-model="post_data.name"
                  placeholder="名字(必填)"
                  prefix-icon="el-icon-user-solid"
                ></el-input>
              </el-form-item>
            </el-col>

            <!-- 邮箱输入 -->
            <el-col :sm="8" :xs="24">
              <el-form-item prop="email">
                <el-input
                  maxlength="100"
                  v-model="post_data.email"
                  placeholder="邮箱(必填)"
                  prefix-icon="el-icon-message"
                ></el-input>
              </el-form-item>
            </el-col>

            <!-- 网址输入 -->
            <el-col :sm="8" :xs="24">
              <el-form-item prop="url">
                <el-input
                  maxlength="100"
                  v-model="post_data.url"
                  placeholder="网址(选填)"
                  prefix-icon="el-icon-link"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 评论内容输入 -->
          <el-form-item prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 12}"
              placeholder="评论内容"
              v-model="post_data.content"
            ></el-input>
          </el-form-item>

          <!-- 评论提交按钮 -->
          <el-form-item>
            <center>
              <el-button icon="el-icon-position" @click="post_reply('post_data')">发送</el-button>
            </center>
          </el-form-item>
        </el-form>
      </div>

      <!-- 评论内容 -->
      <div class="reply" v-loading="get_loading">
        <div class="title_2">评论区内容</div>
        <div class="reply_item" v-for="(item,index) in reply_data_list" :key="index">
          <!-- 头像 -->
          <el-popover placement="top-start" width="200" trigger="hover">
            <p class="info_p">邮箱: {{item.email}}</p>
            <p class="info_p" v-show="item.url!==''">
              网址:
              <el-link :underline="false" :href="item.url" target="_blank">{{item.url}}</el-link>
            </p>
            <el-link slot="reference" :underline="false">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </el-link>
          </el-popover>

          <!-- 评论内容 -->
          <blockquote class="reply_content">
            <p class="reply_p">{{item.content}}</p>
          </blockquote>

          <!-- 评论信息 -->
          <div style="text-align: center;">
            <el-popover placement="top-start" width="200" trigger="hover">
              <p class="info_p">邮箱: {{item.email}}</p>
              <p class="info_p" v-show="item.url!==''">
                网址:
                <el-link :underline="false" :href="item.url" target="_blank">{{item.url}}</el-link>
              </p>
              <span style="margin-right: 10px;color: #606266;" slot="reference">
                <i class="el-icon-edit el-icon--right"></i>
                <el-link :underline="false">{{"by "+item.name}}</el-link>
              </span>
            </el-popover>
            <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-time"></i>
              {{item.time_str}}
            </span>
          </div>
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
    aid: Number, // 文章的aid
    reply_num: Number // 评论数
  },
  data() {
    // 名字的判断
    let check_name = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名字"));
      } else {
        callback();
      }
    };
    // 邮箱的判断
    let check_email = (rule, value, callback) => {
      let reg_email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg_email.test(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    // url的判断
    let check_url = (rule, value, callback) => {
      let reg_url = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      if (value !== "" && !reg_url.test(value)) {
        callback(new Error("网址格式错误"));
      } else {
        callback();
      }
    };
    // 评论内容的判断
    let check_content = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入评论内容"));
      } else {
        callback();
      }
    };
    return {
      reply_data_list: [], // 评论数据列表
      page: 1, // 评论页码
      limit_num: 20, // 一页评论数量
      post_data: {
        //发送评论数据
        name: "", //评论者名字
        email: "", //电子邮箱
        url: "", //网址
        content: "" //评论内容
      },
      real_num: this.reply_num, // 评论的真实总数
      post_loading: false, //post loading效果
      get_loading: false, // get loading 效果
      // 表单的验证规则
      rules: {
        name: [{ validator: check_name, trigger: "change" }], //名字验证规则
        email: [{ validator: check_email, trigger: "change" }], //电子邮箱验证规则
        url: [{ validator: check_url, trigger: "change" }], //url 验证规则
        content: [{ validator: check_content, trigger: "change" }] //评论内容验证规则
      }
    };
  },
  computed: {
    // 偏移量
    offset() {
      return (Number(this.page) - 1) * Number(this.limit_num);
    }
  },
  methods: {
    // 评论页码改变
    handleCurrentChange(val) {
      this.page = val;
      this.get_reply();
    },
    // 获取评论
    get_reply() {
      this.get_loading = true;
      this.axios
        .post("http://www.sushao.top/api/blog/reply/base", {
          aid: this.aid,
          offset: this.offset,
          limit_num: this.limit_num
        })
        .then(response => {
          // 获取评论成功
          if (response.data.success) {
            this.reply_data_list = response.data.data;
            this.real_num = response.data.reply_num;
            this.get_loading = false;
          } else {
            this.get_loading = false;
            this.$notify({
              title: "警告",
              message: "此文章没有评论",
              duration: 0,
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 发送评论
    post_reply(data) {
      this.$refs[data].validate(valid => {
        // 表单验证成功
        if (valid) {
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
              // 发送评论成功
              if (response.data.success) {
                this.post_loading = false;
                this.$notify({
                  title: "成功",
                  message: "评论发送成功",
                  duration: 0,
                  type: "success"
                });
                this.reply_data_list.push(response.data.data); // 新评论添加到数据中
                this.real_num++; // 评论数加一
              } else {
                this.post_loading = false;
                this.$notify({
                  title: "错误",
                  message: "发生错误,刷新试试",
                  duration: 0,
                  type: "error"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
        // 表单验证失败
        else {
          this.$notify({
            title: "警告",
            message: "信息填写错误",
            duration: 0,
            type: "warning"
          });
          return false;
        }
      });
    }
  },
  watch: {
    reply_num: function(val) {
      if (val !== -1) {
        // 评论评论数据更新时
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
.info_p {
  text-align: center;
  margin-right: 10px;
  color: rgb(96, 98, 102);
}
</style>