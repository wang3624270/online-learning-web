<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" class="demo-form-inline" size="middle">
                    <el-form-item>
                        <el-button type="primary" @click="add" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="name" label="群组名称"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="edit(scope.row.groupid,scope.row.name)" type="text" size="small">编辑群组</el-button>
                            <el-button @click="editRes(scope.row.groupid)" type="text" size="small">关联菜单</el-button>
                            <el-button @click="deleteGroup(scope.row.groupid)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-group-info ref="goupInfo" @refresh-list="search"></portal-group-info>
        <portal-group-res-info ref="groupResInfo" @refresh-list="search"></portal-group-res-info>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import GroupInfo from './groupInfo.vue';
    import GroupResInfo from './groupResInfo.vue';

    export default {
        data() {
            return {
                list:[],
                loading:false
            }
        },
        components: {
            'portal-group-info':GroupInfo,
            'portal-group-res-info':GroupResInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params={};
                ManageInterface.getGroupList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.groupList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            deleteGroup(groupid){
                this.$confirm('此操作将永久删除该群组, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={groupid:parseInt(groupid)};
                    ManageInterface.deleteGroup(params).then( (res) => {
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
                this.$refs.goupInfo.show=true;
                this.$refs.goupInfo.title='新增';
            },
            edit(groupid,name){
                this.$refs.goupInfo.show=true;
                this.$refs.goupInfo.title='编辑';
                this.$refs.goupInfo.params={
                    groupid:groupid,
                    name:name
                }
            },
            editRes(groupid){
                this.$refs.groupResInfo.show=true;
                this.$refs.groupResInfo.groupid=groupid;
            }
        }
    }
</script>
<style scoped>

</style>
