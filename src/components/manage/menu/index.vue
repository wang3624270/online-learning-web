<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                    <el-form-item label="路径">
                        <el-input v-model="form.path" placeholder="请输入菜单路径"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" @click="add" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="name" label="菜单名称"></el-table-column>
                    <el-table-column prop="path" label="路径"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.resid,scope.row.name,scope.row.path)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteMenu(scope.row.resid)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-res-info ref="resInfo" @refresh-list="search"></portal-res-info>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import ResInfo from './resInfo.vue';

    export default {
        data() {
            return {
                form:{
                    name:'',
                    path:''
                },
                list:[],
                loading:false
            }
        },
        components: {
            'portal-res-info':ResInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                ManageInterface.getMenuList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.menuList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteMenu(resid){
                this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={resid:parseInt(resid)};
                    ManageInterface.deleteMenu(params).then( (res) => {
                        if (res.re == ManageInterface.SUCCESS) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.search();
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            add(){
                this.$refs.resInfo.show=true;
                this.$refs.resInfo.title='新增';
                this.$refs.resInfo.params={
                    resid:"",
                    name:"",
                    path:""
                }
            },
            edit(resid,name,path){
                this.$refs.resInfo.show=true;
                this.$refs.resInfo.title='编辑';
                this.$refs.resInfo.params={
                    resid:resid,
                    name:name,
                    path:path
                }
            }
        }
    }
</script>
<style scoped>

</style>
