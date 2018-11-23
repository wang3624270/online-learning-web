<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="500px">
            <el-form label-width="90px">
                <el-form-item label="学期名称">
                    <el-input v-model="params.termName" placeholder="请输入学期名称"></el-input>
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
                        :editable="false" style="width: 100%;">
                    </el-date-picker>
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
                params:{
                    termId:'',
                    termName:'',
                    startTime:'',
                    endTime:''
                },
                dateRange:[],
                title:'',
                show: false
            };
        },
        watch: {
            dateRange(val) {
                if(!val || val.length == 0){
                    this.params.startTime = '';
                    this.params.endTime = '';
                } else{
                    this.params.startTime = val[0];
                    this.params.endTime = val[1];
                }
            }
        },
        methods: {
            doSub(){
                let params=this.params;
                CourseInterface.addOrEditTerm(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
        }
    };
</script>
