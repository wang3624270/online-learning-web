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
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="taskName" label="课程计划名称"></el-table-column>
                    <el-table-column label="课程封面" width="155">
                        <template slot-scope="scope">
                            <img v-if="scope.row.coverImgAcc" :src='getImgSrc(scope.row.coverImgAcc)' alt='封面图片' class="cover-img">
                            <img src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' class="cover-img" v-else>
                        </template>
                    </el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="courseType" label="课程类型" :formatter="formatCourseType"></el-table-column>
                    <el-table-column prop="startDate" label="开始日期" width="100"></el-table-column>
                    <el-table-column prop="endDate" label="结束日期" width="100"></el-table-column>
                    <el-table-column fixed="right" label="课程费用">
                        <template slot-scope="scope">
                            <span>{{scope.row.price}} 元</span>
                            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="付费记录">
                        <template slot-scope="scope">
                            <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-record-info ref="recordInfo"></portal-record-info>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import {courseTypes} from '@/components/course/courseManage/options.js';
    import RecordInfo from './recordInfo.vue';

    export default {
        data() {
            return {
                form:{
                    taskName:'',
                    courseType:''
                },
                list:[],
                courseTypes:courseTypes,
                loading:false
            }
        },
        components: {
            'portal-record-info':RecordInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getTeachTaskList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.teachTaskList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            edit(task){
                this.$prompt('请输入课程费用(元)', '修改课程费用', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.loading=true;
                    let params={
                        chargeId:task.chargeId,
                        price:value
                    };
                    ManageInterface.editTeachTaskPrice(params).then( (res) => {
                        this.loading=false;
                        if (res.re == ManageInterface.SUCCESS) {
                            this.search();
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
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
            getImgSrc(coverImgAcc){
                return CourseInterface.coverImgUrl(coverImgAcc);
            },
            look(task){
                this.$refs.recordInfo.taskId=task.taskId;
                this.$refs.recordInfo.show=true;
            }
        }
    }
</script>
<style scoped>
    .cover-img{
        width:144px;
        height:84px
    }
</style>
