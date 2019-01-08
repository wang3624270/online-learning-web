<template>
    <div>
        <ul id="sectionsList" class="tpl-task-list tpl-task-remind">
            <!-- 这里是课程节次 -->
            <li style="cursor:pointer;" v-for="item in sectionList" @click="playVideo(item)" :key="item.sectionId">
                <div class="cosB">
                    <span class="am-badge tpl-badge-success am-round" v-if="item.isFinish=='1'">已完成</span>
                    <span class="am-icon-circle-o" style="margin-top: 4px;" v-else></span>
                </div>
                <div class="cosA">
                    <span class="am-icon-caret-right" style="width:15px;"></span>
                    <span>{{item.sectionName}}</span>
                </div>
            </li>
         </ul>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import {courseTypes} from '../../courseManage/options.js';

    export default {
        data() {
            return {
                sectionList:[]
            };
        },
        mounted(){
            this.initSectionList();
        },
        props:['data'],
        methods: {
            initSectionList(){
                let params={taskId:parseInt(this.data.taskId)};
                CourseInterface.getCourseSectionList(params).then( (res) => {
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.sectionList=data.sectionList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            playVideo(item){
                if(item.state!='1'){
                    this.$message.error(`请依次完成以上节次的学习再学习本节！😅`);
                    return;
                }
                this.$router.push({
                    name: 'videoStudy',
                    query: {
                        taskId:item.taskId,
                        courseId:item.courseId,
                        sectionId:item.sectionId,
                        sectionName:item.sectionName,
                        practiceId:item.practiceId
                    }
                });
            }
        }
    };
</script>
<style scoped>
</style>
