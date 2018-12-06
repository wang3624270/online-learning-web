<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="600px" v-loading="loading" :close-on-click-modal="false">
            <el-form :model="form" ref="form" class="demo-form-inline" label-width="50px" v-if="form.questionType==1 || form.questionType==2">
                <el-form-item label="题目" prop="question">
                    <el-input type="textarea" :rows="2" placeholder="请输入题目" v-model="form.question" class="width-unified"></el-input>
                </el-form-item>
                <el-form-item v-for="item in form.optionList" :label="item.label" :key="item.label">
                    <el-input v-model="item.optionContent" :placeholder="item.placeholder" class="width-unified"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-radio-group v-model="form.answer" v-if="form.questionType==1">
                        <el-radio v-for="item in form.optionList" :label="item.index+''" :key="item.index">{{item.label}}</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-model="form.answers" v-else>
                        <el-checkbox v-for="item in form.optionList" :label="item.index" :key="item.index">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="解析" prop="analysis">
                    <el-input type="textarea" :rows="2" placeholder="请输入解析" v-model="form.analysis" class="width-unified"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="form" ref="form" class="demo-form-inline" label-width="50px" v-else>
                <el-form-item label="题目" prop="question">
                    <el-input type="textarea" :rows="2" placeholder="请输入题目" v-model="form.question" class="width-unified"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                    <el-input type="textarea" :rows="2" placeholder="请输入答案" v-model="form.answer" class="width-unified"></el-input>
                </el-form-item>
                <el-form-item label="解析" prop="analysis">
                    <el-input type="textarea" :rows="2" placeholder="请输入解析" v-model="form.analysis" class="width-unified"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doSub">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ExamInterface from '@/interfaces/examInterface';

    export default {
        data() {
            return {
                form:{
                    examId:'',
                    score:'',
                    questionId:'',
                    question:'',
                    questionType:'',
                    optionList:[],
                    answer:'',
                    answers:[],
                    analysis:''
                },
                optionList0:[],
                optionNumber:0,
                title:'',
                show: false,
                loading:false
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.form.questionId==''){
                        this.form.optionList=[];
                        this.resetForm();
                        let size=this.optionNumber;
                        for(let i=0;i<size;i++){
                            this.form.optionList.push({
                                label:'选项'+(i+1),
                                placeholder:'请输入选项'+(i+1),
                                optionContent:'',
                                index:i
                            });
                        }
                    }else {
                        let size=this.optionList0.length;
                        for(let i=0;i<size;i++){
                            this.form.optionList[i]={
                                label:'选项'+(i+1),
                                placeholder:'请输入选项'+(i+1),
                                optionContent:this.optionList0[i].optionContent,
                                index:this.optionList0[i].optionId+''
                            };
                        }
                        if(this.form.questionType=='2'){
                            this.form.answers=this.form.answer.split(',');
                            console.log(this.form.answers);
                        }
                    }
                }
            }
        },
        methods: {
            doSub(){
                this.loading=true;
                let params=this.form;
                ExamInterface.addOrEditQuestion(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ExamInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            resetForm() {
                this.form.question='';
                this.form.answer='';
                this.form.answers=[];
                this.form.analysis='';
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:500px;
    }
</style>
