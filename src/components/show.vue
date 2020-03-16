<template>
  <div id="show">
    <el-row>
      <el-link @click="go_to_article">
        <el-card
          :body-style="{ padding: '0px' }"
          style="background-color:rgba(255,255,255,0.7)"
        >
          <div class="title">
            <span>{{title}}</span>
          </div>
          <div style="text-align: center;">
            <el-link
              :underline="false"
              style="margin-right: 10px;font-size: 16px;"
              @click="go_to_classification"
            >
              <i class="el-icon-view el-icon--right"></i>
              <span>{{article_type[type]}}</span>
            </el-link>
            <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-time"></i>
              {{time_str}}
            </span>
          </div>
          <br />
          <el-image :src="'http://www.sushao.top/api/blog/home/img/'+img_key" lazy>
            <div slot="placeholder" class="image-slot">
              <img src="../assets/image/loading.png" alt="loading" class="image" />
            </div>
          </el-image>
        </el-card>
      </el-link>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "show",
  props: {
    title: String,
    type: Number,
    time_str: String,
    article_aid: String,
    img_key: String
  },
  data() {
    return {
      article_type: ["学习", "代码", "其他", "工具"]
    };
  },
  methods: {
    go_to_article() {
      this.$router.push({
        name: "blog_article",
        params: { aid: this.article_aid }
      });
    },
    go_to_classification(){
      this.$router.push({
        name: "classification",
        params: { tid: this.type }
      });
    }
  }
};
</script>
<style scoped>
.image {
  width: 100%;
  display: block;
}
.title {
  color: grey;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 25px;
  line-height: 1.4;
}
</style>