<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="讲座研讨主题">
                        <el-input v-model="form.theme" placeholder="请输入讲座研讨主题"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="form.lectureType" placeholder="请选择类型">
                            <el-option v-for="item in lectureTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="addLecture" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column label="主题">
                        <template slot-scope="scope">
                            <a href="#" @click="detail(scope.row)">{{scope.row.theme}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lectureType" label="类型" :formatter="formatLectureType"></el-table-column>
                    <el-table-column prop="speaker" label="主讲"></el-table-column>
                    <el-table-column prop="collegeName" label="主办学院"></el-table-column>
                    <el-table-column label="报名时间" width="160px">
                        <template slot-scope="scope">
                            {{scope.row.registStart}}-{{scope.row.registEnd}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="maxNumber" label="最大人数"></el-table-column>
                    <el-table-column prop="place" label="地点"></el-table-column>
                    <el-table-column prop="startTime" label="活动时间" width="160px">
                        <template slot-scope="scope">
                            {{scope.row.startTimeStr}}-{{scope.row.endTimeStr}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.lectureId)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteCourse(scope.row.lectureId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-lecture-info ref="lectureInfo" @refresh-list="search"></portal-lecture-info>
        <portal-lecture-detail  :data="data" ref="lectureDetail"></portal-lecture-detail>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import TimeFormatUtils from '@/kit/timeFormatUtils';
    import LectureInfo from './lectureInfo.vue';
    import LectureDetail from '@/components/lecture/lecturePreview/lectureInfo.vue';
    import {lectureTypes} from './options.js';

    export default {
        data() {
            return {
                form:{
                    theme:'',
                    lectureType:''
                },
                data:{},
                list:[],
                lectureTypes:lectureTypes,
                loading:false
            }
        },
        components: {
            'portal-lecture-info':LectureInfo,
            'portal-lecture-detail':LectureDetail
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                LectureInterface.getLectureList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.lectureList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteCourse(lectureId){
                this.$confirm('此操作将永久删除该群组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={lectureId:parseInt(lectureId)};
                    LectureInterface.deleteLecture(params).then( (res) => {
                        if (res.re == LectureInterface.SUCCESS) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.search();
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addLecture(){
                this.$refs.lectureInfo.show=true;
                this.$refs.lectureInfo.title='新增';
                this.$refs.lectureInfo.form.lectureId='';
            },
            edit(lectureId){
                this.$refs.lectureInfo.form.lectureId=lectureId;
                this.$refs.lectureInfo.show=true;
                this.$refs.lectureInfo.title='编辑';
            },
            formatLectureType(row, column, val) {
                let str = '';
                this.lectureTypes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            detail(params){
                this.data=params;
                this.$refs.lectureDetail.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
