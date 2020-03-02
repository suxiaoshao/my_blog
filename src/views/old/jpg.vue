<template>
  <div id="jpg">
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
            v-for="(item,index) in real_list"
            :key="(index)"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img :src="'http://www.sushao.top/api/old/jpg/img/'+item.src" class="image" />
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
              :total="data_count"
            ></el-pagination>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "jpg",
  data() {
    return {
      data_count: 0,
      len_view: 5,
      page: 1,
      real_list: []
    };
  },
  mounted() {
    this.get_main();
  },
  methods: {
    get_main() {
      this.axios
        .get("http://www.sushao.top/api/old/jpg/base")
        .then(response => {
          if (response.data.success === false) {
            this.$alert("没图片了", "警告");
          } else {
            this.data_count = response.data.data_count;
            this.get_list();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    current_change() {
      this.get_list();
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    get_list() {
      this.axios
        .post("http://www.sushao.top/api/old/jpg/base", {
          offset: (this.page - 1) * this.len_view,
          limit: this.len_view
        })
        .then(response => {
          if (response.data.success) {
            this.real_list = response.data.data;
          } else {
            this.$alert("出错了，请刷新试试", "警告");
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
.image {
  width: 100%;
  display: block;
}
</style>