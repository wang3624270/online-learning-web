<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="用户编号">
                        <el-input v-model="form.personId" placeholder="请输入用户编号"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名">
                        <el-input v-model="form.perName" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户群组">
                        <el-select v-model="form.groupid" placeholder="请选择用户群组">
                            <el-option v-for="item in groupids" :label="item.name" :value="item.groupid" :key="item.groupid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addUser" size="middle" icon="el-icon-circle-plus-outline">单个添加</el-button>
                        <el-button type="primary" @click="" size="middle" icon="el-icon-upload2">批量导入</el-button>
                        <el-button @click="" type="text" size="mini">下载导入模板</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="personId" label="用户编号"></el-table-column>
                    <el-table-column prop="perName" label="用户姓名"></el-table-column>
                    <el-table-column prop="loginName" label="用户登录名"></el-table-column>
                    <el-table-column prop="password" label="用户登录密码"></el-table-column>
                    <el-table-column prop="groupName" label="用户群组"></el-table-column>
                    <el-table-column prop="mobilePhone" label="联系方式"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="editInfo(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="edit(scope.row.sysusrid,scope.row.groupid)" type="text" size="small">编辑群组</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-person-info ref="personInfo" @refresh-list="search"></portal-person-info>
        <portal-user-info ref="userInfo" @refresh-list="search"></portal-user-info>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import PersonInfo from './personInfo.vue';
    import UserInfo from './userInfo.vue';

    export default {
        data() {
            return {
                form:{
                    personId:'',
                    perName:'',
                    groupid:''
                },
                groupids:[],
                list:[],
                loading:false
            }
        },
        components: {
            'portal-person-info':PersonInfo,
            'portal-user-info':UserInfo
        },
        mounted(){
            this.search();
            this.initGroupids();
        },
        methods:{
            initGroupids(){
                let params={};
                ManageInterface.getGroupList(params).then( (res) => {
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.groupids=data.groupList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            search(){
                this.loading=true;
                let params={
                    personId:parseInt(this.form.personId),
                    perName:this.form.perName,
                    groupid:parseInt(this.form.groupid)
                };
                ManageInterface.getPersonList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.personList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            edit(sysusrid,groupid){
                this.$refs.personInfo.show=true;
                this.$refs.personInfo.params={
                    sysusrid:sysusrid,
                    groupid:groupid
                };
                this.$refs.personInfo.groupids=this.groupids;
            },
            addUser(){
                this.$refs.userInfo.form.personId='';
                this.$refs.userInfo.groupids=this.groupids;
                this.$refs.userInfo.title='新增';
                this.$refs.userInfo.show=true;
            },
            editInfo(params){
                this.$refs.userInfo.form=params;
                this.$refs.userInfo.groupids=this.groupids;
                this.$refs.userInfo.title='编辑';
                this.$refs.userInfo.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
