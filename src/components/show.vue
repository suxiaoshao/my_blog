<template>
    <div class="show">
        <el-row>
            <el-link @click="go_to_article(article_aid)">
                <el-card :body-style="{ padding: '0px' }" style="background-color:rgba(255,255,255,0.7)">
                    <!-- 标题  -->
                    <div class="title">
                        <span>{{title}}</span>
                    </div>

                    <!-- 信息栏 -->
                    <div style="text-align: center;">
                        <!-- 文章类型 -->
                        <el-link :underline="false" style="margin-right: 10px;font-size: 16px;"
                                 @click="go_to_classification(type)">
                            <i class="el-icon-view el-icon--right"></i>
                            <span>{{article_type[type]}}</span>
                        </el-link>

                        <!-- 最后编辑时间 -->
                        <span style="margin-right: 10px;color: #606266;">
              <i class="el-icon-time"></i>
              {{time_str}}
            </span>
                    </div>
                    <br/>

                    <!-- 图片 -->
                    <el-image :src="'https://www.sushao.top/api/blog/home/img/'+img_key%3">
                        <div slot="placeholder" class="image-slot">
                            <img src="../assets/image/loading.png" alt="loading" class="image"/>
                        </div>
                    </el-image>
                </el-card>
            </el-link>
        </el-row>
    </div>
</template>
<script lang="ts">
    import Vue from "vue"

    export default Vue.extend({
        name: "show",
        props: {
            title: String as ()=>string, //文章标题
            type: Number as ()=>number, // 文章类型
            time_str: String as ()=>string, // 最后编辑时间
            article_aid: Number as ()=>number, //文章标号
            img_key: Number as ()=>number //图片标号
        },
        data() {
            return {
                article_type: ["学习", "代码", "其他", "工具"] //文章类型列表
            };
        },
        methods: {
            go_to_article(aid: number) {
                this.$router.push({name: "blog_article", params: {aid: String(aid)}})
            },
            go_to_classification(type: number) {
                this.$router.push({name: "classification", params: {tid: String(type)}})
            }
        }
    });
</script>
<style scoped lang="scss">
    .image {
        width: 100%;
        display: block;
    }

    .title {
        color: grey;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        text-align: center;
        font-size: 25px;
        line-height: 1.4;
    }
</style>
