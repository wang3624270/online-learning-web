<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程名称">
                        <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型">
                        <el-select v-model="form.courseType" placeholder="请选择课程类型">
                            <el-option v-for="item in courseTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="addCourse" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column label="课程封面" width="160">
                        <template slot-scope="scope">
                            <img v-if="scope.row.coverImgAcc" :src='getImgSrc(scope.row.coverImgAcc)' alt='封面图片' class="cover-img">
                            <img src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' class="cover-img" v-else>
                        </template>
                    </el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType"></el-table-column>
                    <el-table-column prop="teachGroup" label="任课教师"></el-table-column>
                    <el-table-column prop="collegeName" label="开课学院"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.courseId)" type="text" size="small">课程信息</el-button>
                            <el-button @click="deleteCourse(scope.row.courseId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-course-info ref="courseInfo" @refresh-list="search"></portal-course-info>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import TimeFormatUtils from '@/kit/timeFormatUtils';
    import CourseInfo from './courseInfo.vue';
    import {courseTypes} from './options.js';

    export default {
        data() {
            return {
                form:{
                    courseName:'',
                    courseType:''
                },
                list:[],
                courseTypes:courseTypes,
                loading:false
            }
        },
        components: {
            'portal-course-info':CourseInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getCourseList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.courseList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteCourse(courseId){
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
            addCourse(){
                this.$refs.courseInfo.show=true;
                this.$refs.courseInfo.title='新增';
                this.$refs.courseInfo.form={
                    courseId:'',
                    courseName:'',
                    courseEngName:'',
                    courseType:'',
                    collegeId:'',
                    teachGroup:'',
                    book:'',
                    reference:'',
                    briefIntroduction:'',
                    coverImgAcc:'',
                    subject:''
                };
            },
            edit(courseId){
                this.$refs.courseInfo.show=true;
                this.$refs.courseInfo.title='编辑';
                this.$refs.courseInfo.form.courseId=courseId;
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
        }
    }
</script>
<style scoped>
    .cover-img{
        width:144px;
        height:84px
    }
</style>
