<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程类型">
                        <el-select v-model="form.courseType" placeholder="请选择课程类型">
                            <el-option v-for="item in courseTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="taskName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType" width="80"></el-table-column>
                    <el-table-column prop="startDate" label="开始日期" width="100"></el-table-column>
                    <el-table-column prop="endDate" label="结束日期" width="100"></el-table-column>
                    <el-table-column prop="completeDegree" label="课程学习完成度" :formatter="formatCompleteDegree"></el-table-column>
                    <el-table-column label="课程作业+课程实践">
                        <template slot-scope="scope">
                            <el-button @click="homeworkScoreLook(scope.row)" type="text" size="small">查看分数</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="examScore" label="在线考试分数" width="110"></el-table-column>
                    <el-table-column label="课程综合成绩">
                        <template slot-scope="scope">
                            <span>{{ formatgetScoreLevel(scope.row.scoreLevel)}}</span>
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
    import CourseInterface from '@/interfaces/courseInterface';
    import {courseTypes} from '@/components/course/courseManage/options.js';
    import {scoreLevels} from '@/dictionary/statisticsOptions.js';
    import HomeworkScore from '@/components/statistics/scoreManage/studentScore/homeworkScore.vue';

    export default {
        data() {
            return {
                form:{
                    taskName:'',
                    courseType:''
                },
                list:[],
                courseTypes:courseTypes,
                scoreLevels:scoreLevels,
                loading:false
            }
        },
        mounted(){
            this.search();
        },
        components: {
            'portal-homework-score':HomeworkScore
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getPersonalCoursesList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.courseList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            formatCourseType(row, column, val) {
                let str = '';
                this.courseTypes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            formatgetScoreLevel(val) {
                let str = '';
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
            homeworkScoreLook(task){
                this.$refs.homeworkScore.form=task;
                this.$refs.homeworkScore.show=true;
            },
        }
    }
</script>
<style scoped>
    .cover-img{
        width:144px;
        height:84px
    }
</style>
