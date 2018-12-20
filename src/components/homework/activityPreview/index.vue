<template>
    <div>
        <el-container>
            <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                <el-table-column type="index" label="序号" width="50px"></el-table-column>
                <el-table-column prop="activityName" label="课程实践名称"></el-table-column>
                <el-table-column prop="taskName" label="所属课程"></el-table-column>
                <el-table-column prop="place" label="实践地点"></el-table-column>
                <el-table-column label="实践目标"  width="80">
                    <template slot-scope="scope">
                        <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="startDate" label="实践开始时间" width="150"></el-table-column>
                <el-table-column prop="endDate" label="实践结束时间" width="150"></el-table-column>
                <el-table-column prop="grade" label="实践成绩" width="80"></el-table-column>
                <el-table-column prop="createTimeStr" label="成绩录入时间" width="150"></el-table-column>

            </el-table>
        </el-container>
        <portal-activity-goal ref="activityGoal" @refresh-list="search"></portal-activity-goal>
    </div>
</template>
<script>
    import ActivityGoal from './activityGoal/index.vue';
    import HomeworkInterface from '@/interfaces/homeworkInterface';

    export default {
        data() {
            return {
                list:[],
                loading:false
            }
        },
        components: {
            'portal-activity-goal':ActivityGoal
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params={};
                HomeworkInterface.getPersonActivityList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.activityList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            look(activity){
                this.$refs.activityGoal.form=activity;
                this.$refs.activityGoal.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
