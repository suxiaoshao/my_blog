<template>
    <div class="router classification">
        <el-container>
            <el-header height="61px">
                <my-navigation active-index="1"></my-navigation>
            </el-header>
            <el-main>

                <el-row>
                    <el-col :xs="{span:24,offset:0}" :sm="{span:14,offset:5}" :md="{span:12,offset:6}">
                        <!-- 文章类型选择器 -->

                        <div id="title">
                            <el-row :gutter="40">
                                <el-col :span="6" v-for="(item,index) in article_type" :key="item">
                                    <el-button :href="'/classification?type='+String(index)" style="width: 100%"
                                               :disabled="index===Number(type)" type="primary" @click="go_to_url(index)"
                                    >{{item}}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <br/>

                        <!-- 文章的展示 -->
                        <div v-loading="loading">
                            <div v-for="(item,index) in all_data" :key="index">
                                <show
                                    :title="item.title"
                                    :article_aid="String(item.aid)"
                                    :type="Number(item.type)"
                                    :time_str="item.time_str"
                                    :img_key="String(index)"
                                ></show>
                                <br/>
                                <br/>
                            </div>
                        </div>

                        <!-- 导航栏 -->
                        <div class="block" style="background-color:rgba(255,255,255, 0.7)">
                            <el-pagination
                                :hide-on-single-page="true"
                                @current-change="handleCurrentChange"
                                :current-page="real_page"
                                :page-size="limit_num"
                                layout="prev, pager, next,jumper"
                                :total="article_num"
                                :pager-count="5"
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
    import navigation from "../components/Navigavition.vue";
    import show from "../components/show.vue";
    import record_show from "../components/record_show.vue";
    import Vue from "vue"
    import {ArticleListData} from "@/assets/interface";

    interface Data{
        article_num:number
        limit_num:number
        all_data:ArticleListData[]
        article_type:string[]
        real_page:number
        loading:boolean
    }
    export default Vue.extend({
        name: "classification",
        data():Data {
            return {
                article_num: 0, //总文章数
                limit_num: 10, // 获取文章list的总数
                all_data: [], //文章list
                article_type: ["学习", "代码", "其他", "工具"], // 文章类型总数
                real_page: Number(this.$route.query.page), //显示的页面数量
                loading: false //页面是否在加载中
            };
        },
        // 导入文章展示组件show和导航栏组件navigation
        components: {
            "my-navigation": navigation,
            "show": show,
            "record-show": record_show
        },
        methods: {
            handleCurrentChange(val:Number):void {
                this.$router.push({
                    name: "classification",
                    params: {tid: String(this.type)},
                    query: {page: String(val)}
                });
            },
            // 根据类型选择器跳转到相应url
            go_to_url(tid:Number):void {
                this.$router.push({name: "classification", params: {tid: String(tid)}});
            },
            // 获取文章总数
            get_base():void {
                this.loading = true;
                this.axios
                    .post("https://www.sushao.top/api/blog/home/base", {
                        find_condition: {type: this.type}
                    })
                    .then(response => {
                        if (response.data.success) {
                            this.article_num = response.data.article_num;
                            if (this.article_num === 0) {
                                this.$notify({
                                    title: "警告",
                                    message: "还没有篇文章",
                                    duration: 0,
                                    type: "warning"
                                });
                                this.all_data = [];
                                this.loading = false;
                            } else {
                                this.get_data();
                                const title=document.getElementById("title")
                                if(title!==null){
                                    title.scrollIntoView()
                                }
                            }
                        } else {
                            this.$notify({
                                title: "错误",
                                message: "请刷新试试",
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
            // 获取文章list数据
            get_data():void {
                this.loading = true;
                this.axios
                    .post("https://www.sushao.top/api/blog/home/article_list", {
                        find_condition: {type: this.type}, //文章的限制
                        limit_num: this.limit_num, //获取的总数
                        offset: this.offset //偏移量
                    })
                    .then(response => {
                        if (response.data.success) {
                            this.loading = false;
                            this.all_data = response.data.data;
                        } else {
                            this.loading = false;
                            this.$notify({
                                title: "错误",
                                message: "自动转到第一页",
                                duration: 0,
                                type: "error"
                            });
                            this.$router.push({name: "classification", params: {tid: String(this.type)}});
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            }
        },
        computed: {
            // 文章的类型编号
            type():number {
                return Number(this.$route.params.tid);
            },
            // 文章偏移量
            offset():number {
                return (this.page - 1) * this.limit_num;
            },
            // 页面页数
            page():number {
                if (this.$route.query.page === undefined) {
                    return 1;
                } else {
                    return Number(this.$route.query.page);
                }
            }
        },
        watch: {
            type() {
                this.get_base();
            },
            page() {
                this.get_base();
            }
        },
        mounted() {
            // 获取文章总数和list数据
            this.get_base();
        }
    });
</script>

<style scoped lang="scss">
</style>
