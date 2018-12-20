<template>
    <div>
        <el-dialog :title="form.activityName" :visible.sync="show" width="800px">
            <el-form  :model="form" size="middle"  label-width="80px">
                <el-form-item label="实践目标">
                    <el-input type="textarea" :rows="5" v-model="form.goal" class="width-unified" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close">关闭</el-button>
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
                    activityName:'',
                    goal:''
                },
                show: false
            };
        },
        methods: {
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
