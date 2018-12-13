<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="500px" append-to-body>
            <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
                <el-form-item label="课程资料名称">
                    <el-input v-model="form.folderName" class="width-unified"  placeholder="请输入课程资料名称"></el-input>
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
                form:{
                    taskId:'',
                    folderId:'',
                    folderName:''
                },
                title:'',
                show: false,
            };
        },
        methods: {
            doSub(){
                let params=this.form;
                CourseInterface.addOrEditCourseResource(params).then( (res) => {
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
    .width-unified{
        width:280px;
    }
</style>
