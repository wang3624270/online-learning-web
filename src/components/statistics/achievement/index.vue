<template>
    <div v-loading="loading">
        <div class="tpl-content-scope">
            <div class="note note-info">
                <div class="info-left">
                    <img id="img-style" src="@/components/framepage/assets/img/user.png">
                </div>
                <div class="info-right fix">
                    <div class="i-r-l">
                        <h3>{{perName}}<span class="am-badge tpl-badge-success am-round">  {{perType}}</span></h3>
                        <p> 性别 : {{sex}}  |  手机号:{{personInfo.mobilePhone}}  |  <el-button type="text" @click="editInfo"> ∨ 更多信息</el-button></p>
                        <p><span class="label label-danger">已学习</span>  {{getTime(form.time)}}</p>
                    </div>
                    <div class="i-r-r"><el-button type="info" icon="el-icon-setting">个人设置</el-button></div>
                </div>
            </div>
        </div>
        <div class="row line-style">
            <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                <div class="dashboard-stat blue">
                    <div class="visual">
                        <i class="am-icon-bar-chart-o"></i>
                    </div>
                    <div class="details">
                        <div class="number"> {{form.taskNum}} </div>
                        <div class="desc"> 已学习课程 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('courseStudy')"> 查看更多
                        <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                </div>
            </div>
            <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                <div class="dashboard-stat red">
                    <div class="visual">
                        <i class="am-icon-bar-chart-o"></i>
                    </div>
                    <div class="details">
                        <div class="number"> {{form.examNum}} </div>
                        <div class="desc"> 已完成在线考试 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('finishedExam')"> 查看更多
                        <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                </div>
            </div>
            <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                <div class="dashboard-stat green">
                    <div class="visual">
                        <i class="am-icon-bar-chart-o"></i>
                    </div>
                    <div class="details">
                        <div class="number"> {{form.lectureNum}} </div>
                        <div class="desc"> 已报名讲座研讨 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('entriedLecture')"> 查看更多
                        <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                </div>
            </div>
            <div class="am-u-lg-3 am-u-md-6 am-u-sm-12">
                <div class="dashboard-stat purple">
                    <div class="visual">
                        <i class="am-icon-bar-chart-o"></i>
                    </div>
                    <div class="details">
                        <div class="number"> {{form.chargeNum}} </div>
                        <div class="desc"> 已付费 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('personCharge')"> 查看更多
                        <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="process-table">
            <div class="step-left">
                <div class="process-item" v-for="item in list" :key="item.taskId">
                    <div class="cover-left">
                        <img class="cover-img" v-if="item.coverImgAcc" :src='getImgSrc(item.coverImgAcc)' alt='封面图片'>
                        <img class="cover-img" src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' v-else>
                    </div>
                    <div class="cover-right">
                        <h3>{{item.taskName}}
                            <span class="close" data-close="note"></span>
                        </h3>
                        <div class='tpl-table-images-content-i-time'>课程结束时间 : {{item.endDate}}</div>
                        <div class='time-content'>{{item.briefIntroduction}}</div>
                    </div>
                    <div class='tpl-i-more'>
                        <ul class="li-float-root fix">
                            <li><span class='am-text-warning'>已学{{getDegree(item.completeDegree)}}%</span></li>
                            <li><span class='am-text-success tpl-1-font'>用时{{getTime(item.time)}}</span></li>
                            <li><span class='font-green tpl-1-font'>学至第{{item.sectionIdNode}}节</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="step-right">
                <div>
                    <el-steps direction="vertical" :space="181">
                        <el-step :title="item.createTimeStr" icon="el-icon-time" v-for="item in list" :key="item.taskId"></el-step>
                    </el-steps>
                </div>
            </div>
        </div>
        <portal-person-info ref="personInfo" @refresh-list="initPersonInfo"></portal-person-info>
    </div>
</template>
<script>
    import StatisticsInterface from '@/interfaces/statisticsInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import CourseInterface from '@/interfaces/courseInterface';
    import {perTypeCodes,genderCodes} from '@/dictionary/manageOptions'
    import PersonInfo from '@/components/framepage/personInfo/index.vue';

    export default {
        data() {
            return {
                form:{
                    taskNum:'',
                    examNum:'',
                    lectureNum:'',
                    chargeNum:''
                },
                personInfo:{},
                list:[],
                genderCode:'',
                perName:'',
                perTypeCode:'',
                perTypeCodes:perTypeCodes,
                genderCodes:genderCodes,
                loading:false,
            }
        },
        beforeMount(){
            this.initPersonInfo();
            this.search();
            this.getAchievementInfo();
        },
        computed:{
            perType(){
                let str = '';
                this.perTypeCodes.forEach((option) => {
                    if(option.value == this.perTypeCode) {
                        str = option.label;
                    }
                });
                return str;
            },
            sex(){
                let str = '';
                this.genderCodes.forEach((option) => {
                    if(option.value == this.genderCode) {
                        str = option.label;
                    }
                });
                return str;
            }
        },
        components: {
            'portal-person-info':PersonInfo
        },
        methods:{
            initPersonInfo(){
                this.loading=true;
                ManageInterface.getPersonInfo({}).then( (res) => {
                    if (res.re == ManageInterface.SUCCESS) {
                        this.loading=false;
                        let data=res.data;
                        this.perName=data.perName;
                        this.perTypeCode=data.perTypeCode;
                        this.genderCode=data.genderCode;
                        this.personInfo=data;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getPersonalCoursesList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.courseList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            getAchievementInfo(){
                this.loading=true;
                let params=this.form;
                StatisticsInterface.getAchievementInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == StatisticsInterface.SUCCESS) {
                        let data=res.data;
                        this.form=data;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            getImgSrc(coverImgAcc){
                return CourseInterface.coverImgUrl(coverImgAcc);
            },
            getTime(val){
                return Math.floor(val/60)+'时'+val%60+'分';
            },
            getDegree(val){
                return (val*100).toFixed(2);
            },
            openPage(name){
                const {href} = this.$router.resolve({
                    name: name
                })
                window.open(href, '_blank');
            },
            editInfo(){
                this.$refs.personInfo.form=this.personInfo;
                this.$refs.personInfo.title='编辑个人资料';
                this.$refs.personInfo.show=true;
            }
        }
    }
</script>
<style scoped>
    .info-left{
        float: left;
        width: 110px;
    }
    .info-right{
        overflow: hidden;
    }
    #img-style{
        width: 100px;
        height: 100px;
    }
    .step-left{
        float: left;
        width: 85%;
    }
    .step-right{
        padding-left: 30px;
        overflow: hidden;
    }
    .cover-left{
        float: left;
        width: 280px;
    }
    .cover-right{
        overflow: hidden;
    }
    .cover-img{
        width: 250px;
        height: 150px;
    }
    .line-style{
        border-bottom: 1px solid #eef1f5;
    }
    .time-content{
        overflow: hidden;
        height: 40px;
        width: 100%;
        font-size: 12px;
        color: #666;
    }
    .li-float-root{
        margin-left: 280px;
    }
    .li-float-root li{
        width: 33.3%;
        float: left;
    }
    .process-table{
        margin-top: 15px
    }
    .process-item{
        padding-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eef1f5;
    }
    .i-r-l{
        float: left;
    }
    .i-r-r{
        float: right;
    }
</style>
