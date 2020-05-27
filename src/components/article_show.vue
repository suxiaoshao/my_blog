<template>
    <div class="article-content">
        <el-card shadow="hover">
            <div slot="header">
                <div class="title">{{article_data.title}}</div>
                <div class="info">
                    <span style="margin-right: 10px;color: #606266;">{{"#"+article_data.read_num+'次阅读'}}</span>
                    <el-link :underline="false" @click="go_to_classification(article_data.type)">
                        <i class="el-icon-view el-icon--right"></i>
                        <span>{{article_type[article_data.type]}}</span>
                    </el-link>
                    <span><i class="el-icon-time"></i>{{article_data.time_str}}</span>
                </div>
            </div>
            <MarkdownPreview class="my-show" :initialValue="article_data.content" theme="dark"></MarkdownPreview>
        </el-card>
    </div>
</template>
<script lang="ts">

    // @ts-ignore
    import {MarkdownPreview} from 'vue-meditor'
    import Vue from "vue"
    import {ArticleData} from "@/assets/interface";

    export default Vue.extend({
        name: "article-content",
        components: {
            MarkdownPreview: MarkdownPreview
        },
        data() {
            return {
                article_type: ['学习', '代码', '其他', '工具']
            }
        },
        props: {
            article_data: Object as ()=>ArticleData
        },
        methods: {
            go_to_classification(type:number) {
                this.$router.push({name: "classification", params: {tid: String(type)}})
            }
        }
    });
</script>
<style lang="scss">
    .article-content {
        .el-card {
            background-color: rgba(255, 255, 255, 0.7);

            .title {
                text-align: center;
                font-size: 1.5rem;
                margin: 20px auto;
            }

            .info {
                text-align: center;

                span {
                    margin-right: 10px;
                    color: #606266;
                }
            }

            .my-show {
                background-color: transparent;

                .markdown-preview {
                    background-color: rgba(255, 255, 255, 0.2)
                }
            }
        }
    }
</style>
