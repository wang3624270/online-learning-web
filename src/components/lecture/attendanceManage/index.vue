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
                    <el-table-column prop="lectureType" label="类型"   width="50" :formatter="formatLectureType"></el-table-column>
                    <el-table-column prop="startTime" label="活动时间" width="160px">
                        <template slot-scope="scope">
                            {{scope.row.startTimeStr}}-{{scope.row.endTimeStr}}
                        </template>
                    </el-table-column>
                    <el-table-column label="报名通过人数" width="120">
                        <template slot-scope="scope">
                            {{scope.row.checkedList.length}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="check(scope.row,scope.row.checkedList)" type="text" size="small">签到记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-lecture-detail  :data="data" ref="lectureDetail"></portal-lecture-detail>
        <portal-attendance-page ref="attendancePage" @refresh-list="search"></portal-attendance-page>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import TimeFormatUtils from '@/kit/timeFormatUtils';
    import {lectureTypes} from '@/components/lecture/lectureManage/options.js';
    import LectureDetail from '@/components/lecture/lecturePreview/lectureInfo.vue';
    import AttendancePage from './attendancePage.vue';

    export default {
        data() {
            return {
                form:{
                    theme:'',
                    lectureType:''
                },
                data:{},
                list:[],
                applyList:[],
                lectureTypes:lectureTypes,
                loading:false
            }
        },
        components: {
            'portal-lecture-detail':LectureDetail,
            'portal-attendance-page':AttendancePage
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
            check(lectureData,list){
                this.applyList=list;
                this.$refs.attendancePage.applyList=this.applyList;
                this.$refs.attendancePage.lectureId=lectureData.lectureId;
                this.$refs.attendancePage.show=true;
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
