<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程作业名称">
                        <el-input v-model="form.name" placeholder="请输入课程作业名称"></el-input>
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
                    <el-table-column prop="name" label="课程作业名称"></el-table-column>
                    <el-table-column prop="taskName" label="所属课程计划"></el-table-column>
                    <el-table-column prop="courseName" label="所属课程"></el-table-column>
                    <el-table-column prop="startDate" label="提交开始时间" width="150"></el-table-column>
                    <el-table-column prop="endDate" label="提交结束时间" width="150"></el-table-column>
                    <el-table-column prop="total" label="总人数" width="70"></el-table-column>
                    <el-table-column prop="submit" label="已提交" width="70"></el-table-column>
                    <el-table-column  label="未提交" width="70">
                        <template slot-scope="scope">
                            {{scope.row.total-scope.row.submit}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="check(scope.row)" type="text" size="small">批改作业</el-button>
                            <el-button @click="deleteHomework(scope.row.homeworkId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-homework-info ref="homeworkInfo" @refresh-list="search"></portal-homework-info>
        <portal-homework-check ref="homeworkCheck" @refresh-list="search"></portal-homework-check>
    </div>
</template>
<script>
    import HomeworkInfo from './homeworkInfo/index.vue';
    import HomeworkCheck from './homeworkCheck/index.vue';
    import HomeworkInterface from '@/interfaces/homeworkInterface';

    export default {
        data() {
            return {
                form:{
                    name:'',
                    taskName:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-homework-info':HomeworkInfo,
            'portal-homework-check':HomeworkCheck
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                HomeworkInterface.getHomeworkList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.homeworkList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteHomework(homeworkId){

            },
            addHomework(){
                this.$refs.homeworkInfo.title='新增';
                this.$refs.homeworkInfo.form.homeworkId='';
                this.$refs.homeworkInfo.show=true;
            },
            edit(homework){
                this.$refs.homeworkInfo.form.homeworkId=homework.homeworkId;
                this.$refs.homeworkInfo.form.name=homework.name;
                this.$refs.homeworkInfo.form.taskId=homework.taskId;
                this.$refs.homeworkInfo.form.startTime1=homework.startDate.substring(0,10);
                this.$refs.homeworkInfo.form.startTime2=homework.startDate.substring(11);
                this.$refs.homeworkInfo.form.endTime1=homework.endDate.substring(0,10);
                this.$refs.homeworkInfo.form.endTime2=homework.endDate.substring(11);
                this.$refs.homeworkInfo.form.content=homework.content;
                this.$refs.homeworkInfo.show=true;
                this.$refs.homeworkInfo.title='编辑';
            },
            check(homework){
                this.$refs.homeworkCheck.form.homeworkId=homework.homeworkId;
                this.$refs.homeworkCheck.form.taskId=homework.taskId;
                this.$refs.homeworkCheck.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
