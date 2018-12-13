<template>
    <div>
        <el-dialog title="课程公告" :visible.sync="show" width="800px" v-loading="loading"  :close-on-click-modal="false">
            <el-button type="primary" @click="addNews" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="title" label="公告标题"></el-table-column>
                <el-table-column prop="content" label="公告内容"></el-table-column>
                <el-table-column prop="createTimeStr" label="创建时间"></el-table-column>
                <el-table-column label="操作"  width="100px">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="mini">编辑</el-button>
                        <el-button @click="deleteNews(scope.row.newsId)" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
            <portal-notice-info ref="noticeInfo" @refresh-list="search"></portal-notice-info>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import NoticeInfo from './noticeInfo.vue';

    export default {
        data() {
            return {
                taskId:'',
                show: false,
                list:[],
                loading:false
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.search();
                }
            }
        },
        components:{
            "portal-notice-info":NoticeInfo,
        },
        methods: {
            search(){
                this.loading=true;
                let params={
                    taskId:this.taskId
                };
                CourseInterface.getAllTaskNewsInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.newsList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            deleteNews(newsId){
                this.loading=true;
                let params={
                    newsId:newsId
                };
                CourseInterface.deleteTaskNews(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            addNews(){
                this.$refs.noticeInfo.form.taskId=this.taskId;
                this.$refs.noticeInfo.show=true;
            },
            edit(news){
                this.$refs.noticeInfo.form.taskId=this.taskId;
                this.$refs.noticeInfo.form.title=news.title;
                this.$refs.noticeInfo.form.content=news.content;
                this.$refs.noticeInfo.form.newsId=news.newsId;
                this.$refs.noticeInfo.show=true;
            }
        }
    };
</script>
<style scoped>
</style>
