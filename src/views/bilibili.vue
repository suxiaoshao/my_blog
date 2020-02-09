<template>
  <div id="bilibili">
    <navigation :point="[5,9,5,5]"></navigation>
    <br />
    <el-col :xs="{span:24,offset:0}" :sm="{span:18,offset:3}" :md="{span:16,offset:4}">
      <el-tooltip :content="main_av.desc" placement="top" effect="light">
        <a :href="'https://www.bilibili.com/video/av'+main_av.aid" target="_blank">
          <el-button>原视频 :{{main_av.title}}</el-button>
        </a>
      </el-tooltip>

      <el-button type="success" icon="el-icon-check" circle @click="post_update"></el-button>
      <br />
      <br />
      <el-row :gutter="10">
        <el-col
          :xs="{span:24}"
          :sm="{span:12}"
          :md="{span:12}"
          :lg="{span:8}"
          v-for="(item,index) in recommended"
          :key="index"
        >
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              标题:
              <el-link
                :href="'https://www.bilibili.com/video/av'+item.video.aid"
                target="_blank"
                class="button"
                type="primary"
                :underline="false"
              >{{item.video.title}}</el-link>作者:
              <el-link
                :href="'https://space.bilibili.com/'+item.owner.mid"
                target="_blank"
                class="button"
                type="primary"
                :underline="false"
              >{{item.owner.name}}</el-link>
            </div>
            <el-tooltip effect="light" placement="bottom-start">
              <div slot="content">
                <div
                  v-for="p in Math.ceil(item.video.desc.length/20)"
                  :key="p"
                >{{item.video.desc.slice((p-1)*20,p*20)}}</div>
              </div>
              <img :src="item.video.pic" class="image" />
            </el-tooltip>
            <div style="padding: 14px;">
              <span style="float:left;" v-show="!item.save">未收藏</span>
              <span style="float:left;" v-show="item.save">已收藏</span>
              <span>{{index+1}}/{{recommended.length}}</span>
              <el-button
                type="danger"
                icon="el-icon-star-off"
                circle
                style="float:right;"
                :disabled="item.save"
                @click="post_av_save(index)"
              ></el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-button type="success" icon="el-icon-check" circle @click="post_update"></el-button>
      <br />
      <br />
    </el-col>
  </div>
</template>
<script>
import navigation from "../components/Navigavition";
export default {
  name: "bilibili",
  components: {
    navigation: navigation
  },
  data() {
    return {
      main_av: {
        aid: "",
        title: "空"
      },
      recommended: []
    };
  },
  created() {
    this.get_base();
  },
  methods: {
    get_base() {
      this.axios
        .get("http://192.168.0.103:5000/api/bilibili/base")
        .then(response => {
          if (response.data.ok) {
            this.main_av = response.data.data;
            this.get_recommended(response.data.data.aid);
          } else {
            this.$message({
              showClose: true,
              message: "发生错诶,请刷新试试",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_recommended(aid) {
      this.axios
        .get(
          "http://192.168.0.103:5000/api/bilibili/recommended/" + String(aid)
        )
        .then(response => {
          if (response.data.ok) {
            this.recommended = response.data.data;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          } else {
            this.$message({
              showClose: true,
              message: "发生错误,请刷新试试",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    post_av_save(index) {
      this.axios
        .post(
          "http://192.168.0.103:5000/api/bilibili/av_save",
          this.recommended[index]
        )
        .then(response => {
          if (response.data.ok) {
            this.recommended[index].save = true;
            this.$message({
              showClose: true,
              message: "收藏成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "发生错误,请刷新试试",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    post_update() {
      this.axios
        .post("http://192.168.0.103:5000/api/bilibili/base", this.main_av)
        .then(response => {
          if (response.data.ok) {
            this.get_base();
            this.$message({
              showClose: true,
              message: "更新成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "发生错误,请刷新试试",
              type: "error"
            });
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