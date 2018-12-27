<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="600px" v-loading="loading" :close-on-click-modal="false">
            <el-form :model="form"  label-width="80px">
                <el-form-item label="通知主题">
                    <el-input v-model="form.title" placeholder="请输入通知主题"></el-input>
                </el-form-item>
                <el-form-item label="通知内容">
                    <el-input type="textarea" :rows="6" v-model="form.content"  placeholder="请输入通知内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doSub">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';

    export default {
        data() {
            return {
                form:{
                    noticeId:'',
                    title:'',
                    content:''
                },
                title:'',
                show: false,
                loading:false
            };
        },
        watch: {
            show(val){
                if(val==true && this.form.noticeId==''){
                    this.resetForm();
                }
            }
        },
        methods: {
            doSub(){
                let params=this.form;
                ManageInterface.addOrEditNotice(params).then( (res) => {
                    if (res.re == ManageInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            resetForm(){
                this.form={
                    noticeId:'',
                    title:'',
                    content:''
                }
            }
        }
    };
</script>
<style scoped>

</style>
