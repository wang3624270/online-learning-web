<template>
    <div>
        <el-dialog title="忘记密码"  :center="true" :visible.sync="show" width="600px" v-loading="loading" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="form"  label-width="120px">
                <el-form-item label="手机号">
                    <el-input class="_input-width" type="password" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input placeholder="请输入验证码" style="width:300px;">
                        <el-button slot="append">获取短信验证码</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input class="_input-width" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="重复输入新密码">
                    <el-input class="_input-width" type="password" placeholder="请重复输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" round>提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import LoginInterface from '@/interfaces/loginInterface';
    import {genderCodes} from '@/dictionary/manageOptions.js'

    export default {
        data() {
            return {
                form:{

                },
                show:false,
                loading:false
            }
        },
        watch: {

        },
        methods:{

        }
    }
</script>
<style scoped>
    ._input-width{
        width: 380px;
    }
</style>
