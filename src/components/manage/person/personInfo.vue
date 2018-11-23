<template>
    <div>
        <el-dialog title="编辑群组" :visible.sync="show" width="500px">
            <el-form label-width="90px">
                <el-form-item label="用户群组">
                    <el-select v-model="params.groupid" placeholder="请选择用户群组">
                        <el-option v-for="item in groupids" :label="item.name" :value="item.groupid" :key="item.groupid"></el-option>
                    </el-select>
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
                    sysusrid:'',
                    groupid:''
                },
                groupids:[],
                show: false
            };
        },
        methods: {
            doSub(){
                let params=this.params;
                ManageInterface.setUserGroup(params).then( (res) => {
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
