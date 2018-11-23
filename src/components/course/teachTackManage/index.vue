<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程计划名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型">
                        <el-select v-model="form.courseType" placeholder="请选择课程类型">
                            <el-option v-for="item in courseTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="addTeachTask" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="taskName" label="课程计划名称"></el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType"></el-table-column>
                    <el-table-column label="课程节次">
                        <template slot-scope="scope">
                            <el-button @click="editCourseSection(scope.row.taskId)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startDate" label="开始日期"></el-table-column>
                    <el-table-column prop="endDate" label="结束日期"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.taskId,scope.row.taskName,scope.row.courseId,scope.row.startDate,scope.row.endDate,scope.row.remark)" type="text" size="small">课程计划信息</el-button>
                            <el-button @click="download(scope.row.taskId)" type="text" size="small">课程人员</el-button>
                            <el-button @click="download(scope.row.taskId)" type="text" size="small">课程公告</el-button>
                            <el-button @click="deleteTask(scope.row.taskId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-task-info ref="taskInfo" @refresh-list="search"></portal-task-info>
        <portal-section-info ref="sectionInfo"></portal-section-info>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import TaskInfo from './taskInfo.vue';
    import SectionInfo from './courseSection.vue';
    import {courseTypes} from '../courseManage/options.js';

    export default {
        data() {
            return {
                form:{
                    taskName:'',
                    courseType:''
                },
                list:[],
                courseTypes:courseTypes,
                loading:false
            }
        },
        components: {
            'portal-task-info':TaskInfo,
            'portal-section-info':SectionInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getTeachTaskList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.teachTaskList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteTask(courseId){
                this.$confirm('此操作将永久删除该群组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={courseId:parseInt(courseId)};
                    CourseInterface.deleteCourse(params).then( (res) => {
                        if (res.re == CourseInterface.SUCCESS) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.search();
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addTeachTask(){
                this.$refs.taskInfo.show=true;
                this.$refs.taskInfo.title='新增';
                this.$refs.taskInfo.form={
                    taskId:'',
                    taskName:'',
                    courseId:'',
                    startTime:'',
                    endTime:'',
                    remark:'',
                };
                this.$refs.taskInfo.dateRange=[];
            },
            edit(taskId,taskName,courseId,startTime,endTime,remark){
                this.$refs.taskInfo.show=true;
                this.$refs.taskInfo.title='编辑';
                this.$refs.taskInfo.form={
                    taskId:taskId,
                    taskName:taskName,
                    courseId:courseId+'',
                    startTime:startTime,
                    endTime:endTime,
                    remark:remark
                };
                this.$refs.taskInfo.dateRange=[startTime,endTime];
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
            editCourseSection(taskId){
                this.$refs.sectionInfo.show=true;
                this.$refs.sectionInfo.taskId=taskId;
            }
        }
    }
</script>
<style scoped>

</style>
