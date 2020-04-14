<template>
    <div id="article-content">
        <el-card shadow="hover" style="background-color:rgba(255,255,255,0.7)">
            <div slot="header">
                <div style="text-align: center;font-size: 1.5rem;margin: 20px auto;">{{article_data.title}}</div>
                <div style="text-align: center;">
                    <span style="margin-right: 10px;color: #606266;">{{"#"+article_data.read_num+'次阅读'}}</span>
                    <el-link :underline="false" style="margin-right: 10px;font-size: 16px;"
                             @click="go_to_classification(article_data.type)">
                        <i class="el-icon-view el-icon--right"></i>
                        <span>{{article_type[article_data.type]}}</span>
                    </el-link>
                    <span style="margin-right: 10px;color: #606266;">
            <i class="el-icon-time"></i>
            {{article_data.time_str}}
          </span>
                </div>
            </div>
            <MarkdownPreview :initialValue="article_data.content" theme="dark"
                             style="background-color:transparent"></MarkdownPreview>
        </el-card>
    </div>
</template>
<script>
    import MarkdownPreview from "../../components/markdown/preview";

    export default {
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
            article_data: Object
        },
        methods: {
            go_to_classification(type) {
                this.$router.push({name: "classification", params: {tid: type}})
            }
        }
    };
</script>
<style scoped>
</style>