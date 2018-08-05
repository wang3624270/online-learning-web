<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.loginName" placeholder="请输入用户名" id="loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录测试</el-button>
        <el-button type="primary" @click="getData">获取数据测试</el-button>
        <el-button type="primary" @click="loginOut">注销测试</el-button>
      </el-form-item>
    </el-form>
    <el-alert :title="showContent" type="success" v-if="isShow"></el-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form:{
        loginName:'teacher',
        password:'1',
      },
      showContent:[],
      isShow:false,
    }
  },
  methods:{
    onSubmit(){
      let self=this;
      $.ajax({
        contentType : "application/json; charset=utf-8",
        type:"POST",
        url:'/onlinelearning/func/auth/webLogin',
        data:JSON.stringify(this.form),
        success:function (result) {
          if(result.reCode==0){
            sessionStorage['userToken'] = result;
            self.showContent="登录成功！";
            self.isShow=true;
          }else {
            self.showContent=result.errorMessageList;
            self.isShow=true;
          }
        }
      });
    },
    getData(){
      //获取服务器端数据
      $.ajax({
        contentType : "application/json; charset=utf-8",
        type:"POST",
        data:JSON.stringify({}),
        url:'/onlinelearning/func/courseBean/getTermInfo',
        success:function (result) {
          console.log(result);
        },
        error:function (msg) {
          console.log(msg);
        }
      });
    },
    loginOut(){
      let self=this;
      $.ajax({
        contentType : "application/json; charset=utf-8",
        type:"GET",
        data:JSON.stringify({}),
        url:'/onlinelearning/func/auth/webLogout',
        success:function (result) {
          if(result.reCode==0){
            self.showContent="注销成功！";
            self.isShow=true;
          }else {
            self.showContent=result.errorMessageList;
            self.isShow=true;
          }
        }
      });
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
