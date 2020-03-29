<template>
  <div id="wallpeper" v-loading="loading">
    <br />
    <br />
    <el-row>
      <el-col :xs="{span:22,offset:1}" :sm="{span:14,offset:5}" :md="{span:10,offset:7}">
        <el-card class="box-card">
          <div slot="header">
            <el-link :href="url" :underline="false" target="_blank">图片链接</el-link>
          </div>
          <img class="image" :src="real_url" alt="  " />
          <br />
          <el-button
            style="float: left"
            type="success"
            icon="el-icon-folder-checked"
            @click="retain_wallpaper"
          >保留</el-button>
          <el-button
            style="float: right"
            type="danger"
            icon="el-icon-folder-delete"
            @click="delete_wallpaper"
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
  name: "wallpaper",
  data() {
    return {
      url: "",
      loading: false
    };
  },
  mounted() {
    this.get_main_json();
  },
  computed: {
    real_url() {
      let url_list = this.url.split("/");
      return (
        "https://www.sushao.top/api/old/wallpaper/img/" +
        url_list[url_list.length - 2] +
        "===" +
        url_list[url_list.length - 1]
      );
    }
  },
  methods: {
    get_main_json() {
      this.loading = true;
      this.axios
        .get("https://www.sushao.top/api/old/wallpaper/base")
        .then(response => {
          if (response.data.success === true) {
            this.url = response.data.data.url;
            this.loading = false;
          } else {
            this.loading = false;
            this.$alert("请刷新试试", "没有了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    delete_wallpaper() {
      this.loading = true;
      this.axios
        .post("https://www.sushao.top/api/old/wallpaper/base", {
          ok: false,
          url: this.url
        })
        .then(response => {
          if (response.data.success === true) {
            this.$notify({
              title: "成功",
              message: "成功删除壁纸",
              duration: 0,
              type: "success"
            });
            this.get_main_json();
          } else {
            this.loading = false;
            this.$alert("请刷新试试", "出错了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    retain_wallpaper() {
      this.loading = true;
      this.axios
        .post("https://www.sushao.top/api/old/wallpaper/base", {
          ok: true,
          url: this.url
        })
        .then(response => {
          if (response.data.success === true) {
            this.loading = false;
            this.$notify({
              title: "成功",
              message: "成功保留壁纸",
              duration: 0,
              type: "success"
            });
            this.get_main_json();
          } else {
            this.loading = false;
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
.image {
  width: 100%;
  display: block;
}
</style>