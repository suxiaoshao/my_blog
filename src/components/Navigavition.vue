<template>
  <div class="Navigation" @mouseenter="enter" @mouseleave="leave">
    <el-menu
      v-if="!is_phone"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="select"
      :style="style[style_index]"
    >
      <el-menu-item
        v-for="(item,index) in navigation_item"
        :key="index"
        :index="String(index)"
      >{{item.name}}</el-menu-item>
    </el-menu>
    <el-menu
      v-if="is_phone"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="select"
      :style="style[style_index]"
    >
      <el-menu-item
        v-for="(item,index) in navigation_item"
        :key="index"
        :index="String(index)"
      >{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      style: [
        "background-color:rgba(255,255,255,0.9)",
        "background-color:rgba(255,255,255,0.6)"
      ],
      style_index: 1
    };
  },
  props: {
    activeIndex: String
  },
  methods: {
    select(key) {
      let real_key = Number(key);
      this.$router.push(this.navigation_item[real_key].path);
    },
    leave() {
      this.style_index = 1;
    },
    enter() {
      this.style_index = 0;
    }
  },
  computed: {
    is_phone() {
      return document.documentElement.clientWidth <= 750;
    },
    navigation_item() {
      return this.$store.state.navigation_item;
    }
  }
};
</script>
<style scoped>
.bg-purple {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
}
</style>