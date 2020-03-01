<template>
  <div id="wallpeper">
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
      url: ""
    };
  },
  mounted() {
    this.get_main_json();
  },
  computed: {
    real_url() {
      let url_list = this.url.split("/");
      return (
        "http://122.51.194.238:5000/api/old/wallpaper/img/" +
        url_list[url_list.length - 2] +
        "===" +
        url_list[url_list.length - 1]
      );
    }
  },
  methods: {
    get_main_json() {
      this.axios
        .get("http://122.51.194.238:5000/api/old/wallpaper/base")
        .then(response => {
          if (response.data.success === true) {
            this.url = response.data.data.url;
          } else {
            this.$alert("请刷新试试", "没有了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    delete_wallpaper() {
      this.axios
        .post("http://122.51.194.238:5000/api/old/wallpaper/base", {
          ok: false,
          url: this.url
        })
        .then(response => {
          if (response.data.success === true) {
            this.$message({
              message: "成功删除壁纸",
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
    retain_wallpaper() {
      this.axios
        .post("http://122.51.194.238:5000/api/old/wallpaper/base", {
          ok: true,
          url: this.url
        })
        .then(response => {
          if (response.data.success === true) {
            this.$message({
              message: "成功保留壁纸",
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
.image {
  width: 100%;
  display: block;
}
</style>