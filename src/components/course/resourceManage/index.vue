<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" class="demo-form-inline" size="middle">
                    <el-form-item label="资源名称">
                        <el-input v-model="form.accName" placeholder="请输入资源名称"></el-input>
                    </el-form-item>
                    <el-form-item label="资源类型">
                        <el-input v-model="form.accType" placeholder="请输入资源类型"></el-input>
                    </el-form-item>
                    <el-form-item label="上传者">
                        <el-input v-model="form.perName" placeholder="请输入上传者"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="updload" size="middle" icon="el-icon-upload">上传资源</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="accName" label="资源名称"></el-table-column>
                    <el-table-column prop="accType" label="类型"></el-table-column>
                    <el-table-column prop="uploader" label="上传者"></el-table-column>
                    <el-table-column prop="uploadDate" label="上传时间"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="download(scope.row.accId)" type="text" size="small">下载</el-button>
                            <el-button @click="deleteResource(scope.row.accId)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-upload-component ref="uploadComponent" @refresh-list="search"></portal-upload-component>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import TimeFormatUtils from '@/kit/timeFormatUtils';
    import UploadComponent from './uploadComponent.vue';

    export default {
        data() {
            return {
                form:{
                    accName:'',
                    accType:'',
                    perName:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-upload-component':UploadComponent
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getResourceList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.resourceList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteResource(accId){
                this.$confirm('此操作将永久删除该群组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={accId:parseInt(accId)};
                    CourseInterface.deleteSource(params).then( (res) => {
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
            updload(){
                this.$refs.uploadComponent.show=true;
            },
            download(accId){
                let params={accId:accId};
                CourseInterface.downloadResource(params);
            }
        }
    }
</script>
<style scoped>

</style>
