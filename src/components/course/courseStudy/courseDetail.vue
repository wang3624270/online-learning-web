<template>
    <div>
        <div class="tpl-content-scope">
            <div class="note note-info">
                <h3><span id="courseName">{{taskName}}</span>
                    <span class="close" data-close="note"></span>
                </h3>
                <p>{{briefIntroduction}}</p>
                <p><span class="label label-danger" id="course-title">{{news.title}}</span><span id="course-news"> [{{news.createTimeStr}}]{{news.content}}</span></p>
            </div>
        </div>
        <div>
            <el-tabs v-model="activeTab">
                <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.value"></el-tab-pane>
            </el-tabs>
            <div>
                <portal-course-introduce v-if="activeTab == 'COURSE-INTRODUCE'" :show="courseIntroduce" :data="form"></portal-course-introduce>
                <portal-course-section v-if="activeTab == 'COURSE-SECTION'" :show="courseSection" :data="form"></portal-course-section>
                <portal-course-interlocution v-if="activeTab == 'COURSE-INTERLOCUTION'" :show="courseInterlocution" :data="form"></portal-course-interlocution>
                <portal-course-comment v-if="activeTab == 'COURSE-COMMENT'" :show="courseComment" :data="form"></portal-course-comment>
            </div>
        </div>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import CourseIntroduce from './courseDetails/courseIntroduce.vue';
    import CourseSection from './courseDetails/courseSection.vue';
    import CourseInterlocution from './courseDetails/courseInterlocution.vue';
    import CourseComment from './courseDetails/courseComment.vue';

    export default {
        data() {
            return {
                form:{
                    taskId:'',
                    courseId:''
                },
                taskName:'',
                briefIntroduction:'',
                news:{
                    content:'',
                    title:'',
                    createTimeStr:''
                },
                tabs: [
                    { label: '课程介绍', value: 'COURSE-INTRODUCE' },
                    { label: '章节', value: 'COURSE-SECTION' },
                    { label: '问答', value: 'COURSE-INTERLOCUTION' },
                    { label: '评论', value: 'COURSE-COMMENT' }
                ],
                activeTab: '',
                courseIntroduce: false,
                courseSection: false,
                courseInterlocution:false,
                courseComment: false,
            }
        },
        watch: {
            activeTab(val) {
                switch(val) {
                    case 'COURSE-INTRODUCE':
                        this.courseIntroduce = true;
                        this.courseSection=false;
                        this.courseInterlocution = false;
                        this.courseComment = false;
                        break;
                    case 'COURSE-SECTION':
                        this.courseIntroduce = false;
                        this.courseSection=true;
                        this.courseInterlocution = false;
                        this.courseComment = false;
                        break;
                    case 'COURSE-INTERLOCUTION':
                        this.courseIntroduce = false;
                        this.courseSection=false;
                        this.courseInterlocution = true;
                        this.courseComment = false;
                        break;
                    default:
                        this.courseIntroduce = false;
                        this.courseSection=false;
                        this.courseInterlocution = false;
                        this.courseComment = true;
                }
            }
        },
        created(){
            this.activeTab = 'COURSE-SECTION';
        },
        beforeMount(){
            this.form.taskId = parseInt(this.$route.query.taskId) || null;
            this.form.courseId = this.$route.query.courseId || null;
        },
        mounted(){
            this.search();
        },
        components:{
            'portal-course-introduce':CourseIntroduce,
            'portal-course-section':CourseSection,
            'portal-course-interlocution':CourseInterlocution,
            'portal-course-comment':CourseComment
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                CourseInterface.getTaskInfo(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.news=data.news;
                        this.taskName=data.taskName;
                        this.briefIntroduction=data.briefIntroduction;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
        }
    }
</script>
<style scoped>

</style>
