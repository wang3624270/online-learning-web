<template>
    <div>
        <el-dialog title="课程评论" :visible.sync="show" width="1000px" v-loading="loading"  :close-on-click-modal="false">
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="loginName" label="登录名(学号)" width="100"></el-table-column>
                <el-table-column prop="perName" label="姓名" width="100"></el-table-column>
                <el-table-column prop="courseScoreStr" label="评分" width="50"></el-table-column>
                <el-table-column prop="comment" label="评论内容"></el-table-column>
                <el-table-column prop="createTimeStr" label="创建时间" width="100"></el-table-column>
                <el-table-column label="操作"  width="50px">
                    <template slot-scope="scope">
                        <el-button @click="deleteComment(scope.row.commentId)" type="text" size="mini">删除</el-button>
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
        methods: {
            search(){
                this.loading=true;
                let params={
                    taskId:this.taskId
                };
                CourseInterface.getCourseCommentList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.commentList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            deleteComment(id){
                this.loading=true;
                let params={
                    id:id
                };
                CourseInterface.deleteComment(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    };
</script>
<style scoped>
</style>
