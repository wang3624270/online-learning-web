<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="800px" v-loading="loading">
            <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="课程名称">
                    <el-input v-model="form.courseName" class="width-unified"  placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程英文名称">
                    <el-input v-model="form.courseEngName" class="width-unified" placeholder="请输入课程英文名称"></el-input>
                </el-form-item>
                <el-form-item label="课程类型">
                    <el-select v-model="form.courseType" placeholder="请选择课程类型" class="width-unified">
                        <el-option v-for="item in courseTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开课学院">
                    <el-select v-model="form.collegeId" placeholder="请选择开课学院" class="width-unified">
                        <el-option v-for="item in colleges" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程教师">
                    <el-input v-model="form.teachGroup" class="width-unified"  placeholder="请输入课程教师"></el-input>
                </el-form-item>
                <el-form-item label="指定书目">
                    <el-input v-model="form.book" class="width-unified"  placeholder="请输入指定书目"></el-input>
                </el-form-item>
                <el-form-item label="课程简介">
                    <el-input type="textarea" v-model="form.briefIntroduction"  placeholder="请输入课程简介"  class="width-unified"></el-input>
                </el-form-item>
                <el-form-item label="参考资料">
                    <el-input type="textarea" v-model="form.reference"  placeholder="请输入参考资料"  class="width-unified"></el-input>
                </el-form-item>
                <el-form-item label="课程封面" v-show="form.courseId!=''">
                    <div>
                        <el-upload class="avatar-uploader" :action="uploadUrl"
                                   :data="form"
                                   :show-file-list="false"
                                   :before-upload="beforeAvatarUpload"
                                   :on-success="handleAvatarSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doSub">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import {courseTypes} from './options.js';
    import "./style.css"

    export default {
        data() {
            return {
                form:{
                    courseId:'',
                    courseName:'',
                    courseEngName:'',
                    courseType:'',
                    collegeId:'',
                    teachGroup:'',
                    book:'',
                    reference:'',
                    briefIntroduction:'',
                    coverImgAcc:''
                },
                personId:'',
                courseTypes:courseTypes.slice(1),
                colleges:[],
                title:'',
                show: false,
                uploadUrl:CourseInterface.uploadCoverImg(),
                loading:false
            };
        },
        watch: {
            'form.courseId'(val) {
                if(val!=null && val!=''){
                    this.initCourseInfo(val);
                }
            }
        },
        computed:{
            imageUrl(){
                return CourseInterface.coverImgUrl(this.form.coverImgAcc);
            }
        },
        beforeMount(){
            let params={};
            ManageInterface.getPersonInfo(params).then( (res) => {
                if (res.re == CourseInterface.SUCCESS) {
                    let data=res.data;
                    this.personId=data.personId;
                } else {
                    this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                }
            });
        },
        mounted(){
          this.initColleges();
        },
        methods: {
            initCourseInfo(courseId){
                let params={courseId:courseId};
                CourseInterface.getCourseInfo(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.form=Object.assign(this.form,data.courseInfo);
                        this.form.collegeId=this.form.collegeId+'';
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            initColleges(){
                let params={};
                CourseInterface.getAllCollegeOption(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.colleges=data.colleges;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            doSub(){
                let params=this.form;
                CourseInterface.addOrEditCourseInfo(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        if(this.form.courseId==null || this.form.courseId==''){
                            this.form.courseId=res.data.courseId;
                            this.$message.success('操作成功！😊,请继续添加课程封面。');
                            this.$emit('refresh-list');
                        }else {
                            this.show = false;
                            this.$message.success('操作成功！😊');
                            this.$emit('refresh-list');
                        }
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            beforeAvatarUpload(){
              this.form.personId=this.personId;
            },
            handleAvatarSuccess(){
                this.initCourseInfo(this.form.courseId);
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:250px;
    }
</style>
