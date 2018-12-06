<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="题目内容">
                        <el-input v-model="form.question" placeholder="请输入题目内容"></el-input>
                    </el-form-item>
                    <el-form-item label="题目类型">
                        <el-select v-model="form.questionType" placeholder="请选择题目类型">
                            <el-option v-for="item in questionTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="demo-form-inline" size="middle">
                    <el-form-item>
                        <el-button type="success" @click="addQuestion('1')" size="middle" icon="el-icon-circle-plus-outline">单选题</el-button>
                        <el-button type="success" @click="addQuestion('2')" size="middle" icon="el-icon-circle-plus-outline">多选题</el-button>
                        <el-button type="success" @click="addQuestion('3')" size="middle" icon="el-icon-circle-plus-outline">简答题</el-button>
                    </el-form-item>
                    <el-form-item label="选项个数">
                        <el-input-number v-model="optionNumber" :min="1" :max="6" size="small"></el-input-number>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="question" label="题目"></el-table-column>
                    <el-table-column prop="questionType" label="类型" width="70" :formatter="formatQuestionType"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="90">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteQuestion(scope.row.lectureId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-question-info  ref="questionInfo" @refresh-list="search"></portal-question-info>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import {questionTypes} from '@/dictionary/examOptions.js'
    import QuestionInfo from './questionInfo.vue';

    export default {
        data() {
            return {
                form:{
                    question:'',
                    questionType:''
                },
                optionNumber:4,
                questionTypes:questionTypes,
                list:[],
                loading:false
            }
        },
        components: {
            'portal-question-info':QuestionInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getQustionList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.questionList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
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
                this.$refs.questionInfo.form.questionId='';
                this.$refs.questionInfo.form.questionType=questionType;
                this.$refs.questionInfo.optionNumber=this.optionNumber;
                this.$refs.questionInfo.show=true;
                this.$refs.questionInfo.title='新增';
            },
            edit(row){
                this.data=row;
                this.$refs.questionInfo.form.questionId=row.questionId;
                this.$refs.questionInfo.form.question=row.question;
                this.$refs.questionInfo.form.questionType=row.questionType;
                this.$refs.questionInfo.optionList0=row.optionList;
                this.$refs.questionInfo.form.answer=row.answer;
                this.$refs.questionInfo.form.analysis=row.analysis;
                this.$refs.questionInfo.show=true;
                this.$refs.questionInfo.title='编辑';
            },
            deleteQuestion(){

            }
        }
    }
</script>
<style scoped>

</style>
