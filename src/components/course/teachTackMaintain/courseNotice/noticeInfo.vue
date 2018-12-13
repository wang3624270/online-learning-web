<template>
    <div>
        <el-dialog title="新增" :visible.sync="show" width="600px" v-loading="loading"  append-to-body>
            <el-form :model="form" size="middle" label-width="80px">
                <el-form-item label="公告标题">
                    <el-input v-model="form.title" placeholder="请输入公告标题" style="width: 450px"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input v-model="form.content" :rows="2" type="textarea"  style="width: 450px" placeholder="请输入公告内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitNews" >提交</el-button>
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
                    newsId:'',
                    taskId:'',
                    title:'',
                    content:''
                },
                show: false,
                list:[],
                loading:false
            };
        },
        methods: {
            submitNews(){
                this.loading=true;
                let params=this.form;
                CourseInterface.addOrEditTaskNews(params).then( (res) => {
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
