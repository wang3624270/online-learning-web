<template>
    <div>
        <el-dialog :title="title" :center="true":visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false" >
            <el-form label-position="top" :show-message="showAnswer">
                <el-form-item v-for="item in list" :error="'正确答案；'+item.answerStr" :label="item.number+'、【'+formatQuestionType(item.questionType)+'】'+item.question" :key="item.questionId">
                    <el-radio-group v-if="item.questionType=='1'"  v-model="item.answer0">
                        <el-radio v-for="subItem in item.optionList" :label="subItem.optionId+''" :key="subItem.optionId">{{subItem.optionContent}}</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-if="item.questionType=='2'"  v-model="item.answer0">
                        <el-checkbox v-for="subItem in item.optionList" :label="subItem.optionId+''" :key="subItem.optionId">{{subItem.optionContent}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="nextSection" v-if="showAnswer">下一节</el-button>
                <el-button type="primary" @click="submitPractice" v-else>提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import CourseInterface from '@/interfaces/courseInterface';
    import {questionTypes} from '@/dictionary/examOptions.js'

    export default {
        data() {
            return {
                form:{
                    practiceId:''
                },
                questionTypes:questionTypes,
                list:[],
                title:'',
                showAnswer:false,
                show: false,
                loading:false,
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.form.practiceId!=null || this.form.practiceId!=''){
                        this.search();
                    }
                }
            }
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getPracticeQustionList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.practiceQustionList;
                        this.list.forEach((item)=>{
                            if(item.questionType=='2'){
                                item.answer=item.answer.split(',');
                            }
                        });
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            formatQuestionType(val) {
                let str = '';
                this.questionTypes.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            submitPractice(){
                this.loading=true;
                let params={
                    taskId:parseInt(this.$route.query.taskId) || null,
                    courseId:parseInt(this.$route.query.courseId) || null,
                    sectionId:parseInt(this.$route.query.sectionId) || null,
                    practiceId:this.form.practiceId
                };
                ExamInterface.submitPractice(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.showAnswer=true;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            nextSection(){
                this.loading=true;
                let params={
                    taskId:parseInt(this.$route.query.taskId) || null,
                    courseId:parseInt(this.$route.query.courseId) || null,
                    sectionId:parseInt(this.$route.query.sectionId) || null
                };
                CourseInterface.getNextSection(params).then( (res) => {
                    this.loading=false;
                    if (res.re == CourseInterface.SUCCESS) {
                        let data=res.data;
                        this.$router.push({
                            name: 'videoStudy',
                            query: data
                        });
                        this.$router.go(0);
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    };
</script>
<style scoped>

</style>
