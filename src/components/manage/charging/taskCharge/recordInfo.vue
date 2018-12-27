<template>
    <div>
        <el-dialog title="付费记录" :visible.sync="show" width="1000px" v-loading="loading"  :close-on-click-modal="false">
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
                <el-table-column prop="mobilePhone" label="联系方式"></el-table-column>
                <el-table-column prop="perTypeCode" label="学生类型" :formatter="formatPerTypeCode"></el-table-column>
                <el-table-column prop="payNumber" label="流水号"></el-table-column>
                <el-table-column prop="amount" label="支付金额" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.amount}}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payMode" label="付款方式"></el-table-column>
                <el-table-column prop="createTimeStr" label="付款时间" width="100"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import {perTypeCodes} from '@/dictionary/manageOptions.js';

    export default {
        data() {
            return {
                form:{
                    loginName:'',
                    perName:'',
                    state:''
                },
                taskId:'',
                perTypeCodes:perTypeCodes,
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
                params.taskId=this.taskId;
                ManageInterface.getCourseChargeList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.personList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            formatPerTypeCode(row, column, val) {
                let str = '';
                this.perTypeCodes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            }
        }
    };
</script>
<style scoped>

</style>
