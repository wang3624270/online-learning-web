<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="课程名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型">
                        <el-select v-model="form.courseType" placeholder="请选择课程类型">
                            <el-option v-for="item in courseTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="taskName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType"></el-table-column>
                    <el-table-column prop="payNumber" label="流水号"></el-table-column>
                    <el-table-column prop="amount" label="支付金额(元)"></el-table-column>
                    <el-table-column prop="payMode" label="付款方式"></el-table-column>
                    <el-table-column prop="createTimeStr" label="付款时间"></el-table-column>
                </el-table>
            </el-main>

        </el-container>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import {courseTypes} from '@/components/course/courseManage/options.js';

    export default {
        data() {
            return {
                form:{
                    taskName:'',
                    courseType:''
                },
                courseTypes:courseTypes,
                list:[],
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
                ManageInterface.getPersonalPayList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.recordList;
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
            }
        }
    }
</script>
<style scoped>

</style>
