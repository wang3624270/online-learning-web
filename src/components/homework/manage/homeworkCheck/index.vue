<template>
    <div>
        <el-dialog title="选课人员列表" :visible.sync="show" width="1000px" v-loading="loading"  :close-on-click-modal="false">
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
                <el-table-column prop="createTimeStr" label="作业提交时间"></el-table-column>
                <el-table-column prop="score" label="分数"></el-table-column>
                <el-table-column prop="checkTimeStr" label="作业批改时间"></el-table-column>
                <el-table-column label="操作"  width="50px" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="check(scope.row)" type="text" size="mini">批改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
            <portal-homework-info ref="checkInfo" @refresh-list="search"></portal-homework-info>
        </el-dialog>
    </div>
</template>
<script>
    import HomeworkInterface from '@/interfaces/homeworkInterface';
    import CheckInfo from './checkInfo.vue';

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
        components:{
            "portal-homework-info":CheckInfo
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                HomeworkInterface.getHomeworkSelectList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.selectList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            check(homework){
                this.$refs.checkInfo.form=homework;
                this.$refs.checkInfo.show=true;
            }
        }
    };
</script>
<style scoped>
</style>
