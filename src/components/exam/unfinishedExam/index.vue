<template>
    <div>
        <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
            <el-table-column type="index" label="序号" width="50px"></el-table-column>
            <el-table-column prop="examTitle" label="考试名称"></el-table-column>
            <el-table-column prop="taskName" label="所属课程">
                <template slot-scope="scope">
                    <el-button @click="startLearn(scope.row.taskId,scope.row.courseId)" type="text" size="small">{{scope.row.taskName}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="startDate" label="考试开始时间" width="150"></el-table-column>
            <el-table-column prop="endDate" label="考试结束时间" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作"  width="180">
                <template slot-scope="scope">
                    <el-button @click="startExam(scope.row)" type="text" size="small" v-if="scope.row.state=='1'">开始考试</el-button>
                    <span v-else>考试时间未到，不可作答 <el-button @click="search" type="text" size="small">点击刷新</el-button></span>
                </template>
            </el-table-column>
        </el-table>
        <portal-start-exam ref="startExam" @refresh-list="search"></portal-start-exam>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import StartExam from './startExam.vue';

    export default {
        data() {
            return {
                form:{
                    examTitle:'',
                    taskName:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-start-exam':StartExam
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getUnfinishedExamList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.examList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            startLearn(taskId,courseId){
                const {href} = this.$router.resolve({
                    name: 'courseDetail',
                    query: {
                        taskId: taskId,
                        courseId:courseId
                    }
                })
                window.open(href, '_blank');
            },
            startExam(exam){
                this.$refs.startExam.form.examId=exam.examId;
                this.$refs.startExam.title=exam.examTitle+'（满分'+exam.score+'分）';
                this.$refs.startExam.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
