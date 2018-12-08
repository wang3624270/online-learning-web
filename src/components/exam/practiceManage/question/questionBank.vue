<template>
    <div>
        <el-dialog title="题库选取" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
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
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="question" label="题目"></el-table-column>
                <el-table-column prop="questionType" label="类型" width="70" :formatter="formatQuestionType"></el-table-column>
                <el-table-column fixed="right" label="操作" width="50">
                    <template slot-scope="scope">
                        <el-button @click="selectQustion(scope.row.questionId)" type="text" size="small">选取</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import {questionTypes} from '@/dictionary/examOptions.js'

    export default {
        data() {
            return {
                form:{
                    practiceId:'',
                    question:'',
                    questionType:''
                },
                questionTypes:questionTypes.slice(0,3),
                show: false,
                loading:false
            };
        },
        watch: {
            show(val){
                if(val==true){
                    this.search();
                }
            }
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getHouseQustionListOfPractice(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.questionList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            selectQustion(questionId){
                this.loading=true;
                let params={
                    questionId:questionId,
                    practiceId:this.form.practiceId
                };
                ExamInterface.addQuestionFormHouseOfPractice(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
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
        }
    };
</script>
<style scoped>

</style>
