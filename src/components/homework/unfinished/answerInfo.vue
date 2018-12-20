<template>
    <div>
        <el-dialog title="提交课程作业" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
            <el-form  :model="form" size="middle"  label-width="80px">
                <el-form-item label="作业名称">
                    {{form.name}}
                </el-form-item>
                <el-form-item label="作业要求">
                    <el-input type="textarea" :rows="7" v-model="form.content" class="width-unified" disabled></el-input>
                </el-form-item>
                <el-form-item label="作业内容">
                    <el-input type="textarea" :rows="7" v-model="form.answerContent" class="width-unified"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAnswer" v-if="this.form.subState=='1'">提交</el-button>
                <el-button type="primary" @click="close" v-else>关闭</el-button>
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
                    homeworkId:'',
                    name:'',
                    content:'',
                    answerContent:''
                },
                show: false,
                loading:false
            };
        },
        methods: {
            submitAnswer(){
                this.loading=true;
                let params=this.form;
                HomeworkInterface.addOrEditHomeworkAnswer(params).then( (res) => {
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
        width:650px;
    }
</style>
