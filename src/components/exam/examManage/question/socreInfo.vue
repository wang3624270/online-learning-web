<template>
    <div>
        <el-dialog title="编辑分数" :visible.sync="show" width="500px" v-loading="loading">
            <el-form :model="form" ref="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="题目分值">
                    <el-input-number v-model="form.score" :min="1" :max="100" size="small"></el-input-number>
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
                    id:'',
                    score:''
                },
                show: false,
                loading:false
            };
        },
        methods: {
            doSub(){
                this.loading=true;
                let params=this.form;
                ExamInterface.editExamQuestionScore(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
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

</style>
