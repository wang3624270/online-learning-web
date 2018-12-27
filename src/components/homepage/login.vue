<template>
    <div>
        <el-dialog title="用户登录" :center="true" :visible.sync="show" width="500px" v-loading="loading" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="form"  label-width="80px">
                <el-form-item label="登录名">
                    <el-input v-model="form.loginName" class="_input-width" placeholder="请输入登录名（手机号）"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" class="_input-width" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input placeholder="请输入验证码" style="width: 180px;"></el-input>&nbsp;&nbsp;
                    <img src='./assets/images/identify-2.jpg' alt="验证码">
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="regist">注册账号</el-button>
                <el-button type="primary" @click="doLogin" round>登 录</el-button>
                <el-button type="text" @click="forget">忘记密码</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import LoginInterface from '@/interfaces/loginInterface';

    export default {
        data() {
            return {
                form:{
                    loginName:'student',
                    password:'1',
                },
                loading:false,
                show:false
            };
        },
        methods: {
            doLogin() {
                let params=this.form;
                this.loading=true;
                LoginInterface.doLogin(params).then( (res) => {
                    if (res.reCode == LoginInterface.SUCCESS_CODE) {
                        this.$router.push({path: '/index'});
                    } else {
                        this.loading=false;
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            regist(){
                this.show = false;
                this.$emit('open-regist');
            },
            forget(){
                this.show = false;
                this.$emit('open-forget');
            }
        }
    };
</script>
<style scoped>
    ._input-width{
        width: 310px;
    }
</style>
