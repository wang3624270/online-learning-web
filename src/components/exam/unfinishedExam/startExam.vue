<template>
    <div>
        <el-dialog :title="title" :center="true":show-close="false" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form label-position="top">
                <el-form-item v-for="item in list" :label="item.number+'、【'+formatQuestionType(item.questionType)+'】'+item.question+'（'+item.score+'分）'" :key="item.questionId">
                    <el-radio-group v-if="item.questionType=='1'" v-model="item.answer">
                        <el-radio v-for="subItem in item.optionList" :label="subItem.optionId+''" :key="subItem.optionId">{{subItem.optionContent}}</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-if="item.questionType=='2'" v-model="item.answer">
                        <el-checkbox v-for="subItem in item.optionList" :label="subItem.optionId+''" :key="subItem.optionId">{{subItem.optionContent}}</el-checkbox>
                    </el-checkbox-group>
                    <el-input v-if="item.questionType=='3'" type="textarea" :rows="2"  v-model="item.answer" placeholder="请输入答案"></el-input>
                </el-form-item>
            </el-form>
            <portal-pagination v-show="!loading"
                               :page-size="pageSize"
                               :total="total"
                               :cur-page="pageCur"
                               :click-callback="listen"
                               :size-options="sizeOptions">
            </portal-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="finishExam">交卷</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';
    import Pagination from '@/widgets/pagination';
    import {questionTypes} from '@/dictionary/examOptions.js'

    export default {
        data() {
            return {
                form:{
                    examId:''
                },
                questionTypes:questionTypes,
                list:[],
                title:'',
                show: false,
                loading:false,

                pageCur: 1,
                pageSize: 5,
                total: 0,
                sizeOptions: [5]
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.form.examId!=null && this.form.examId!=''){
                        this.search();
                    }
                }
            }
        },
        components: {
            'portal-pagination': Pagination
        },
        methods: {
            search(){
                this.loading=true;
                let params=this.form;
                params.pageIndex = this.pageCur;
                params.pageSize = this.pageSize;
                ExamInterface.getOnlineExamQustionList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.examQustionList;
                        this.list.forEach((item)=>{
                            if(item.questionType=='2'){
                                item.answer=item.answer.split(',');
                            }
                        });
                        this.total = data.resultSize || 0;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            listen(pageSize, pageIndex) {
                this.pageSize = pageSize;
                this.pageCur = pageIndex;
                //提交答案
                this.loading=true;
                let params={
                    list:this.list
                };
                ExamInterface.submitExamAnswers(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.search();
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
            finishExam(){
                this.loading=true;
                let params=this.form;
                ExamInterface.getFinishNumber(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        let data=res.data;
                        let info='本场考试共'+data.total+'道试题，当前已完成'+data.finish+'道。交卷后，您还可以在考试结束之前继续答题。'
                        this.$confirm(info,'确认交卷?', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.show=false;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
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
