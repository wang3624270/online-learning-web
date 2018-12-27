<template>
    <div>
        <div class="tpl-content-scope"  v-loading="loading">
            <div class="note note-info">
                <div class="info-left">
                    <img id="img-style" src="@/components/framepage/assets/img/user.png">
                </div>
                <div class="info-right fix">
                    <div class="i-r-l">
                        <h3>{{perName}}<span class="am-badge tpl-badge-success am-round">  {{perType}}</span></h3>
                        <p> 性别 : {{sex}}  |  手机号:{{personInfo.mobilePhone}}  |  <el-button type="text" @click="editInfo"> ∨ 更多信息</el-button></p>
                        <p><span class="label label-danger">教师人数</span>  {{form.teacherNum}}      <span class="label label-danger">学生人数</span>  {{form.personNum}}</p>
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
                        <div class="desc"> 现有课程计划 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('teachTackManage')"> 查看更多
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
                        <div class="desc"> 现有在线考试 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('examManage')"> 查看更多
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
                        <div class="desc"> 现有讲座研讨 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('lectureManage')"> 查看更多
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
                        <div class="desc"> 参与付费课程人数 </div>
                    </div>
                    <a class="more" href="#" @click="openPage('payRecord')"> 查看更多
                        <i class="m-icon-swapright m-icon-white"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="process-table" v-loading="loading1">
            <div class="chart-block">
                <div id="myChart1" style="width:100%;min-width:600px;height:480px; margin-left: 20px;"></div>
            </div>
            <div class="chart-block">
                <div id="myChart2" style="width:100%;min-width:600px;height:480px; margin-left: 20px;"></div>
            </div>
            <div class="chart-block">
                <div id="myChart3" style="width:100%;min-width:600px;height:480px; margin-left: 20px;"></div>
            </div>
            <div class="chart-block">
                <div id="myChart4" style="width:100%;min-width:600px;height:480px; margin-left: 20px;"></div>
            </div>
            <div class="chart-block">
                <div id="myChart5" style="width:100%;min-width:600px;height:480px; margin-left: 20px;"></div>
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
    import {subjects} from '@/dictionary/courseOptions'
    import PersonInfo from '@/components/framepage/personInfo/index.vue';

    export default {
        data() {
            return {
                form:{
                    taskNum:'',
                    examNum:'',
                    lectureNum:'',
                    chargeNum:'',
                    personNum:''
                },
                personInfo:{},
                list:[],
                taskList:[],
                planList:[],
                courses:[],
                selectList:[],
                entryList:[],
                genderCode:'',
                perName:'',
                perTypeCode:'',
                perTypeCodes:perTypeCodes,
                genderCodes:genderCodes,
                subjects:subjects,
                loading:false,
                loading1:false
            }
        },
        beforeMount(){
            this.initPersonInfo();
            this.getLearningInfo();
        },
        mounted() {
            this.initChart();
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
            getLearningInfo(){
                this.loading=true;
                let params=this.form;
                StatisticsInterface.getLearningInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == StatisticsInterface.SUCCESS) {
                        let data=res.data;
                        this.form=data;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
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
            },
            initChart(){
                this.loading=true;
                import('@/kit/charts').then(({ 'default': echarts }) => {
                    this.myChart1 = echarts.init(document.getElementById('myChart1'));
                    this.myChart2 = echarts.init(document.getElementById('myChart2'));
                    this.myChart3 = echarts.init(document.getElementById('myChart3'));
                    this.myChart4 = echarts.init(document.getElementById('myChart4'));
                    this.myChart5 = echarts.init(document.getElementById('myChart5'));
                    this.getData();
                });
            },
            getData() {
                this.loading1=true;
                let params={};
                StatisticsInterface.getCourseSubjectInfo(params).then( (res) => {
                    this.loading1=false;
                    if (res.re == StatisticsInterface.SUCCESS) {
                        let data=res.data;
                        this.taskList=data.courseList;
                        this.planList=data.planList;
                        this.courses=data.courses;
                        this.selectList=data.selectList;
                        this.entryList=data.entryList;
                        this.draw1();
                        this.draw2();
                        this.draw3();
                        this.draw4();
                        this.draw5();
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            draw1() {
                let legendData=[];
                this.subjects.forEach((item)=>{
                    legendData.push(item.label);
                    item.num=0;
                });
                this.taskList.forEach((item)=>{
                    let subject=item.subject;
                    this.subjects.forEach((part)=>{
                        if(part.value==subject){
                            part.num++;
                        }
                    });
                });
                let seriesData=[];
                this.subjects.forEach((item)=>{
                    let ob={
                        name:item.label,
                        value:item.num
                    }
                    seriesData.push(ob);
                });
                let option = {
                    title : {
                        text: '现有课程计划中各学科门类占比',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData
                    },
                    series : [
                        {
                            name: '学科门类',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.myChart1.setOption(option);
            },
            draw2() {
                let legendData=[];
                this.subjects.forEach((item)=>{
                    legendData.push(item.label);
                    item.num2=0;
                });
                this.planList.forEach((item)=>{
                    let subject=item.subject;
                    this.subjects.forEach((part)=>{
                        if(part.value==subject){
                            part.num2++;
                        }
                    });
                });
                let seriesData=[];
                this.subjects.forEach((item)=>{
                    let ob={
                        name:item.label,
                        value:item.num2
                    }
                    seriesData.push(ob);
                });
                let option = {
                    title : {
                        text: '各学科课程热门程度',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData
                    },
                    series : [
                        {
                            name: '学科门类',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.myChart2.setOption(option);
            },
            draw3() {
                let xAxisData=[];
                this.courses.forEach((item)=>{
                    xAxisData.push(item.courseName);
                    item.num=0;
                });
                this.planList.forEach((item)=>{
                    let courseId=item.courseId;
                    this.courses.forEach((part)=>{
                        if(part.courseId==courseId){
                            part.num++;
                        }
                    });
                });
                let seriesData=[];
                this.courses.forEach((item)=>{
                    seriesData.push(item.num);
                });
                let option = {
                    title : {
                        text: '各课程受欢迎程度',
                        x:'center'
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data :xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval:0,
                                rotate:45
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'选课学生人数',
                            type:'bar',
                            barWidth: '60%',
                            data:seriesData
                        }
                    ]
                };
                this.myChart3.setOption(option);
            },
            draw4() {
                let timeList=[];
                this.selectList.forEach((item)=>{
                    let createTime=item.createTimeStr.substring(0,10);
                    timeList.push(createTime);
                });
                let xAxisData=Array.from(new Set(timeList));
                let xAxisArr=[];
                xAxisData.forEach((item)=>{
                    xAxisArr.push({
                        label: item,
                        value: 0
                    });
                });
                this.selectList.forEach((item)=>{
                    xAxisArr.forEach((part)=>{
                        if(part.label==item.createTimeStr.substring(0,10)){
                            part.value++;
                        }
                    });
                });
                let seriesData=[];
                xAxisArr.forEach((part)=>{
                    seriesData.push(part.value);
                });
                let option = {
                    title : {
                        text: '自主选择课程人数',
                        x:'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: seriesData,
                        type: 'line'
                    }]
                };
                this.myChart4.setOption(option);
            },
            draw5() {
                let timeList=[];
                this.entryList.forEach((item)=>{
                    let createTime=item.createTimeStr.substring(0,10);
                    timeList.push(createTime);
                });
                let xAxisData=Array.from(new Set(timeList));
                let xAxisArr=[];
                xAxisData.forEach((item)=>{
                    xAxisArr.push({
                        label: item,
                        value: 0
                    });
                });
                this.entryList.forEach((item)=>{
                    xAxisArr.forEach((part)=>{
                        if(part.label==item.createTimeStr.substring(0,10)){
                            part.value++;
                        }
                    });
                });
                let seriesData=[];
                xAxisArr.forEach((part)=>{
                    seriesData.push(part.value);
                });
                let option = {
                    title : {
                        text: '讲座研讨报名人数',
                        x:'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: seriesData,
                        type: 'line'
                    }]
                };
                this.myChart5.setOption(option);
            },
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
    .line-style{
        border-bottom: 1px solid #eef1f5;
    }
    .li-float-root li{
        width: 33.3%;
        float: left;
    }
    .process-table{
        margin-top: 15px
    }
    .i-r-l{
        float: left;
    }
    .i-r-r{
        float: right;
    }
    .chart-block{
        border-bottom: 1px solid #eef1f5;
    }
</style>
