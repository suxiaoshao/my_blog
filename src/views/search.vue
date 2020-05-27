<template>
    <div class="router search">
        <el-container>
            <el-header height="61px">
                <my-navigation active-index="0"></my-navigation>
            </el-header>
            <el-main>

                <!-- 搜索栏 -->
                <el-row :gutter="10" id="title">
                    <el-col :xs="{span:19,offset:0}" :sm="{span:10,offset:6}" :md="{span:6,offset:8}">
                        <el-input placeholder="回车搜索" v-model="inputName" @keyup.enter.native="real_search"></el-input>
                    </el-col>
                    <el-col :xs="{span:5}" :sm="{span:2}" :md="{span:2}">
                        <el-button @click="real_search" style="width:100%" type="primary">搜索</el-button>
                    </el-col>
                </el-row>

                <br/>
                <br/>

                <el-row v-loading="loading">
                    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:3}" :md="{span:10,offset:7}">
                        <!-- 搜索结果 -->
                        <div v-for="(item,index) in data_list" :key="index">
                            <show
                                :title="item.title"
                                :article_aid="String(item.aid)"
                                :type="Number(item.type)"
                                :time_str="item.time_str"
                                :img_key="index"
                            ></show>
                            <br/>
                            <br/>
                        </div>

                        <!-- 分页栏 -->
                        <div class="block" style="background-color:rgba(255,255,255, 0.7)">
                            <el-pagination
                                :hide-on-single-page="true"
                                @current-change="handleCurrentChange"
                                :current-page="real_page"
                                :page-size="limit_num"
                                layout="prev, pager, next,jumper"
                                :total="article_num"
                            ></el-pagination>
                        </div>
                    </el-col>
                </el-row>
                <record-show></record-show>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts">
    import show from "../components/show.vue";
    import navigation from "../components/Navigavition.vue";
    import record_show from "../components/record_show.vue";
    import Vue from "vue"
    import {ArticleListData} from "@/assets/interface";

    interface Data {
        article_num: number
        limit_num: number
        inputName: string
        data_list: ArticleListData[]
        real_page: number
        loading: boolean
    }

    export default Vue.extend({
        name: "search",
        data(): Data {
            return {
                article_num: 0, //总文章数
                limit_num: 10, //每页显示多少搜索结果
                inputName: "", //搜索框数据
                data_list: [], // 搜索结果列表
                real_page: Number(this.$route.query.page), //显示的页面数量
                loading: true
            };
        },
        components: {
            "my-navigation": navigation,
            "show": show,
            "record-show": record_show
        },
        computed: {
            // 搜索关键词
            search_name():string {
                return this.$route.params.search_name;
            },
            // 搜索结果偏移量
            offset(): Number {
                if (this.$route.query.page === undefined) {
                    return 0;
                } else {
                    return (Number(this.$route.query.page) - 1) * Number(this.limit_num);
                }
            }
        },
        watch: {
            search_name():void {
                this.get_main();
            },
            offset():void {
                this.get_main();
            }
        },
        mounted() {
            this.get_main();
        },
        methods: {
            handleCurrentChange(val: number):void {
                this.$router.push({
                    name: "search",
                    params: {search_name: this.search_name},
                    query: {page: String(val)}
                });
            },
            // 获取搜索结果
            get_main():void {
                this.loading = true;
                this.data_list = [];
                this.axios
                    .post("https://www.sushao.top/api/blog/search/base", {
                        search_name: this.search_name
                    })
                    .then(response => {
                        // 如果成功
                        if (response.data.success) {
                            if (response.data.article_num === 0) {
                                this.loading = false;
                                this.$notify({
                                    title: "警告",
                                    message: "搜索结果为空",
                                    duration: 0,
                                    type: "warning"
                                });
                            } else {
                                this.article_num = response.data.article_num;
                                this.get_list();
                                const title = document.getElementById("title")
                                if (title !== null) {
                                    title.scrollIntoView()
                                }
                            }
                        } else {
                            this.$notify({
                                title: "错误",
                                message: "刷新试试",
                                duration: 0,
                                type: "error"
                            });
                            this.loading = false;
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            get_list() {
                this.loading = true;
                this.axios
                    .post("https://www.sushao.top/api/blog/search/search_list", {
                        search_name: this.search_name,
                        offset: this.offset,
                        limit_num: this.limit_num
                    })
                    .then(response => {
                        this.loading = false;
                        if (response.data.success) {
                            this.data_list = response.data.data;
                        } else {
                            this.$notify({
                                title: "错误",
                                message: "自动转到第一页",
                                duration: 0,
                                type: "error"
                            });
                            this.$router.push({
                                name: "search",
                                params: {search_name: this.search_name},
                                query: {page: "1"}
                            });
                            this.get_main();
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            // 跳转到新的搜索关键词页面
            real_search() {
                // 为空
                if (this.inputName !== "") {
                    this.$router.push({
                        name: "search",
                        params: {search_name: this.inputName},
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
        }
    });
</script>
<style scoped lang="scss">
</style>
