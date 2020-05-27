<template>
    <div class="Navigation" @mouseenter="enter" @mouseleave="leave">
        <!-- 电脑的导航栏 -->
        <el-menu
            v-if="!is_phone"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="select"
            :style="style[style_index]"
        >
            <!-- 普通信息框 -->
            <el-menu-item
                v-for="(item,index) in navigation_item"
                :key="index"
                :index="String(index)"
            >{{item.name}}
            </el-menu-item>

            <!-- 搜索框 -->
            <el-menu-item
                :index="String(navigation_item.length)"
                v-show="activeIndex!=='-1'"
                class="search-bar"
            >
                <el-input v-model="search_name" placeholder="搜索" @keyup.enter.native="go_to_search"></el-input>
            </el-menu-item>
        </el-menu>

        <!-- 手机的导航栏 -->
        <el-menu
            v-if="is_phone"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="select"
            :style="style[style_index]"
        >
            <!-- 普通信息框 -->
            <el-submenu :index="String(navigation_item.length+1)">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                </template>
                <el-menu-item
                    v-for="(item,index) in navigation_item"
                    :key="index"
                    :index="String(index)"
                >{{item.name}}
                </el-menu-item>
            </el-submenu>

            <!-- 搜索框 -->
            <el-menu-item
                :index="String(navigation_item.length)"
                v-show="activeIndex!=='-1'"
                class="search-bar"
            >
                <el-input v-model="search_name" placeholder="搜索" @change="go_to_search"></el-input>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script lang="ts">
    import Vue from "vue"
    import {RawLocation} from "vue-router";

    interface Item{
        name:string
        path:RawLocation
    }
    interface Data {
        style: string[]
        style_index: number
        navigation_item: Item[]
        search_name: string
    }

    export default Vue.extend({
        name: "Navigation",
        data():Data {
            return {
                style: [
                    "background-color:rgba(255,255,255,0.9)", // 鼠标移入
                    "background-color:rgba(255,255,255,0.6)" // 鼠标移出
                ], // 导航栏样式
                style_index: 1, // 导航栏样式的数组下标
                navigation_item: [
                    {
                        name: "首页",
                        path: {name: "Home"}
                    },
                    {
                        name: "分类",
                        path: {name: "classification", params: {tid: "0"}}
                    },
                    {
                        name: "我的成长路线",
                        path: {name: "blog_article", params: {aid: "5"}}
                    }
                ], // 导航内容数组
                search_name: "" // 输入的搜索关键词
            };
        },
        props: {
            activeIndex: String as ()=>string //导航栏参数,用来隐藏和标记
        },
        methods: {
            // 点击菜单
            select(index:number) {
                let real_index:number = Number(index);
                if (this.navigation_item.length > real_index) {
                    this.$router.push(this.navigation_item[real_index].path);
                }
            },
            // 鼠标离开
            leave() {
                this.style_index = 1;
            },
            // 鼠标进来
            enter() {
                this.style_index = 0;
            },
            go_to_search() {
                // 如果搜索关键词为空
                if (this.search_name !== "") {
                    this.$router.push({
                        name: "search",
                        params: {search_name: this.search_name},
                        query: {page: "1"}
                    });
                } else {
                    this.$notify({
                        title: "警告",
                        message: "搜索内容不能为空",
                        duration: 0,
                        type: "warning"
                    });
                }
            }
        },
        computed: {
            // 判断是否是手机
            is_phone():boolean {
                return document.documentElement.clientWidth <= 750;
            }
        }
    });
</script>
<style scoped lang="scss">
    .Navigation {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
    }

    .search-bar {
        float: right;
    }
</style>
