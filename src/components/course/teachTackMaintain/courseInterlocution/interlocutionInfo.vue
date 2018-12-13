<template>
    <div>
        <el-dialog title="问题回复" :visible.sync="show" width="800px" v-loading="loading"  append-to-body>
            <el-form :model="form" size="middle">
                <el-form-item label="问题标题">
                    {{form.title}}
                </el-form-item>
                <el-form-item label="问题内容">
                    {{form.question}}
                </el-form-item>
                <el-form-item label="问题回复">
                    <el-input v-model="form.answer" :rows="2" placeholder="请输入问题回复" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitReply" >提交</el-button>
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
                    questionId:'',
                    title:'',
                    question:'',
                    answer:''
                },
                show: false,
                loading:false
            };
        },
        methods: {
            submitReply(){
                this.loading=true;
                let params=this.form;
                CourseInterface.submitInterlocutionReplay(params).then( (res) => {
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

</style>
