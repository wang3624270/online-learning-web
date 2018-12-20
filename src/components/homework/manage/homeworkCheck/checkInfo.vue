<template>
    <div>
        <el-dialog title="批改课程作业" :visible.sync="show" width="800px" v-loading="loading"  append-to-body>
            <el-form :inline="true" :model="form" size="middle" class="demo-form-inline" label-width="100px">
                <el-form-item label="登录名(学号)">
                    <el-input v-model="form.loginName"  class="width-unified" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.perName"  class="width-unified" disabled></el-input>
                </el-form-item>
                <el-form-item label="提交时间">
                    <el-input v-model="form.createTimeStr"  class="width-unified" disabled></el-input>
                </el-form-item>
                <el-form-item label="作业成绩">
                    <el-input v-model="form.score" placeholder="请输入作业成绩" class="width-unified"></el-input>
                </el-form-item>
                <el-form-item label="作业内容">
                    <el-input type="textarea" :rows="7" v-model="form.answerContent" style="width: 600px" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitScore" v-if="this.form.createTimeStr">提交</el-button>
                <el-button type="primary" @click="close" v-else>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import HomeworkInterface from '@/interfaces/homeworkInterface';

    export default {
        data() {
            return {
                form:{
                    title:'',
                    loginName:'',
                    createTimeStr:'',
                    score:'',
                    answerContent:''
                },
                show: false,
                loading:false
            };
        },
        methods: {
            submitScore(){
                this.loading=true;
                let params=this.form;
                HomeworkInterface.submitHomeworkScore(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:260px;
    }
</style>
