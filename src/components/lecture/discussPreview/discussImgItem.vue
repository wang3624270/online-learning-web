<template>
    <div class='am-u-sm-12 am-u-md-6 am-u-lg-4' style='float:left;'>
        <div class='tpl-table-images-content'>
            <div class='tpl-table-images-content-i-time'>课程研讨时间:<br>{{data.startTimeStr}} - {{data.endTimeStr}}</div>
            <div class='tpl-i-title'><span class=' tpl-1-font'>主题:{{data.theme}}</span></div>
            <a href='#' @click="detail()" class='tpl-table-images-content-i'>
                <img v-if="data.coverImgAcc" :src='getImgSrc(data.coverImgAcc)' alt='封面图片'>
                <img src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' v-else>
            </a>
            <div class='tpl-table-images-content-block'>
                <div class='tpl-i-font' style='height:42px;'>{{data.introduce}}</div>
                <div class='tpl-i-more'>
                    <ul>
                        <span class='am-text-warning'>报名起止时间:{{data.registStart}} - {{data.registEnd}}</span><br>
                        <span class='font-green tpl-1-font'>课程研讨地点:{{data.place}}</span>
                    </ul>
                </div>
                <div class='am-btn-toolbar'>
                    <div class='am-btn-group am-btn-group-xs tpl-edit-content-btn'>
                        <button @click='detail(data.lectureId)' type='button' class='am-btn am-btn-default am-btn-success'>
                            <span class='am-icon-search'></span> 详情</button>
                        <button @click='entry' type='button' class='am-btn am-btn-default am-btn-danger' style='float:right'>
                            <span class='am-icon-hand-o-right'></span> 报名</button>
                    </div>
                </div>
            </div>
        </div>
        <portal-lecture-info  :data="data" ref="lectureInfo"></portal-lecture-info>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import LectureInfo from './discussInfo.vue';

    export default {
        data() {
            return {
                perName:'',
                mobilePhone:''
            };
        },
        props: ['data'],
        components:{
            "portal-lecture-info":LectureInfo
        },
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
                return LectureInterface.coverImgUrl(coverImgAcc);
            },
            detail(){
                this.$refs.lectureInfo.show=true;
            },
            entry(){
                let info='姓名:'+this.perName+';联系方式:'+this.mobilePhone;
                this.$confirm(info, '确认报名信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={lectureId:this.data.lectureId};
                    LectureInterface.entryLecture(params).then( (res) => {
                        if (res.re == LectureInterface.SUCCESS) {
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
