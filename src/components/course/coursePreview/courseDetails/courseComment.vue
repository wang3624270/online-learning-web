<template>
    <div>
        <ul class="tpl-task-list tpl-task-remind" id="commentList"  v-loading="loading">
            <!-- 这里是评论列表 -->
            <li name="comment-li" v-for="item in commentList" :key="item.commentId">
                <div class="head-icon">
                    <span class="tpl-header-list-user-ico">
                        <img src="@/components/framepage/assets/img/user.png">
                    </span>
                </div>
                <div class="comment-body">
                    <div class="comment-name">{{item.perName}}</div>
                    <div class="comment-content">{{item.comment}}</div>
                    <div class="comment-time">
                        <span class="comment-time-1">时间:{{item.createTimeStr}}</span>
                        <span>评分：{{item.courseScoreStr}}</span>
                    </div>
                </div>
            </li>
       </ul>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';

    export default {
        data() {
            return {
                form:{
                    taskId:parseInt(this.data.taskId),
                },
                commentList:[],
                loading:false
            };
        },
        mounted(){
            this.search();
        },
        props:['data'],
        methods: {
            search(){
                let params={taskId:parseInt(this.data.taskId)};
                CourseInterface.getCourseCommentList(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.commentList=data.commentList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    };
</script>
<style scoped>
    @import "../../courseStudy/assets/css/studentCourseDetails.css";
</style>
