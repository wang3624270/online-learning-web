<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="500px">
            <el-form label-width="90px">
                <el-form-item label="群组名称">
                    <el-input v-model="params.name" placeholder="请输入群组名称">
                    </el-input>
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
                params:{
                    name:''
                },
                title:'',
                show: false
            };
        },
        methods: {
            doSub(){
                let params=this.params;
                ManageInterface.addOrEditGroup(params).then( (res) => {
                    if (res.re == ManageInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
        }
    };
</script>
