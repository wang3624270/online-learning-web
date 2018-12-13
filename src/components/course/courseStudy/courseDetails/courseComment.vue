<template>
    <div>
        <ul class="tpl-task-list tpl-task-remind" id="commentList"  v-loading="loading">
            <li>
                <div class="head-icon">
                    <span class="tpl-header-list-user-ico">
                        <img src="@/components/framepage/assets/img/user.png">
                    </span>
                </div>
                <div class="comment-body-1">
                    <div class="am-form am-form-horizontal">
                        <textarea class="comment" rows="5" id="user-comment" placeholder="输入课程评价" v-model="form.comment"></textarea>
                        <div class="am-form-group score-panel fix">
                            <small>评分：</small>
                            <el-rate style="float:right"
                                v-model="form.score" :texts="['极差','较差','一般','满意','非常好']"
                                show-text>
                            </el-rate>
                            <small id="comment-alert" style="color:red;"></small>
                        </div>
                        <div class="save-btn">
                            <button @click="submitComment" type="button" class="am-btn am-btn-primary" style="background-color: #4db14d;font-size: 15px;">发表评论</button>
                        </div>
                    </div>
                </div>
            </li>
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
                        <span class="comment-time-1">时间 : {{item.createTimeStr}}</span>
                        <span>评分 : {{item.courseScoreStr}}</span>
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
                    comment:'',
                    score: null
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
            },
            submitComment(){
                this.loading=true;
                let params=this.form;
                params.score=params.score+'';
                CourseInterface.addCourseComment(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.form.comment='';
                        this.form.score='';
                        this.$message.success('操作成功！😊');
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
    @import "../assets/css/studentCourseDetails.css";
</style>
