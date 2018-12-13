<template>
    <div>
        <el-dialog title="课程资料" :visible.sync="show" width="800px" v-loading="loading"  :close-on-click-modal="false">
            <el-button type="primary" @click="addSection" size="small" icon="el-icon-circle-plus-outline">新增课程资料目录</el-button>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="folderName" label="课程资料名称"></el-table-column>
                <el-table-column label="课程资料" width="120px">
                    <template slot-scope="scope" v-if="scope.row.accId">
                        <el-button @click="preview(scope.row.accId)" type="text" size="mini">预览</el-button>
                        <el-button @click="cancel(scope.row.id)" type="text" size="mini">取消关联</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="160px">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row.folderId,scope.row.folderName)" type="text" size="mini">编辑</el-button>
                        <el-button @click="relation(scope.row.folderId)" type="text" size="mini">关联资源</el-button>
                        <el-button @click="deleteSection(scope.row.folderId)" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
            <portal-course-resource-info ref="courseResourceInfo" @refresh-list="initCourseResourceInfo"></portal-course-resource-info>
            <portal-course-resource-relation ref="courseResourceRelation" @refresh-list="initCourseResourceInfo"></portal-course-resource-relation>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import CourseResourceInfo from './courseResourceInfo.vue';
    import CourseResourceRelation from './courseResourceRelation.vue';

    export default {
        data() {
            return {
                taskId:'',
                show: false,
                list:[],
                loading:false
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.initCourseResourceInfo();
                }
            }
        },
        components:{
            "portal-course-resource-info":CourseResourceInfo,
            "portal-course-resource-relation":CourseResourceRelation
        },
        methods: {
            initCourseResourceInfo(){
                this.loading=true;
                let params={taskId:this.taskId};
                CourseInterface.getCourseResourceList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.courseResourceList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            addSection(){
                this.$refs.courseResourceInfo.show=true;
                this.$refs.courseResourceInfo.title='新增';
                this.$refs.courseResourceInfo.form={
                    taskId:this.taskId,
                    folderId:'',
                    folderName:''
                };
            },
            edit(folderId,folderName){
                this.$refs.courseResourceInfo.show=true;
                this.$refs.courseResourceInfo.title='编辑';
                this.$refs.courseResourceInfo.form={
                    taskId:this.taskId,
                    folderId:folderId,
                    folderName:folderName
                };
            },
            deleteSection(sectionId){

            },
            relation(folderId){
                this.$refs.courseResourceRelation.folderId=folderId;
                this.$refs.courseResourceRelation.show=true;
            },
            preview(){

            },
            cancel(id){
                this.loading=true;
                let params={
                    id:id
                };
                CourseInterface.cancelMatchFolderAndResource(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.initCourseResourceInfo();
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
