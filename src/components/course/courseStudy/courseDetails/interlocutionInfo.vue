<template>
    <div>
        <el-dialog title="我要提问" :visible.sync="show" width="600px" v-loading="loading"  append-to-body>
            <el-form :inline="true" :model="form" class="demo-form-inline" size="middle" label-width="100px">
                <el-form-item label="问题标题">
                    <el-input v-model="form.title"  placeholder="请输入问题回复" class="unified_style"></el-input>
                </el-form-item>
                <el-form-item label="问题内容">
                    <el-input v-model="form.question" :rows="2" placeholder="请输入问题回复" type="textarea" class="unified_style"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitQuestion" >提交</el-button>
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
                    title:'',
                    question:''
                },
                show: false,
                loading:false
            };
        },
        methods: {
            submitQuestion(){
                this.loading=true;
                let params=this.form;
                CourseInterface.submitInterlocutionQuestion(params).then( (res) => {
                    this.loading=false;
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
    .unified_style{
        width: 400px;
    }
</style>
