<template>
    <div class='am-u-sm-12 am-u-md-6 am-u-lg-4' style='float:left;'>
        <div class='tpl-table-images-content'>
            <div class='tpl-table-images-content-i-time'>课程结束时间:{{data.endDate}}</div>
            <div class='tpl-i-title'  style='height:20px;'><span class=' tpl-1-font'>课程名称:{{data.taskName}}</span></div>
            <a href='#' @click="startLearn(data.taskId)" class='tpl-table-images-content-i'>
                <img v-if="data.coverImgAcc" :src='getImgSrc(data.coverImgAcc)' alt='封面图片'>
                <img src='./assets/img/default_cover_img.jpg' alt='封面图片' v-else>
            </a>
            <div class='tpl-table-images-content-block'>
                <div class='tpl-i-font' style='height:42px;'>{{data.briefIntroduction}}</div>
                <div class='tpl-i-more'>
                    <ul>
                        <li><span class='am-text-warning'>已学{{this.getDegree(data.completeDegree)}}%</span></li>
                        <li><span class='am-text-success tpl-1-font'>用时{{this.getTime(data.time)}}</span></li>
                        <li><span class='font-green tpl-1-font'>学至第{{data.sectionIdNode}}节</span></li>
                    </ul>
                </div>
                <div class='am-btn-toolbar'>
                    <div class='am-btn-group am-btn-group-xs tpl-edit-content-btn'>
                        <button @click='startLearn(data.taskId,data.courseId)' type='button' class='am-btn am-btn-default am-btn-success'>
                            <span class='am-icon-hand-o-right'></span> 学习</button>
                        <button onclick='deleteCourse()' type='button' class='am-btn am-btn-default am-btn-danger' style='float:right'>
                            <span class='am-icon-trash-o'></span> 删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';

    export default {
        data() {
            return {

            };
        },
        props: ['data'],
        methods: {
            getImgSrc(coverImgAcc){
                return CourseInterface.coverImgUrl(coverImgAcc);
            },
            startLearn(taskId,courseId){
                const {href} = this.$router.resolve({
                    name: 'courseDetail',
                    query: {
                        taskId: taskId,
                        courseId:courseId
                    }
                })
                window.open(href, '_blank');
            },
            getDegree(val){
                return (val*100).toFixed(2);
            },
            getTime(val){
                return Math.floor(val/60)+'时'+val%60+'分';
            }
        }
    };
</script>
<style scoped>

</style>
