<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="主题" prop="theme">
                    <el-input v-model="form.theme" class="width-unified"  placeholder="请输入主题"></el-input>
                </el-form-item>
                <el-form-item label="地点" prop="place">
                    <el-input v-model="form.place" class="width-unified" placeholder="请输入地点"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="lectureType">
                    <el-select v-model="form.lectureType" placeholder="请选择课程类型" class="width-unified">
                        <el-option v-for="item in lectureTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主办学院"  prop="collegeId">
                    <el-select v-model="form.collegeId" placeholder="请选择主办学院" class="width-unified">
                        <el-option v-for="item in colleges" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主讲"  prop="speaker">
                    <el-input v-model="form.speaker" class="width-unified"  placeholder="请输入主讲"></el-input>
                </el-form-item>
                <el-form-item label="最大报名人数"  prop="maxNumber">
                    <el-input-number size="small" v-model="form.maxNumber"  class="width-unified" :min="1" :max="10000" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="简介"  prop="introduce">
                    <el-input type="textarea" v-model="form.introduce"  placeholder="请输入简介"  :rows="5" style="width:620px;"></el-input>
                </el-form-item>
                <el-form-item  label="报名开始时间">
                    <el-form-item  prop="registStart1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.registStart1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item   prop="registStart2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.registStart2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                 </el-form-item>
                <el-form-item  label="报名结束时间">
                    <el-form-item  prop="registEnd1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.registEnd1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item   prop="registEnd2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.registEnd2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item  label="活动开始时间">
                    <el-form-item  prop="startTime1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.startTime1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item   prop="startTime2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.startTime2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item  label="活动结束时间">
                    <el-form-item  prop="endTime1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.endTime1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item   prop="endTime2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.endTime2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="宣传图" v-show="form.lectureId!=''" prop="coverImgAcc">
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
    import LectureInterface from '@/interfaces/lectureInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import CourseInterface from '@/interfaces/courseInterface';
    import {lectureTypes} from './options.js';
    import "./style.css"
    import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {
        components: {ElFormItem},
        data() {
            return {
                form:{
                    lectureId:'',
                    theme:'',
                    startTime:'',
                    endTime:'',
                    place:'',
                    lectureType:'',
                    maxNumber:'',
                    registStart:'',
                    registEnd:'',
                    coverImgAcc:'',
                    speaker:'',
                    collegeId:'',
                    introduce:'',
                    registStart1:'',
                    registStart2:'',
                    registEnd1:'',
                    registEnd2:'',
                    startTime1:'',
                    startTime2:'',
                    endTime1:'',
                    endTime2:''
                },
                personId:'',
                lectureTypes:lectureTypes.slice(1),
                colleges:[],
                title:'',
                show: false,
                uploadUrl:LectureInterface.uploadCoverImg(),
                loading:false
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.form.lectureId!=null && this.form.lectureId!=''){
                        this.initLectureInfo(this.form.lectureId);
                    }else {
                        this.resetForm('form');
                    }
                }
            }
        },
        computed:{
            imageUrl(){
                if(this.form.coverImgAcc!=null && this.form.coverImgAcc!=''){
                    return LectureInterface.coverImgUrl(this.form.coverImgAcc);
                }else {
                    return '';
                }
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
            initLectureInfo(lectureId){
                let params={lectureId:lectureId};
                LectureInterface.getLectureInfo(params).then( (res) => {
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.form=Object.assign(this.form,data.lectureInfo);
                        this.form.collegeId=this.form.collegeId+'';
                        this.form.registStart1=this.form.registStart.substring(0,10);
                        this.form.registEnd1=this.form.registEnd.substring(0,10);
                        this.form.startTime1=this.form.startTimeStr.substring(0,10);
                        this.form.endTime1=this.form.endTimeStr.substring(0,10);
                        this.form.registStart2=this.form.registStart.substring(11);
                        this.form.registEnd2=this.form.registEnd.substring(11);
                        this.form.startTime2=this.form.startTimeStr.substring(11);
                        this.form.endTime2=this.form.endTimeStr.substring(11);
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
                let params=Object.assign({},this.form);
                params.registStart=this.form.registStart1+' '+this.form.registStart2;
                params.registEnd=this.form.registEnd1+' '+this.form.registEnd2;
                params.startTime=this.form.startTime1+' '+this.form.startTime2;
                params.endTime=this.form.endTime1+' '+this.form.endTime2;
                params.collegeId=parseInt(this.form.collegeId);
                LectureInterface.addOrEditLectureInfo(params).then( (res) => {
                    if (res.re == LectureInterface.SUCCESS) {
                        if(this.form.lectureId==null || this.form.lectureId==''){
                            this.form.lectureId=res.data.lectureId;
                            this.$message.success('操作成功！😊,请继续添加宣传图。');
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
                this.initLectureInfo(this.form.lectureId);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:250px;
    }
</style>
