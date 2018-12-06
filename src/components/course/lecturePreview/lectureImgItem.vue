<template>
    <div class='am-u-sm-12 am-u-md-6 am-u-lg-4' style='float:left;'>
        <div class='tpl-table-images-content'>
            <div class='tpl-table-images-content-i-time'>课程开放时间:<br>{{data.startDate}} - {{data.endDate}}</div>
            <div class='tpl-i-title'><span class=' tpl-1-font'>讲座报告:{{data.taskName}}</span></div>
            <a href='#' @click="detail()" class='tpl-table-images-content-i'>
                <img v-if="data.coverImgAcc" :src='getImgSrc(data.coverImgAcc)' alt='封面图片'>
                <img src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' v-else>
            </a>
            <div class='tpl-table-images-content-block'>
                <div class='tpl-i-font' style='height:42px;'>{{data.briefIntroduction}}</div>
                <div class='tpl-i-more'>
                    <ul>
                        <span class='am-text-success tpl-1-font'>主讲: {{data.teachGroup}}</span><br>
                        <span class='am-text-warning'>开课学院: {{data.collegeName}}</span>
                    </ul>
                </div>
                <div class='am-btn-toolbar'>
                    <div class='am-btn-group am-btn-group-xs tpl-edit-content-btn'>
                        <button @click='detail(data.taskId,data.courseId)' type='button' class='am-btn am-btn-default am-btn-success'>
                            <span class='am-icon-search'></span> 详情</button>
                        <button @click='entry' type='button' class='am-btn am-btn-default am-btn-danger' style='float:right'>
                            <span class='am-icon-hand-o-right'></span> 报名</button>
                    </div>
                </div>
            </div>
        </div>
        <portal-lecture-detail ref="lectureDetail" ></portal-lecture-detail>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import LectureDetail from './lectureDetail.vue';

    export default {
        data() {
            return {
                perName:'',
                mobilePhone:''
            };
        },
        components: {
            'portal-lecture-detail':LectureDetail
        },
        props: ['data'],
        beforeMount(){
            let params={};
            ManageInterface.getPersonInfo(params).then( (res) => {
                if (res.re == ManageInterface.SUCCESS) {
                    let data=res.data;
                    this.perName=data.perName;
                    this.mobilePhone=data.mobilePhone;
                } else {
                    this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                }
            });
        },
        methods: {
            getImgSrc(coverImgAcc){
                return CourseInterface.coverImgUrl(coverImgAcc);
            },
            detail(taskId,courseId){
                this.$refs.lectureDetail.show=true;
                this.$refs.lectureDetail.form={
                    taskId:taskId,
                    courseId:courseId
                };
            },
            entry(){
                let info='姓名:'+this.perName+';联系方式:'+this.mobilePhone;
                this.$confirm(info, '确认报名信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={taskId:this.data.taskId};
                    CourseInterface.entryTeachTask(params).then( (res) => {
                        if (res.re == CourseInterface.SUCCESS) {
                            this.$message({
                                type: 'success',
                                message: '报名成功!'
                            });
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消报名'
                    });
                });
            }
        }
    };
</script>
<style scoped>

</style>
