<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" class="demo-form-inline" size="middle">
                    <el-form-item>
                        <el-button type="primary" @click="doReturn" size="middle" icon="el-icon-back">返回课程计划列表</el-button>
                    </el-form-item>
                    <el-form-item label="登录名(学号)">
                        <el-input v-model="form.loginName" placeholder="请输入登录名(学号)"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.perName" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="" size="middle" icon="el-icon-download">导出成绩报表</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="loginName" label="登录名(学号)"></el-table-column>
                    <el-table-column prop="perName" label="姓名"></el-table-column>
                    <el-table-column prop="perTypeCode" label="学生类型" :formatter="formatPerTypeCode"></el-table-column>
                    <el-table-column prop="completeDegree" label="课程学习完成度" :formatter="formatCompleteDegree"></el-table-column>
                    <el-table-column label="课程作业+课程实践">
                        <template slot-scope="scope">
                            <el-button @click="homeworkScoreLook(scope.row)" type="text" size="small">查看分数</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="examScore" label="在线考试分数"></el-table-column>
                    <el-table-column label="课程综合成绩">
                        <template slot-scope="scope">
                            <span>{{ formatgetScoreLevel(scope.row.scoreLevel)}}</span>
                            <el-popover placement="top" width="130" v-model="scope.row.show">
                                <div style="text-align: left; margin: 0">
                                    <el-button v-for="item in scoreLevels" :key="item.value" size="mini" type="text" @click="setScoreLevel(scope.row,item.value)">{{item.label}}</el-button>
                                </div>
                                <el-button slot="reference" type="text" size="small">设置</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-homework-score ref="homeworkScore"></portal-homework-score>
    </div>
</template>
<script>
    import StatisticsInterface from '@/interfaces/statisticsInterface';
    import {questionTypes} from '@/dictionary/examOptions.js'
    import HomeworkScore from './homeworkScore.vue';
    import {perTypeCodes} from '@/dictionary/manageOptions.js';
    import {scoreLevels} from '@/dictionary/statisticsOptions.js';

    export default {
        data() {
            return {
                form:{
                    loginName:'',
                    perName:'',
                },
                taskId:parseInt(this.$route.query.taskId),
                perTypeCodes:perTypeCodes,
                scoreLevels:scoreLevels,
                list:[],
                loading:false
            }
        },
        components: {
            'portal-homework-score':HomeworkScore
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                params.taskId=this.taskId;
                StatisticsInterface.getPersonScoreList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == StatisticsInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.personList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            formatPerTypeCode(row, column, val) {
                let str = '';
                this.perTypeCodes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            formatgetScoreLevel(val) {
                let str = '未设置';
                this.scoreLevels.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            formatCompleteDegree(row, column, val) {
                return (val*100).toFixed(2)+'%';
            },
            doReturn(){
                this.$router.go(-1);
            },
            homeworkScoreLook(task){
                this.$refs.homeworkScore.form=task;
                this.$refs.homeworkScore.show=true;
            },
            setScoreLevel(row,scoreLevel){
                this.loading=true;
                let params=row;
                params.scoreLevel=scoreLevel;
                StatisticsInterface.setPersonScoreLevel(params).then( (res) => {
                    this.loading=false;
                    if (res.re == StatisticsInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>
