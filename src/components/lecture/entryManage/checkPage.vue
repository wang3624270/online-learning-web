<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="800px" :close-on-click-modal="false">
            <el-table :data="applyList" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50px"></el-table-column>
                <el-table-column prop="perNum" label="用户名"></el-table-column>
                <el-table-column prop="perName" label="姓名" ></el-table-column>
                <el-table-column prop="mobilePhone" label="联系方式"></el-table-column>
                <el-table-column prop="createTimeStr" label="报名时间"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="pass(scope.row.entryId)" type="text" size="small" :disable="scope.row.show" v-if="scope.row.state=='0' || scope.row.state=='2'">通过</el-button>
                        <el-button @click="notPass(scope.row.entryId)" type="text" size="small" :disable="scope.row.show" v-if="scope.row.state=='1' || scope.row.state=='0'">不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';


    export default {
        data() {
            return {
                form:{

                },
                title:'',
                applyList:[],
                show: false
            };
        },
        methods: {
            pass(entryId){
                let params={
                    entryId:entryId,
                    state:'1'
                };
                LectureInterface.applyCheck(params).then( (res) => {
                    if (res.re == LectureInterface.SUCCESS) {
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                        this.$emit('refresh-applyList');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            notPass(entryId){
                this.$prompt('请输入不通过原因', '审核不通过', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ refuseReason }) => {
                    let params={
                        entryId:entryId,
                        state:'2',
                        refuseReason:refuseReason
                    };
                    LectureInterface.applyCheck(params).then( (res) => {
                        if (res.re == LectureInterface.SUCCESS) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            }
        }
    };
</script>
<style scoped>

</style>
