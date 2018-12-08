<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="在线练习名称">
                        <el-input v-model="form.practiceTitle" placeholder="请输入在线练习名称"></el-input>
                    </el-form-item>
                    <el-form-item label="课程计划名称">
                        <el-input v-model="form.taskName" placeholder="请输入课程计划名称"></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="addPractice" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="practiceTitle" label="在线练习名称"></el-table-column>
                    <el-table-column prop="state" label="课程计划 - 节次"></el-table-column>
                    <el-table-column label="在线练习试题">
                        <template slot-scope="scope">
                            <el-button @click="questionExam(scope.row)" type="text" size="small">查看/编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row)" type="text" size="small">在线练习信息</el-button>
                            <el-button @click="deletePractice(scope.row.examId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-practice-info ref="practiceInfo" @refresh-list="search"></portal-practice-info>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import PracticeInfo from './practiceInfo.vue';

    export default {
        data() {
            return {
                form:{
                    practiceTitle:'',
                    taskName:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-practice-info':PracticeInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getPracticeList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.practiceList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deletePractice(lectureId){

            },
            addPractice(){
                this.$refs.practiceInfo.title='新增';
                this.$refs.practiceInfo.form.practiceId='';
                this.$refs.practiceInfo.show=true;
            },
            edit(practice){
                this.$refs.practiceInfo.form.practiceId=practice.practiceId;
                this.$refs.practiceInfo.form.practiceTitle=practice.practiceTitle;
                this.$refs.practiceInfo.show=true;
                this.$refs.practiceInfo.title='编辑';
            },
            questionExam(params){
                this.$router.push({
                    path: '/index/exam/questionPractice',
                    query: { practiceId: params.practiceId }
                });
            }
        }
    }
</script>
<style scoped>

</style>
