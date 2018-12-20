<template>
    <div>
        <el-dialog title="直播参数设置" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="120px">
                <el-form-item label="推流地址" prop="pushUrl">
                    <el-input v-model="form.pushUrl" class="width-unified"  placeholder="请输入推流地址"></el-input>
                </el-form-item>
                <el-form-item label="直播输出流地址" prop="outputUrl">
                    <el-input v-model="form.outputUrl" class="width-unified"  placeholder="请输入直播输出流地址"></el-input>
                </el-form-item>
                <el-form-item  label="直播开始时间">
                    <el-form-item  prop="startTime1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.startTime1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item   prop="startTime2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.startTime2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item  label="直播结束时间">
                    <el-form-item  prop="endTime1">
                        <el-date-picker type="date" :editable="false" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.endTime1"></el-date-picker> -
                    </el-form-item>
                    <el-form-item  prop="endTime2">
                        <el-time-picker type="fixed-time" :editable="false" placeholder="选择时间" v-model="form.endTime2" value-format="HH:mm:ss"></el-time-picker>
                    </el-form-item>
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

    export default {
        data() {
            return {
                form:{
                    lectureId:'',
                    pushUrl:'',
                    outputUrl:'',
                    startTime:'',
                    endTime:'',
                    startTime1:'',
                    startTime2:'',
                    endTime1:'',
                    endTime2:'',
                },
                show: false,
                loading:false
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.search();
                }
            }
        },
        methods: {
            search(){
                this.loading=true;
                let params={
                    lectureId:this.form.lectureId
                };
                LectureInterface.getLectureLiveInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.form=Object.assign(this.form,data);
                        this.form.startTime1=this.form.startTime.substring(0,10);
                        this.form.endTime1=this.form.endTime.substring(0,10);
                        this.form.startTime2=this.form.startTime.substring(11);
                        this.form.endTime2=this.form.endTime.substring(11);
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
                LectureInterface.submitLiveInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == LectureInterface.SUCCESS) {
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
        width:230px;
    }
</style>
