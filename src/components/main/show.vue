<template>
  <div id="show">
    <el-row>
      <el-link :href="'/blog/article/'+article_aid" target="_blank">
        <el-card :body-style="{ padding: '0px' }" style="background-color:rgba(255,255,255,0.7)">
          <!-- 标题  -->
          <div class="title">
            <span>{{title}}</span>
          </div>

          <!-- 信息栏 -->
          <div style="text-align: center;">
            <!-- 文章类型 -->
            <el-link
              :underline="false"
              style="margin-right: 10px;font-size: 16px;"
              :href="'/classification/'+String(type)"
              target="_blank"
            >
              <i class="el-icon-view el-icon--right"></i>
              <span>{{article_type[type]}}</span>
            </el-link>

            <!-- 最后编辑时间 -->
            <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-time"></i>
              {{time_str}}
            </span>
          </div>
          <br />

          <!-- 图片 -->
          <el-image :src="'http://www.sushao.top/api/blog/home/img/'+img_key" lazy>
            <div slot="placeholder" class="image-slot">
              <img src="../../assets/image/loading.png" alt="loading" class="image" />
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
    title: String, //文章标题
    type: Number, // 文章类型
    time_str: String, // 最后编辑时间
    article_aid: String, //文章标号
    img_key: String //图片标号
  },
  data() {
    return {
      article_type: ["学习", "代码", "其他", "工具"] //文章类型列表
    };
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