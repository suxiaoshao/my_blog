<template>
    <div class="router blog_article">
        <el-container>
            <el-header height="61px">
                <my-navigation></my-navigation>
            </el-header>
            <el-main v-loading="loading">

                <br/>

                <!-- 目录 -->
                <el-dialog title="目录" :visible.sync="dialogVisible" :fullscreen="is_phone">
                    <el-menu default-active="2" class="el-menu-vertical-demo">
                        <el-menu-item v-for="(item,index) in article_data.directory" :key="index"
                                      @click="go_to_hash(item)">
                            <span slot="title">{{item}}</span>
                        </el-menu-item>
                    </el-menu>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 文章内容 -->
                <el-row>
                    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
                        <article-content :article_data="article_data" id="title"></article-content>
                    </el-col>
                </el-row>
                <br/>
                <br/>

                <!-- 文章评论 -->
                <el-row>
                    <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:14,offset:5}">
                        <article-reply ref="reply" :aid="Number(aid)" @reply_num_update="reply_update"
                                       :reply_num="Number(article_data.reply_num)"></article-reply>
                    </el-col>
                </el-row>

                <!-- 工具球 -->
                <div class="tool-ball">
                    <el-dropdown trigger="click" @command="handleCommand">
                        <el-button type="primary" icon="el-icon-more-outline" circle></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">回到顶部</el-dropdown-item>
                            <el-dropdown-item command="b">目录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <record-show></record-show>
            </el-main>
        </el-container>
    </div>
</template>
<script lang="ts">
    import content from "../components/article_show.vue";
    import Reply from "../components/article_reply.vue";
    import record_show from "../components/record_show.vue";
    import navigation from "../components/Navigavition.vue";
    import Vue from "vue"
    import {ArticleData} from "@/assets/interface";

    interface Data{
        article_data:ArticleData
        dialogVisible: boolean
        loading: boolean
    }
    export default Vue.extend({
        name: "blog_article",
        components: {
            "article-content": content,
            "article-reply": Reply,
            "record-show": record_show,
            "my-navigation": navigation
        },
        data():Data {
            return {
                // 文章数据
                article_data: {
                    title: "", // 文章标题
                    time_str: "", // 时间字符串
                    content: "", // 文章内容
                    time_stamp: 0, // 时间戳
                    directory: [], // 目录
                    type: null, // 文章类型
                    read_num: 0, //阅读次数
                    reply_num: -1 //评论次数
                },
                dialogVisible: false, // 目录是否显示
                loading: false
            };
        },
        created() {
            // 页面加载时，获取文章信息
            this.get_base();
        },
        methods: {
            // 获取文章信息
            get_base():void {
                this.loading = true;
                this.axios
                    .post("https://www.sushao.top/api/blog/article/base", {
                        aid: this.aid
                    })
                    .then(response => {
                        // 成功返回正确数据后 页面名字和文章内容获取
                        if (response.data.success) {
                            this.loading = false;
                            this.article_data = response.data.article_data;
                            window.document.title = response.data.article_data.title;
                            // @ts-ignore
                            this.$refs.reply.get_reply()
                        } else {
                            this.loading = false;
                            this.$notify({
                                title: "错误",
                                message: "没有此文章",
                                duration: 0,
                                type: "error"
                            });
                            this.$router.push({name: "Home"});
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            // 工具球点击
            handleCommand(item: string):void {
                if (item === "a") {
                    const title = document.getElementById("title")
                    if (title !== null) {
                        title.scrollIntoView()
                    }
                } else if (item === "b") {
                    this.dialogVisible = true;
                }
            },
            // 点击目录跳转到hash
            go_to_hash(hash: string):void {
                const title = document.getElementById(hash)
                if (title !== null) {
                    title.scrollIntoView()
                }
                this.dialogVisible = false;
            },
            // 子组件更新评论数
            reply_update(value: number):void {
                this.article_data.reply_num = value
            }
        },
        watch: {
            // 监听aid是否发生变化如果变化,执行get_base()
            aid():void {
                this.get_base();
            }
        },
        computed: {
            // 是否为手机
            is_phone():boolean {
                return document.documentElement.clientWidth <= 750;
            },
            // 文章的aid
            aid() :number{
                return Number(this.$route.params.aid);
            }
        }
    })
</script>
<style scoped lang="scss">
    .dialog-footer {
        .el-button:nth-child(0n+1) {
            float: left;
        }
    }

    .tool-ball {
        position: fixed;
        right: 10%;
        bottom: 10%;
    }
</style>
