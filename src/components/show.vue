<template>
  <div id="show">
    <el-row>
      <el-link :href="article_url" target="_blank">
        <el-card :body-style="{ padding: '0px' }" style="background-color:rgba(255,255,255,0.7)">
          <div class="title">
            <span>{{title}}</span>
          </div>
          <div style="text-align: center;">
            <el-link :underline="false" style="margin-right: 10px;font-size: 16px;">
              <i class="el-icon-view el-icon--right"></i>
              <span>{{article_type[type]}}</span>
            </el-link>
            <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-time"></i>
              {{time_str}}
            </span>
          </div>
          <br />
          <el-image :src="'http://122.51.194.238:5000/api/blog/home/img/'+img_key" lazy>
            <div slot="placeholder" class="image-slot">
              <img src="../assets/loading.png" alt="loading" class="image" />
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
    article_url: String,
    img_key: String
  },
  computed: {
    article_type() {
      return this.$store.state.article_type;
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