<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="考试名称" prop="examTitle">
                    <el-input v-model="form.examTitle" class="width-unified"  placeholder="请输入主题"></el-input>
                </el-form-item>
                <el-form-item label="所属课程计划" prop="taskId">
                    <el-select v-model="form.taskId" placeholder="请选择课程计划" class="width-unified">
                        <el-option v-for="item in teachTaskList" :label="item.taskName" :value="item.taskId" :key="item.taskId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="考试开始时间">
                    <el-form-item  prop="startTime1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.startTime1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item   prop="startTime2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.startTime2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                 </el-form-item>
                <el-form-item  label="考试结束时间">
                    <el-form-item  prop="endTime1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.endTime1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item  prop="endTime2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.endTime2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="form.remark" class="width-unified"></el-input>
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
    import ExamInterface from '@/interfaces/examInterface';

    export default {
        data() {
            return {
                form:{
                    examId:'',
                    examTitle:'',
                    taskId:'',
                    startTime:'',
                    endTime:'',
                    startTime1:'',
                    startTime2:'',
                    endTime1:'',
                    endTime2:'',
                    remark:'',
                },
                teachTaskList:[],
                title:'',
                show: false,
                loading:false
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.form.examId==null || this.form.examId==''){
                        this.resetForm('form');
                    }
                }
            }
        },
        mounted(){
            this.initTeachTaskList();
        },
        methods: {
            initTeachTaskList(){
                let params={};
                CourseInterface.getTeachTaskList(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.teachTaskList=data.teachTaskList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            doSub(){
                this.loading=true;
                let params=Object.assign({},this.form);
                params.startTime=this.form.startTime1+' '+this.form.startTime2;
                params.endTime=this.form.endTime1+' '+this.form.endTime2;
                ExamInterface.addOrEditExamInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            resetForm(formName) {
                if (this.$refs[formName]!==undefined) {
                    this.$refs[formName].resetFields();
                }
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:250px;
    }
</style>
