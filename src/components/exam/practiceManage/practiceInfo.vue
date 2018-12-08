<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="600px" v-loading="loading" :close-on-click-modal="false">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="在线练习名称" prop="practiceTitle">
                    <el-input v-model="form.practiceTitle" class="width-unified"  placeholder="请输入主题"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doSub">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';

    export default {
        data() {
            return {
                form:{
                    practiceId:'',
                    practiceTitle:''
                },
                title:'',
                show: false,
                loading:false
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.form.practiceId==null || this.form.practiceId==''){
                        this.resetForm('form');
                    }
                }
            }
        },
        methods: {
            doSub(){
                this.loading=true;
                let params=Object.assign({},this.form);
                ExamInterface.addOrEditPracticeInfo(params).then( (res) => {
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
        width:400px;
    }
</style>
