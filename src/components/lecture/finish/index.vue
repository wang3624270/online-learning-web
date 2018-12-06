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
                    <el-table-column prop="theme" label="主题">
                        <template slot-scope="scope">
                            <a href="#" @click="detail(scope.row)">{{scope.row.theme}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lectureType" label="类型" :formatter="formatLectureType"></el-table-column>
                    <el-table-column prop="speaker" label="主讲"></el-table-column>
                    <el-table-column prop="collegeName" label="主办学院"></el-table-column>
                    <el-table-column prop="place" label="地点"></el-table-column>
                    <el-table-column prop="startTime" label="活动时间" width="160px">
                        <template slot-scope="scope">
                            {{scope.row.startTimeStr}}-{{scope.row.endTimeStr}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="attendance" label="签到情况"  :formatter="formatAttendance"></el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-lecture-info  :data="data" ref="lectureInfo"></portal-lecture-info>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import {lectureTypes} from '@/components/lecture/lectureManage/options.js';
    import LectureInfo from '@/components/lecture/lecturePreview/lectureInfo.vue';
    import {states,attendances} from '@/dictionary/lectureOptions.js';


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
                attendances:attendances,
                states:states,
                loading:false
            }
        },
        components: {
            'portal-lecture-info':LectureInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                LectureInterface.getEntryList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.entryList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
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
                this.$refs.lectureInfo.show=true;
            },
            formatAttendance(row, column, val) {
                let str = '';
                this.attendances.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
        }
    }
</script>
<style scoped>

</style>
