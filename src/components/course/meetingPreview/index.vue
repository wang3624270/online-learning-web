<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="会议名称">
                        <el-input v-model="form.taskName" placeholder="请输入会议名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main  v-loading="loading">
                <portal-meeting-item v-for="item in list" :data="item" :key="item.taskId"></portal-meeting-item>
                <div id="clearFloat"></div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import TimeFormatUtils from '@/kit/timeFormatUtils';
    import MeetingImgItem from './meetingImgItem.vue';

    export default {
        data() {
            return {
                form:{
                    taskName:''
                },
                list:[],
                loading:false
            }
        },
        mounted(){
            this.search();
        },
        components:{
            "portal-meeting-item":MeetingImgItem
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                params.courseType='3';
                CourseInterface.getTeachTaskList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.teachTaskList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    }
</script>
<style scoped>
#clearFloat{
    clear: both;
}
</style>
