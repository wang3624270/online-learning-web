<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程计划名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型">
                        <el-select v-model="form.courseType" placeholder="请选择课程类型">
                            <el-option v-for="item in courseTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
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
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="taskName" label="课程计划名称"></el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType"></el-table-column>
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
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import {courseTypes} from '@/components/course/courseManage/options.js';
    import {perTypeCodes} from '@/dictionary/manageOptions.js';

    export default {
        data() {
            return {
                form:{
                    taskName:'',
                    courseType:'',
                    loginName:'',
                    perName:''
                },
                list:[],
                courseTypes:courseTypes,
                perTypeCodes:perTypeCodes,
                loading:false
            }
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                ManageInterface.getPayRecordList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.payRecordList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            formatCourseType(row, column, val) {
                let str = '';
                this.courseTypes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
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
    }
</script>
<style scoped>

</style>
