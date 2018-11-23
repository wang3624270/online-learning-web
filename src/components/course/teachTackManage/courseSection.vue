<template>
    <div>
        <el-dialog title="课程节次" :visible.sync="show" width="1000px" v-loading="loading"  :close-on-click-modal="false">
            <el-button type="primary" @click="addSection" size="small" icon="el-icon-circle-plus-outline">新增节次</el-button>
            <div style="height: 10px;"></div>
            <el-table :data="list" border style="width: 100%" size="middle">
                <el-table-column prop="orderNum" label="次序" width="50px"></el-table-column>
                <el-table-column prop="sectionName" label="节次名称"></el-table-column>
                <el-table-column prop="courseName" label="视频" width="80px">
                    <template slot-scope="scope" v-if="scope.row.videoAcc">
                        <el-button @click="preview(scope.row.videoAcc)" type="text" size="mini">预览</el-button>
                        <el-button @click="cancel(scope.row.videoId)" type="text" size="mini">取消关联</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="courseName" label="音频" width="80px">
                    <template slot-scope="scope" v-if="scope.row.audioAcc">
                        <el-button @click="preview(scope.row.audioAcc)" type="text" size="mini">预览</el-button>
                        <el-button @click="cancel(scope.row.audioId)" type="text" size="mini">取消关联</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="courseName" label="课件" width="80px">
                    <template slot-scope="scope" v-if="scope.row.pptAcc">
                        <el-button @click="preview(scope.row.pptAcc)" type="text" size="mini">预览</el-button>
                        <el-button @click="cancel(scope.row.pptId)" type="text" size="mini">取消关联</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="courseName" label="在线练习" width="80px"></el-table-column>
                <el-table-column label="操作"  width="240px">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row.sectionId,scope.row.sectionName)" type="text" size="mini">编辑</el-button>
                        <el-button @click="relation(scope.row.sectionId)" type="text" size="mini">关联资源</el-button>
                        <el-button @click="adjust(scope.row.sectionId,'up')" size="mini" circle icon="el-icon-arrow-up" type="primary"></el-button>
                        <el-button @click="adjust(scope.row.sectionId,'down')" size="mini" circle icon="el-icon-arrow-down" type="primary"></el-button>
                        <el-button @click="deleteSection(scope.row.sectionId)" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close" >关闭</el-button>
            </div>
            <portal-section-info ref="sectionInfo" @refresh-list="initSectionInfo"></portal-section-info>
            <portal-relation-resource ref="relationResource" @refresh-list="initSectionInfo"></portal-relation-resource>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import SectionInfo from './sectionInfo.vue';
    import RelationResource from './relationResource.vue';

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
                    this.initSectionInfo();
                }
            }
        },
        components:{
            "portal-section-info":SectionInfo,
            "portal-relation-resource":RelationResource
        },
        methods: {
            initSectionInfo(){
                this.loading=true;
                let params={taskId:this.taskId};
                CourseInterface.getCourseSectionList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.sectionList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            },
            addSection(){
                this.$refs.sectionInfo.show=true;
                this.$refs.sectionInfo.title='新增';
                this.$refs.sectionInfo.form={
                    taskId:this.taskId,
                    sectionId:'',
                    sectionName:''
                };
            },
            edit(sectionId,sectionName){
                this.$refs.sectionInfo.show=true;
                this.$refs.sectionInfo.title='编辑';
                this.$refs.sectionInfo.form={
                    taskId:this.taskId,
                    sectionId:sectionId,
                    sectionName:sectionName
                };
            },
            deleteSection(sectionId){

            },
            adjust(sectionId,direction){
                this.loading=true;
                let params={
                    sectionId:sectionId,
                    direction:direction
                };
                CourseInterface.adjustSectionOrder(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.initSectionInfo();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            relation(sectionId){
                this.$refs.relationResource.show=true;
                this.$refs.relationResource.sectionId=sectionId;
            },
            preview(){

            },
            cancel(id){
                this.loading=true;
                let params={
                    id:id
                };
                CourseInterface.cancelMatchSectionAndResource(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        this.initSectionInfo();
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
