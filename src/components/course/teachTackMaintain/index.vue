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
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="taskName" label="课程计划名称"></el-table-column>
                    <el-table-column label="课程封面" width="155">
                        <template slot-scope="scope">
                            <img v-if="scope.row.coverImgAcc" :src='getImgSrc(scope.row.coverImgAcc)' alt='封面图片' class="cover-img">
                            <img src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' class="cover-img" v-else>
                        </template>
                    </el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType"></el-table-column>
                    <el-table-column prop="startDate" label="开始日期" width="100"></el-table-column>
                    <el-table-column prop="endDate" label="结束日期" width="100"></el-table-column>
                    <el-table-column label="课程人员">
                        <template slot-scope="scope">
                            <el-button @click="editCoursePerson(scope.row.taskId)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程公告">
                        <template slot-scope="scope">
                            <el-button @click="editCourseNotice(scope.row.taskId)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程问答">
                        <template slot-scope="scope">
                            <el-button @click="editCourseInterlocution(scope.row.taskId)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程评论">
                        <template slot-scope="scope">
                            <el-button @click="editCourseComment(scope.row.taskId)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-course-person ref="coursePerson" @refresh-list="search"></portal-course-person>
        <portal-course-notice ref="courseNotice" @refresh-list="search"></portal-course-notice>
        <portal-course-interlocution ref="courseInterlocution" @refresh-list="search"></portal-course-interlocution>
        <portal-course-comment ref="courseComment" @refresh-list="search"></portal-course-comment>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import {courseTypes} from '../courseManage/options.js';
    import CoursePerson from './coursePerson/index.vue';
    import CourseNotice from './courseNotice/index.vue';
    import CourseInterlocution from './courseInterlocution/index.vue';
    import CourseComment from './courseComment/index.vue';

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
            "portal-course-person":CoursePerson,
            "portal-course-notice":CourseNotice,
            "portal-course-interlocution":CourseInterlocution,
            "portal-course-comment":CourseComment
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
            formatCourseType(row, column, val) {
                let str = '';
                this.courseTypes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            getImgSrc(coverImgAcc){
                return CourseInterface.coverImgUrl(coverImgAcc);
            },
            editCoursePerson(taskId){
                this.$refs.coursePerson.taskId=taskId;
                this.$refs.coursePerson.show=true;
            },
            editCourseNotice(taskId){
                this.$refs.courseNotice.taskId=taskId;
                this.$refs.courseNotice.show=true;
            },
            editCourseInterlocution(taskId){
                this.$refs.courseInterlocution.form.taskId=taskId;
                this.$refs.courseInterlocution.show=true;
            },
            editCourseComment(taskId){
                this.$refs.courseComment.taskId=taskId;
                this.$refs.courseComment.show=true;
            }
        }
    }
</script>
<style scoped>
    .cover-img{
        width:144px;
        height:84px
    }
</style>
