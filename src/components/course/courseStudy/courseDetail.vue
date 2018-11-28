<template>
    <div>
        <div class="tpl-content-scope">
            <div class="note note-info">
                <h3><span id="courseName">课程名称</span>
                    <span class="close" data-close="note"></span>
                </h3>
                <p>课程介绍</p>
                <p><span class="label label-danger" id="course-title">课程公告</span><span id="course-news">（一）人员管理，人员管理主要分为了用户查询，用户添加、删除，以及用户角色的维护等。点击左侧“人员管理”菜单之后，将显示如图1.3所示操作界面，用户可以选择按用户名查询或者按角色查询，也可以查询全部用户。</span></p>
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
            this.activeTab = 'COURSE-INTRODUCE';
        },
        beforeMount(){
            this.form.taskId = this.$route.query.taskId || null;
            this.form.courseId = this.$route.query.courseId || null;
        },
        components:{
            'portal-course-introduce':CourseIntroduce,
            'portal-course-section':CourseSection,
            'portal-course-interlocution':CourseInterlocution,
            'portal-course-comment':CourseComment
        },
        methods:{

        }
    }
</script>
<style scoped>

</style>
