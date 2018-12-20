<template>
    <div>
        <el-container>
            <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                <el-table-column type="index" label="序号" width="50px"></el-table-column>
                <el-table-column prop="name" label="课程作业名称"></el-table-column>
                <el-table-column prop="taskName" label="所属课程"></el-table-column>
                <el-table-column prop="startDate" label="提交开始时间" width="150"></el-table-column>
                <el-table-column prop="endDate" label="提交结束时间" width="150"></el-table-column>
                <el-table-column prop="state" label="状态" width="80"></el-table-column>
                <el-table-column prop="score" label="作业成绩" width="80"></el-table-column>
                <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button @click="submitHomework(scope.row)" type="text" size="small">提交作业</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-container>
        <portal-answer-info ref="answerInfo" @refresh-list="search"></portal-answer-info>
    </div>
</template>
<script>
    import AnswerInfo from './answerInfo.vue';
    import HomeworkInterface from '@/interfaces/homeworkInterface';

    export default {
        data() {
            return {
                list:[],
                loading:false
            }
        },
        components: {
            'portal-answer-info':AnswerInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params={};
                HomeworkInterface.getPersonHomeworkList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == HomeworkInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.homeworkList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            submitHomework(homework){
                this.$refs.answerInfo.form=homework;
                this.$refs.answerInfo.show=true;
                this.$refs.answerInfo.title='提交课程作业';
            }
        }
    }
</script>
<style scoped>

</style>
