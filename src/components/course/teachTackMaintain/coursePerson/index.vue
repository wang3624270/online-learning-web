<template>
    <div>
        <el-dialog title="课程人员" :visible.sync="show" width="1000px" v-loading="loading"  :close-on-click-modal="false">
            <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                <el-form-item label="登录名(学号)">
                    <el-input v-model="form.loginName" placeholder="请输入登录名(学号)"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.perName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="关联类型">
                    <el-select v-model="form.state" placeholder="请选择关联类型">
                        <el-option v-for="item in mapTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="selectAdd" size="middle" icon="el-icon-circle-plus-outline">选择添加</el-button>
                    <el-button type="primary" @click="search" size="middle" icon="el-icon-upload2">批量导入</el-button>
                    <el-button @click="" type="text" size="mini">下载导入模板</el-button>
                </el-form-item>
            </el-form>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="loginName" label="登录名(学号)"></el-table-column>
                <el-table-column prop="perName" label="姓名"></el-table-column>
                <el-table-column prop="mobilePhone" label="联系方式"></el-table-column>
                <el-table-column prop="perTypeCode" label="学生类型" :formatter="formatPerTypeCode"></el-table-column>
                <el-table-column prop="state" label="关联类型" :formatter="formatMapType"></el-table-column>
                <el-table-column prop="price" label="课程付费(元)"></el-table-column>
                <el-table-column label="操作"  width="50px">
                    <template slot-scope="scope">
                        <el-button @click="deletePeople(scope.row.id)" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
            <portal-select-add ref="selectAdd" @refresh-list="search"></portal-select-add>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import {mapTypes} from '@/dictionary/courseOptions.js';
    import {perTypeCodes} from '@/dictionary/manageOptions.js';
    import SelectAdd from './selectAdd.vue';

    export default {
        data() {
            return {
                form:{
                    loginName:'',
                    perName:'',
                    state:''
                },
                taskId:'',
                mapTypes:mapTypes,
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
        components:{
            "portal-select-add":SelectAdd,
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                params.taskId=this.taskId;
                CourseInterface.getCoursePersonList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
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
            deletePeople(id){
                this.loading=true;
                let params={
                    id:id
                };
                CourseInterface.deletePeopleFromPlan(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.search();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            formatMapType(row, column, val) {
                let str = '';
                this.mapTypes.forEach((option) => {
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
            },
            selectAdd(){
                this.$refs.selectAdd.taskId=this.taskId;
                this.$refs.selectAdd.show=true;
            }
        }
    };
</script>
<style scoped>
</style>
