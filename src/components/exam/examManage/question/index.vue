<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" class="demo-form-inline" size="middle">
                    <el-form-item>
                        <el-button type="primary" @click="doReturn" size="middle" icon="el-icon-back">返回考试列表</el-button>
                    </el-form-item>
                    <el-form-item label="题目分值">
                        <el-input-number v-model="score" :min="1" :max="100" size="small"></el-input-number>
                    </el-form-item>
                    <el-form-item label="选项个数">
                        <el-input-number v-model="optionNumber" :min="1" :max="6" size="small"></el-input-number>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addQuestion('1')" size="middle" icon="el-icon-circle-plus-outline">单选题</el-button>
                        <el-button type="success" @click="addQuestion('2')" size="middle" icon="el-icon-circle-plus-outline">多选题</el-button>
                        <el-button type="success" @click="addQuestion('3')" size="middle" icon="el-icon-circle-plus-outline">简答题</el-button>
                        <el-button type="primary" @click="formBank" size="middle" icon="el-icon-menu">题库选取</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column prop="number" label="题号" width="50"></el-table-column>
                    <el-table-column prop="question" label="题目"></el-table-column>
                    <el-table-column prop="questionType" label="类型" width="70" :formatter="formatQuestionType"></el-table-column>
                    <el-table-column prop="score" label="分值" width="50"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="260">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="editScore(scope.row)" type="text" size="small">修改分值</el-button>
                            <el-button @click="adjust(scope.row.id,1)" size="mini" circle icon="el-icon-arrow-up" type="primary"></el-button>
                            <el-button @click="adjust(scope.row.id,0)" size="mini" circle icon="el-icon-arrow-down" type="primary"></el-button>
                            <el-button @click="cancel(scope.row.id)" type="text" size="small">删除关联</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-question-info  ref="questionInfo" @refresh-list="search"></portal-question-info>
        <portal-score-info  ref="socreInfo" @refresh-list="search"></portal-score-info>
        <portal-question-bank  ref="questionBank" @refresh-list="search"></portal-question-bank>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import {questionTypes} from '@/dictionary/examOptions.js'
    import QuestionInfo from './questionInfo.vue';
    import SocreInfo from './socreInfo.vue'
    import QuestionBank from './questionBank.vue'

    export default {
        data() {
            return {
                examId:this.$route.query.examId,
                score:2,
                optionNumber:4,
                questionTypes:questionTypes,
                list:[],
                loading:false
            }
        },
        components: {
            'portal-question-info':QuestionInfo,
            'portal-score-info':SocreInfo,
            'portal-question-bank':QuestionBank
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params={
                    examId:this.examId
                };
                ExamInterface.getExamQustionList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.examQustionList;
                    } else {
                        this.$router.push({
                            path: '/index/exam/examManage'
                        });
                    }
                });
            },
            formatQuestionType(row, column, val) {
                let str = '';
                this.questionTypes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            addQuestion(questionType){
                this.$refs.questionInfo.form.examId=this.examId;
                this.$refs.questionInfo.form.score=this.score;
                this.$refs.questionInfo.form.questionId='';
                this.$refs.questionInfo.form.questionType=questionType;
                this.$refs.questionInfo.optionNumber=this.optionNumber;
                this.$refs.questionInfo.show=true;
                this.$refs.questionInfo.title='新增';
            },
            edit(row){
                this.$refs.questionInfo.form.questionId=row.questionId;
                this.$refs.questionInfo.form.question=row.question;
                this.$refs.questionInfo.form.questionType=row.questionType;
                this.$refs.questionInfo.optionList0=row.optionList;
                this.$refs.questionInfo.form.answer=row.answer;
                this.$refs.questionInfo.form.analysis=row.analysis;
                this.$refs.questionInfo.show=true;
                this.$refs.questionInfo.title='编辑';
            },
            cancel(id){
                this.loading=true;
                let params={
                    id:id
                };
                ExamInterface.deleteExamQuestionR(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            doReturn(){
                this.$router.go(-1);
            },
            adjust(id,direction){
                this.loading=true;
                let params={
                    id:id,
                    direction:direction
                };
                ExamInterface.adjustExamQuestion(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            editScore(row){
                this.$refs.socreInfo.form.id=row.id;
                this.$refs.socreInfo.form.score=row.score;
                this.$refs.socreInfo.show=true;
            },
            formBank(){
                this.$refs.questionBank.form.examId=this.examId;
                this.$refs.questionBank.score=this.score;
                this.$refs.questionBank.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
