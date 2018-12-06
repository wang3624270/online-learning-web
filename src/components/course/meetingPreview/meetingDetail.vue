<template>
    <div>
        <el-dialog title="课程详情" :visible.sync="show" width="800px" v-loading="loading">
            <div>
                <el-tabs v-model="activeTab">
                    <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.value"></el-tab-pane>
                </el-tabs>
                <div>
                    <portal-course-introduce v-if="activeTab == 'COURSE-INTRODUCE'" :show="courseIntroduce" :data="form"></portal-course-introduce>
                    <portal-course-section v-if="activeTab == 'COURSE-SECTION'" :show="courseSection" :data="form"></portal-course-section>
                    <portal-course-comment v-if="activeTab == 'COURSE-COMMENT'" :show="courseComment" :data="form"></portal-course-comment>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ManageInterface from '@/interfaces/manageInterface';
    import CourseIntroduce from '@/components/course/coursePreview/courseDetails/courseIntroduce.vue';
    import CourseSection from '@/components/course/coursePreview/courseDetails/courseSection.vue';
    import CourseComment from '@/components/course/coursePreview/courseDetails/courseComment.vue';

    export default {
        data() {
            return {
                form:{
                    taskId:'',
                    courseId:''
                },
                tabs: [
                    { label: '课程介绍', value: 'COURSE-INTRODUCE' },
                    { label: '课程章节', value: 'COURSE-SECTION' },
                    { label: '课程评论', value: 'COURSE-COMMENT' }
                ],
                activeTab: '',
                courseIntroduce: false,
                courseSection: false,
                courseComment: false,
                show: false,
                loading:false
            };
        },
        watch: {
            activeTab(val) {
                switch(val) {
                    case 'COURSE-INTRODUCE':
                        this.courseIntroduce = true;
                        this.courseSection=false;
                        this.courseComment = false;
                        break;
                    case 'COURSE-SECTION':
                        this.courseIntroduce = false;
                        this.courseSection=true;
                        this.courseComment = false;
                        break;
                    default:
                        this.courseIntroduce = false;
                        this.courseSection=false;
                        this.courseComment = true;
                }
            }
        },
        created(){
            this.activeTab = 'COURSE-INTRODUCE';
        },
        components:{
            'portal-course-introduce':CourseIntroduce,
            'portal-course-section':CourseSection,
            'portal-course-comment':CourseComment
        },
        methods: {

        }
    };
</script>
<style scoped>

</style>
