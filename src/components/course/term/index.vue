<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" class="demo-form-inline" size="middle">
                    <el-form-item>
                        <el-button type="primary" @click="add" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="termName" label="学期名称"></el-table-column>
                    <el-table-column label="起止日期">
                        <template slot-scope="scope">
                            {{scope.row.startTimeStr}} - {{scope.row.endTimeStr}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.termId,scope.row.termName,scope.row.startTimeStr,scope.row.endTimeStr)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteTerm(scope.row.termId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-term-info ref="termInfo" @refresh-list="search"></portal-term-info>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import TermInfo from './termInfo.vue';
    import TimeFormatUtils from '@/kit/timeFormatUtils';

    export default {
        data() {
            return {
                list:[],
                loading:false
            }
        },
        components: {
            'portal-term-info':TermInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params={};
                CourseInterface.getTermList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.termList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteTerm(termId){
                this.$confirm('此操作将永久删除该群组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={termId:parseInt(termId)};
                    CourseInterface.deleteTerm(params).then( (res) => {
                        if (res.re == CourseInterface.SUCCESS) {
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
            add(){
                this.$refs.termInfo.show=true;
                this.$refs.termInfo.title='新增';
                this.$refs.termInfo.dateRange=[TimeFormatUtils.getPreviousDate(7, 0), TimeFormatUtils.getPreviousDate(1, 0)];
                this.$refs.termInfo.params={
                    termId:'',
                    termName:'',
                    startTime:'',
                    endTime:''
                }
            },
            edit(termId,termName,startTime,endTime){
                this.$refs.termInfo.show=true;
                this.$refs.termInfo.title='编辑';
                this.$refs.termInfo.dateRange=[startTime || TimeFormatUtils.getPreviousDate(7, 0),endTime || TimeFormatUtils.getPreviousDate(1, 0)];
                this.$refs.termInfo.params={
                    termId:termId,
                    termName:termName,
                    startTime:startTime || '',
                    endTime:endTime || ''
                };
            }
        }
    }
</script>
<style scoped>

</style>
