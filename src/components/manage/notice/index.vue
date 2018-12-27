<template>
    <div>
        <div class="tpl-portlet-title">
            <div class="tpl-caption font-green ">
                <i class="am-icon-bell-o"></i>
                <span> 最新通知</span>
            </div>
            <div class="actions" v-if="show">
                <ul class="actions-btn">
                    <el-button type="primary" @click="add" size="middle" icon="el-icon-circle-plus-outline">新增</el-button>
                </ul>
            </div>
        </div>
        <el-table :data="list" style="width: 100%" :show-header="false" v-loading="loading">
            <el-table-column prop="createTimeStr" label="日期" width="160"></el-table-column>
            <el-table-column prop="title" label="通知">
                <template slot-scope="scope">
                    <el-button type="text" @click="preview(scope.row)">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" v-if="show">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteNotice(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <portal-notice-info ref="noticeInfo" @refresh-list="search"></portal-notice-info>
        <portal-notice-preview ref="noticePreview" @refresh-list="search"></portal-notice-preview>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';
    import NoticeInfo from './noticeInfo/index.vue';
    import NoticePreview from './noticePreview/index.vue';

    export default {
        data() {
            return {
                perTypeCode:'',
                list:[],
                loading:false
            }
        },
        components: {
            'portal-notice-info':NoticeInfo,
            'portal-notice-preview':NoticePreview
        },
        mounted(){
            this.initPersonInfo();
            this.search();
        },
        computed:{
            show(){
                if(this.perTypeCode=='T' || this.perTypeCode=='M'){
                    return true;
                }else {
                    return false;
                }
            }
        },
        methods:{
            initPersonInfo(){
                ManageInterface.getPersonInfo({}).then( (res) => {
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.perTypeCode=data.perTypeCode;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            search(){
                this.loading=true;
                let params={};
                ManageInterface.getNoticeList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.noticeList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            add(){
                this.$refs.noticeInfo.title='新增';
                this.$refs.noticeInfo.form.noticeId='';
                this.$refs.noticeInfo.show=true;
            },
            edit(notice){
                this.$refs.noticeInfo.title='编辑';
                this.$refs.noticeInfo.form=notice;
                this.$refs.noticeInfo.show=true;
            },
            deleteNotice(notice){
                this.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading=true;
                    let params={
                        noticeId:notice.noticeId
                    };
                    ManageInterface.deleteNotice(params).then( (res) => {
                        this.loading=false;
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
            preview(notice){
                this.$refs.noticePreview.title='['+notice.createTimeStr+']'+notice.title;
                this.$refs.noticePreview.content=notice.content;
                this.$refs.noticePreview.show=true;
            }
        }
    }
</script>
<style scoped>

</style>
