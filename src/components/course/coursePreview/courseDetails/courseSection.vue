<template>
    <div>
        <ul id="sectionsList" class="tpl-task-list tpl-task-remind">
            <!-- 这里是课程节次 -->
            <li v-for="item in sectionList" :key="item.sectionId">
                <div class="cosB">
                    <span class="am-icon-circle-o" style="margin-top: 4px;"></span>
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
        }
    };
</script>
<style scoped>
</style>
