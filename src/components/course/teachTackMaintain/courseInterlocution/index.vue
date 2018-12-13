<template>
    <div>
        <el-dialog title="课程问答" :visible.sync="show" width="1000px" v-loading="loading"  :close-on-click-modal="false">
            <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                <el-form-item label="问题回复状态">
                    <el-select v-model="form.state" placeholder="请选择问题回复状态">
                        <el-option v-for="item in answerStates" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="loginName" label="登录名(学号)" width="110"></el-table-column>
                <el-table-column prop="perName" label="姓名" width="80"></el-table-column>
                <el-table-column prop="title" label="问题标题"></el-table-column>
                <el-table-column prop="question" label="问题内容"></el-table-column>
                <el-table-column prop="createTimeStr" label="提问时间" width="100"></el-table-column>
                <el-table-column prop="answer" label="问题回复"></el-table-column>
                <el-table-column prop="startDate" label="回复时间" width="100"></el-table-column>
                <el-table-column label="操作"  width="80px">
                    <template slot-scope="scope">
                        <el-button @click="reply(scope.row)" type="text" size="mini">回复</el-button>
                        <el-button @click="deleteQustion(scope.row.questionId)" type="text" size="mini">删除提问</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
            <portal-interlocution-info ref="interlocutionInfo" @refresh-list="search"></portal-interlocution-info>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import InterlocutionInfo from './interlocutionInfo.vue';
    import {answerStates} from '@/dictionary/courseOptions.js'

    export default {
        data() {
            return {
                form:{
                    taskId:'',
                    state:''
                },
                show: false,
                answerStates:answerStates,
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
            "portal-interlocution-info":InterlocutionInfo,
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getCourseInterlocutionList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.questionList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            deleteQustion(questionId){
                this.loading=true;
                let params={
                    questionId:questionId
                };
                CourseInterface.deleteInterlocution(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            reply(params){
                this.$refs.interlocutionInfo.form.questionId=params.questionId;
                this.$refs.interlocutionInfo.form.title=params.title;
                this.$refs.interlocutionInfo.form.question=params.question;
                this.$refs.interlocutionInfo.form.answer=params.answer;
                this.$refs.interlocutionInfo.show=true;
            }
        }
    };
</script>
<style scoped>
</style>
