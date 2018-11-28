<template>
    <div>
        <el-form  :model="form" label-width="100px">
            <el-form-item label="课程名称:">
                {{form.courseName}}
            </el-form-item>
            <el-form-item label="课程英文名称">
                {{form.courseEngName}}
            </el-form-item>
            <el-form-item label="课程类型">
                {{form.courseTypeStr}}
            </el-form-item>
            <el-form-item label="开课学院">
                {{form.collegeName}}
            </el-form-item>
            <el-form-item label="课程教师">
                {{form.teachGroup}}
            </el-form-item>
            <el-form-item label="指定书目">
                {{form.book}}
            </el-form-item>
            <el-form-item label="课程简介">
                {{form.briefIntroduction}}
            </el-form-item>
            <el-form-item label="参考资料">
                {{form.reference}}
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import {courseTypes} from '../../courseManage/options.js';

    export default {
        data() {
            return {
                form:{
                    courseId:this.data.courseId,
                    courseName:'',
                    courseEngName:'',
                    courseType:'',
                    courseTypeStr:'',
                    collegeId:'',
                    collegeName:'',
                    teachGroup:'',
                    book:'',
                    reference:'',
                    briefIntroduction:''
                },
                courseTypes:courseTypes.slice(1),
                colleges:[]
            };
        },
        mounted(){
            this.initCourseInfo(this.form.courseId);
        },
        props:['data'],
        methods: {
            initCourseInfo(courseId){
                let params={courseId:parseInt(courseId)};
                CourseInterface.getCourseInfo(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.form=Object.assign(this.form,data.courseInfo);
                        this.form.collegeId=this.form.collegeId+'';
                        this.courseTypes.forEach((item)=>{
                            if(item.value==this.form.courseType){
                                this.form.courseTypeStr=item.label;
                            }
                        });
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                }).then(()=>{
                    this.initColleges();
                });
            },
            initColleges(){
                let params={};
                CourseInterface.getAllCollegeOption(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.colleges=data.colleges;
                        this.colleges.forEach((item)=>{
                            if(item.value==this.form.collegeId){
                                this.form.collegeName=item.label;
                            }
                        });
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
        }
    };
</script>
<style scoped>
</style>
