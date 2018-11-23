<template>
    <div>
        <el-dialog title="关联菜单" :visible.sync="show" width="540px"  v-loading="loading">
            <el-transfer
                v-model="relatedList"
                :props="{
                    key: 'value',
                    label: 'desc'
                }"
                :data="unrelatedList"
                :titles="['未关联','已关联']">
            </el-transfer>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doSub">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';

    export default {
        data() {
            return {
                groupid:'',
                unrelatedList: [],
                relatedList: [],
                show: false,
                loading:false
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.loading=true;
                    let params={groupid:this.groupid};
                    ManageInterface.getResListByGroupid(params).then( (res) => {
                        this.loading=false;
                        if (res.re == ManageInterface.SUCCESS) {
                            let data=res.data;
                            this.unrelatedList=data.unrelatedList;
                            this.relatedList=data.relatedList;
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }
            }
        },
        methods: {
            doSub(){
                this.loading=true;
                let params={
                    groupid:this.groupid,
                    relatedList:this.relatedList
                };
                ManageInterface.setGroupFunres(params).then( (res) => {
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
        }
    };
</script>
