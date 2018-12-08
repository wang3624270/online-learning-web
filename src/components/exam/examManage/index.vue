<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="考试名称">
                        <el-input v-model="form.examTitle" placeholder="请输入考试名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程计划名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程计划名称"></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="addLecture" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="examTitle" label="考试名称"></el-table-column>
                    <el-table-column prop="taskName" label="所属课程计划"></el-table-column>
                    <el-table-column prop="courseName" label="所属课程"></el-table-column>
                    <el-table-column label="考试试题">
                        <template slot-scope="scope">
                            <el-button @click="questionExam(scope.row)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startDate" label="考试开始时间" width="150"></el-table-column>
                    <el-table-column prop="endDate" label="考试结束时间" width="150"></el-table-column>
                    <el-table-column label="考试成绩" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.finish!='1'">考试未结束</span>
                            <el-button @click="calcluate(scope.row)" type="text" size="small"v-if="scope.row.finish=='1' && scope.row.state=='0'">点击公布成绩</el-button>
                            <el-button @click="seeScore(scope.row)" type="text" size="small"v-if="scope.row.finish=='1' && scope.row.state=='1'">查看学生成绩</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">考试信息</el-button>
                            <el-button @click="deleteExam(scope.row.examId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-exam-info ref="examInfo" @refresh-list="search"></portal-exam-info>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import ExamInfo from './examInfo.vue';

    export default {
        data() {
            return {
                form:{
                    examTitle:'',
                    taskName:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-exam-info':ExamInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getExamList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.examList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteExam(lectureId){

            },
            addLecture(){
                this.$refs.examInfo.title='新增';
                this.$refs.examInfo.form.examId='';
                this.$refs.examInfo.show=true;
            },
            edit(exam){
                this.$refs.examInfo.form.examId=exam.examId;
                this.$refs.examInfo.form.examTitle=exam.examTitle;
                this.$refs.examInfo.form.taskId=exam.taskId;
                this.$refs.examInfo.form.startTime1=exam.startDate.substring(0,10);
                this.$refs.examInfo.form.startTime2=exam.startDate.substring(11);
                this.$refs.examInfo.form.endTime1=exam.endDate.substring(0,10);
                this.$refs.examInfo.form.endTime2=exam.endDate.substring(11);
                this.$refs.examInfo.form.remark=exam.remark;
                this.$refs.examInfo.show=true;
                this.$refs.examInfo.title='编辑';
            },
            questionExam(params){
                this.$router.push({
                    path: '/index/exam/questionExam',
                    query: { examId: params.examId }
                });
            },
            calcluate(exam){
                this.loading=true;
                let params={
                    examId:exam.examId
                };
                ExamInterface.calculateScore(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            seeScore(){

            }
        }
    }
</script>
<style scoped>

</style>
