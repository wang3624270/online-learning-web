<template>
    <div>
        <el-dialog title="课程节次关联在线练习" :visible.sync="show" width="1000px" v-loading="loading"  append-to-body>
            <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                <el-form-item label="在线练习名称">
                    <el-input v-model="form.practiceTitle" placeholder="请输入在线练习名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50px"></el-table-column>
                <el-table-column prop="practiceTitle" label="在线练习名称"></el-table-column>
                <el-table-column prop="uploader" label="创建者" width="80px"></el-table-column>
                <el-table-column prop="createTimeStr" label="创建时间"  width="150px"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="relate(scope.row.practiceId,'PRACTICE')" type="text" size="mini">关联</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ExamInterface from '@/interfaces/examInterface';

    export default {
        data() {
            return {
                form:{
                    practiceTitle:''
                },
                sectionId:'',
                show: false,
                list:[],
                loading:false
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.search();
                }
            }
        },
        methods: {
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
            close(){
                this.show=false;
            },
            relate(practiceId,type){
                this.loading=true;
                let params={
                    practiceId:practiceId,
                    type:type,
                    sectionId:this.sectionId
                };
                CourseInterface.matchSectionAndPractice(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    };
</script>
<style scoped>
</style>
