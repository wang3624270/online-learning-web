<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="800px">
            <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="课程计划名称">
                    <el-input v-model="form.taskName" class="width-unified"  placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="课程">
                    <el-select v-model="form.courseId" placeholder="请选择课程" class="width-unified">
                        <el-option v-for="item in courses" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起止日期">
                    <el-date-picker
                        v-model="dateRange"
                        type="daterange"
                        align="right"
                        placeholder="请选择起止日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :clearable="true" unlink-panels
                        :editable="false">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark"  placeholder="请输入参考资料" style="width:350px;"></el-input>
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

    export default {
        data() {
            return {
                form:{
                    taskId:'',
                    taskName:'',
                    courseId:'',
                    startTime:'',
                    endTime:'',
                    remark:'',
                },
                courses:[],
                dateRange:[],
                title:'',
                show: false,
            };
        },
        watch: {
            dateRange(val) {
                if(!val || val.length == 0){
                    this.form.startTime = '';
                    this.form.endTime = '';
                } else{
                    this.form.startTime = val[0];
                    this.form.endTime = val[1];
                }
            }
        },
        mounted(){
          this.initCourses();
        },
        methods: {
            initCourses(){
                let params={};
                CourseInterface.getAllCourseOption(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.courses=data.courses;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            doSub(){
                let params=this.form;
                CourseInterface.addOrEditTeachTask(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:250px;
    }
</style>
