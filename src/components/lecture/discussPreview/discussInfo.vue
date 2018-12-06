<template>
    <div>
        <el-dialog :title="data.theme" :visible.sync="show" width="800px" v-loading="loading">
            <div style="min-height: 302px;">
                <div>
                <img v-if="data.coverImgAcc" :src='getImgSrc(data.coverImgAcc)' alt='封面图片' class="imgStyle">
                <img src='@/components/course/courseStudy/assets/img/default_cover_img.jpg' alt='封面图片' v-else class="imgStyle">
                </div>
                {{data.introduce}}
            </div>
            <el-form label-width="150px" >
                <el-form-item label="课程研讨报名起止时间:"  class="united_style">
                    {{data.registStart}} - {{data.registEnd}}
                </el-form-item>
                <el-form-item label="课程研讨地点:" class="united_style">
                    {{data.place}}
                </el-form-item>
                <el-form-item label="课程研讨时间:" class="united_style">
                    {{data.startTimeStr}} - {{data.endTimeStr}}
                </el-form-item>
                <el-form-item label="最大报名人数:" class="united_style">
                    {{data.maxNumber}}
                </el-form-item>
                <el-form-item label="主办学院:" class="united_style">
                    {{data.collegeName}}
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';

    export default {
        data() {
            return {
                show:false,
                loading:false
            }
        },
        watch: {

        },
        props: ['data'],
        methods:{
            getImgSrc(coverImgAcc){
                return LectureInterface.coverImgUrl(coverImgAcc);
            },
        }
    }
</script>
<style scoped>
.imgStyle{
    width: 520px;
    height: 303px;
    float: right;
}
.united_style{
    margin-bottom: 0px;
}
</style>
