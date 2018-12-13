<template>
    <div>
        <ul class="tpl-task-list tpl-task-remind" id="commentList"  v-loading="loading">
            <li>
                <div>
                    <button @click="addQuestion" type="button" class="am-btn am-btn-primary" style="background-color: #4db14d;font-size: 15px;">我要提问</button>
                </div>
            </li>
            <!-- 这里是评论列表 -->
            <li name="comment-li" v-for="item in list" :key="item.questionId">
                <div class="head-icon">
                    <span class="tpl-header-list-user-ico">
                        <img src="@/components/framepage/assets/img/user.png">
                    </span>
                </div>
                <div class="comment-body">
                    <div class="comment-name">{{item.perName}} </div>
                    <div class="comment-content">问题标题 : {{item.title}}</div>
                    <div class="comment-content">问题内容 : {{item.question}}</div>
                    <div class="comment-time">
                        <span class="comment-time-1">提问时间 : {{item.createTimeStr}}</span>
                    </div>
                    <div class="comment-content" v-if="item.state=='1'">教师回复 : {{item.answer}}</div>
                    <div class="comment-time" v-if="item.state=='1'">
                        <span class="comment-time-1">回复时间 : {{item.startDate}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <portal-interlocution-info ref="interlocutionInfo" @refresh-list="search"></portal-interlocution-info>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import InterlocutionInfo from './interlocutionInfo.vue';

    export default {
        data() {
            return {
                form:{
                    taskId:parseInt(this.data.taskId),
                    title:'',
                    question: ''
                },
                list:[],
                loading:false
            };
        },
        mounted(){
            this.search();
        },
        components:{
            "portal-interlocution-info":InterlocutionInfo,
        },
        props:['data'],
        methods: {
            search(){
                let params={
                    taskId:parseInt(this.data.taskId)
                };
                CourseInterface.getCourseInterlocutionList(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.questionList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            addQuestion(){
                this.$refs.interlocutionInfo.form={
                    taskId:this.form.taskId,
                    title:'',
                    question:''
                };
                this.$refs.interlocutionInfo.show=true;
            }
        }
    };
</script>
<style scoped>
    @import "../assets/css/studentCourseDetails.css";
</style>
