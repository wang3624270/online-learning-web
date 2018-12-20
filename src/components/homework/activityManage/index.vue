<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程实践名称">
                        <el-input v-model="form.activityName" placeholder="请输入课程实践名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程计划名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程计划名称"></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="addHomework" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="activityName" label="课程实践名称"></el-table-column>
                    <el-table-column prop="taskName" label="所属课程计划"></el-table-column>
                    <el-table-column prop="courseName" label="所属课程"></el-table-column>
                    <el-table-column prop="place" label="地点" width="150"></el-table-column>
                    <el-table-column prop="startDate" label="实践开始时间" width="150"></el-table-column>
                    <el-table-column prop="endDate" label="实践结束时间" width="150"></el-table-column>
                    <el-table-column prop="total" label="总人数" width="70"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="check(scope.row)" type="text" size="small">提交分数</el-button>
                            <el-button @click="deleteActivity(scope.row.homeworkId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-activity-info ref="activityInfo" @refresh-list="search"></portal-activity-info>
        <portal-activity-score ref="activityScore" @refresh-list="search"></portal-activity-score>
    </div>
</template>
<script>
    import ActivityInfo from './activityInfo/index.vue';
    import ActivityScore from './activityScore/index.vue';
    import HomeworkInterface from '@/interfaces/homeworkInterface';

    export default {
        data() {
            return {
                form:{
                    activityName:'',
                    taskName:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-activity-info':ActivityInfo,
            'portal-activity-score':ActivityScore
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                HomeworkInterface.getActivityList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.activityList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteActivity(activityId){

            },
            addHomework(){
                this.$refs.activityInfo.title='新增';
                this.$refs.activityInfo.form.activityId='';
                this.$refs.activityInfo.show=true;
            },
            edit(activity){
                this.$refs.activityInfo.form.activityId=activity.activityId;
                this.$refs.activityInfo.form.place=activity.place;
                this.$refs.activityInfo.form.activityName=activity.activityName;
                this.$refs.activityInfo.form.goal=activity.goal;
                this.$refs.activityInfo.form.taskId=activity.taskId;
                this.$refs.activityInfo.form.startTime1=activity.startDate.substring(0,10);
                this.$refs.activityInfo.form.startTime2=activity.startDate.substring(11);
                this.$refs.activityInfo.form.endTime1=activity.endDate.substring(0,10);
                this.$refs.activityInfo.form.endTime2=activity.endDate.substring(11);
                this.$refs.activityInfo.show=true;
                this.$refs.activityInfo.title='编辑';
            },
            check(activity){
                this.$refs.activityScore.form.activityId=activity.activityId;
                this.$refs.activityScore.form.taskId=activity.taskId;
                this.$refs.activityScore.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
