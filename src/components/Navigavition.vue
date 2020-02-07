<template>
  <div class="Navigation">
    <el-row :gutter="10">
      <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:12,offset:6}">
        <el-row :gutter="10">
          <el-col v-for="item in 4" :key="item" :span="point[item-1]">
            <router-link :to="path[item-1]">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col>
                    <el-link :underline="false">{{names[item-1]}}</el-link>
                  </el-col>
                </el-row>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  props: {
    point: Array
  },
  data() {
    return {
    };
  },
  computed: {
    names(){
      return this.$store.state.navigation_names
    },
    path(){
      return this.$store.state.navigation_path
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