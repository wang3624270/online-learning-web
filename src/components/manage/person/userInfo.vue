<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" size="middle" label-width="80px">
                <el-form-item label="登录名" prop="perNum">
                    <el-input v-model="form.perNum"  placeholder="请输入学号/工号" class="unified_style"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="pwd">
                    <el-input v-model="form.pwd" placeholder="请输入密码" class="unified_style"></el-input>
                </el-form-item>
                <el-form-item label="用户群组" prop="groupid">
                    <el-select v-model="form.groupid" placeholder="请选择用户群组" class="unified_style">
                        <el-option v-for="item in groupids" :label="item.name" :value="item.groupid" :key="item.groupid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="perName">
                    <el-input v-model="form.perName"  placeholder="请输入姓名" class="unified_style"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="perIdCard">
                    <el-input v-model="form.perIdCard" placeholder="请输入身份证号" class="unified_style"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="genderCode">
                    <el-select v-model="form.genderCode" placeholder="请选择用户性别" class="unified_style">
                        <el-option v-for="item in genderCodes" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式" prop="mobilePhone">
                    <el-input v-model="form.mobilePhone"  placeholder="请输入联系方式" class="unified_style"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitInfo" >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import {genderCodes} from '@/dictionary/manageOptions.js'

    export default {
        data() {
            return {
                form:{
                    personId:'',
                    perNum:'',
                    pwd:'',
                    groupid:'',
                    perName:'',
                    perIdCard:'',
                    genderCode:'',
                    mobilePhone:''
                },
                groupids:[],
                genderCodes:genderCodes,
                title:'',
                show: false,
                loading:false
            };
        },
        watch:{
          show(val){
              if(val==true && this.form.personId==''){
                  this.resetForm('form');
              }
          }
        },
        methods: {
            submitInfo(){
                this.loading=true;
                let params=this.form;
                ManageInterface.addOrEditUser(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        this.show = false;
                        this.$message.success('操作成功！😊');
                        this.$emit('refresh-list');
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            resetForm(formName) {
                this.$nextTick(() => {
                    this.$refs[formName].resetFields()
                })
            }

        }
    };
</script>
<style scoped>
    .unified_style{
        width: 280px;
    }
</style>
