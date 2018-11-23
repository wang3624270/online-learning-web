<template>
    <div>
        <el-dialog title="上传资源" :visible.sync="show" width="400px" :close-on-click-modal="false">
            <el-upload class="upload-demo" drag :action="uploadUrl" multiple :on-success="uploadSucess" :data="params">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">上传文件不能超过500MB</div>
            </el-upload>
        </el-dialog>
    </div>
</template>
<script>
    import CourseInterface from '@/interfaces/courseInterface';
    import ManageInterface from '@/interfaces/manageInterface';

    export default {
        data() {
            return {
                params:{
                    personId:''
                },
                uploadUrl:CourseInterface.resourceUploadUrl(),
                show: false
            };
        },
        beforeMount(){
            let params={};
            ManageInterface.getPersonInfo(params).then( (res) => {
                if (res.re == CourseInterface.SUCCESS) {
                    let data=res.data;
                    this.params.personId=data.personId;
                } else {
                    this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                }
            });
        },
        methods: {
            uploadSucess(){
                this.$emit('refresh-list');
            }
        }
    };
</script>
