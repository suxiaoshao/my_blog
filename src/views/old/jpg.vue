<template>
  <div id="jpg">
    <navigation :point="[5,5,5,9]"></navigation>
    <br />
    <br />
    <el-row>
      <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">
        <el-row>
          <el-col
            :xs="{span:24}"
            :sm="{span:12}"
            :md="{span:12}"
            :lg="{span:8}"
            v-for="(item,index) in jpg_list.slice((page-1)*len_view,page*len_view)"
            :key="(index)"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img :src="'http://122.51.194.238:5000/api/old/jpg/img/'+item.src" class="image" />
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-link
                    :href="item.url"
                    :underline="false"
                    target="_blank"
                    type="primary"
                    v-if="item.url!==null"
                  >{{item.tag}}</el-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">
          <div class="block">
            <el-pagination
              @current-change="current_change"
              :current-page.sync="page"
              :page-size="len_view"
              layout="prev, pager, next, jumper"
              :total="jpg_list.length"
            ></el-pagination>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navigation from "../../components/Navigavition";
export default {
  name: "jpg",
  components: {
    navigation: navigation
  },
  data() {
    return {
      jpg_list: [],
      len_view: 20,
      page: 1,
      f_page: 1
    };
  },
  mounted() {
    this.get_main();
  },
  methods: {
    get_main() {
      this.axios
        .get("http://122.51.194.238:5000/api/old/jpg/base")
        .then(response => {
          if (response.data.success === false) {
            this.$alert("没图片了", "警告");
          } else {
            this.jpg_list = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    current_change() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>
<style scoped>
.image {
  width: 100%;
  display: block;
}
</style>