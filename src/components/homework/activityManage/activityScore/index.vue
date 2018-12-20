<template>
    <div>
        <el-dialog title="选课人员列表" :visible.sync="show" width="800px" v-loading="loading"  :close-on-click-modal="false">
            <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                <el-form-item label="登录名(学号)">
                    <el-input v-model="form.loginName" placeholder="请输入登录名(学号)"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.perName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="loginName" label="登录名(学号)"></el-table-column>
                <el-table-column prop="perName" label="姓名"></el-table-column>
                <el-table-column label="分数"  fixed="right">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.grade+''" placeholder="请输入分数" style="width: 120px"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitScore" >提交</el-button>
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
                    taskId:'',
                    homeworkId:'',
                    loginName:'',
                    perName:''
                },
                show: false,
                list:[],
                loading:false
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.search();
                }
            }
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                HomeworkInterface.getActivitySelectList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.selectList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            submitScore(){
                this.loading=true;
                let params={
                    selectList:this.list
                };
                HomeworkInterface.submitScore(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
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
