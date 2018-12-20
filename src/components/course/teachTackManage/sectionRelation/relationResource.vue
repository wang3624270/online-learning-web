<template>
    <div>
        <el-dialog title="课程节次关联视频" :visible.sync="show" width="1000px" v-loading="loading"  append-to-body>
            <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
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
                </el-form-item>
            </el-form>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50px"></el-table-column>
                <el-table-column prop="accName" label="资源名称"></el-table-column>
                <el-table-column prop="accType" label="类型" width="50px"></el-table-column>
                <el-table-column prop="uploader" label="上传者" width="80px"></el-table-column>
                <el-table-column prop="uploadDate" label="上传时间"  width="150px"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="relate(scope.row.accId,'VIDEO')" type="text" size="mini">关联视频</el-button>
                        <!--<el-button @click="relate(scope.row.accId,'AUDIO')" type="text" size="mini">关联音频</el-button>-->
                        <!--<el-button @click="relate(scope.row.accId,'PPT')" type="text" size="mini">关联课件</el-button>-->
                        <!--<el-button @click="relate(scope.row.accId,'PRACTICE')" type="text" size="mini">关联在线练习</el-button>-->
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

    export default {
        data() {
            return {
                form:{
                    accName:'',
                    accType:'',
                    perName:''
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
            close(){
                this.show=false;
            },
            relate(accId,type){
                this.loading=true;
                let params={
                    accId:accId,
                    type:type,
                    sectionId:this.sectionId
                };
                CourseInterface.matchSectionAndResource(params).then( (res) => {
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
