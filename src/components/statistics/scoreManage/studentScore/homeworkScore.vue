<template>
    <div>
        <el-dialog title="课程作业+课程实践" :visible.sync="show" width="600px" v-loading="loading" :close-on-click-modal="false">
            <el-table :data="list1" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="课程作业名称"></el-table-column>
                <el-table-column prop="homeworkScore" label="分数"></el-table-column>
            </el-table>
            <br>
            <el-table :data="list2" border style="width: 100%" size="middle">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="activityName" label="课程实践名称"></el-table-column>
                <el-table-column prop="activityScore" label="分数"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import StatisticsInterface from '@/interfaces/statisticsInterface';

    export default {
        data() {
            return {
                form:{

                },
                list1:[],
                list2:[],
                show: false,
                loading:false
            };
        },
        watch: {
            show(val) {
                if(val==true){
                    if(this.show==true){
                        this.search();
                    }
                }
            }
        },
        methods: {
            search(){
                this.loading=true;
                let params=Object.assign({},this.form);
                StatisticsInterface.getPersonHomeworkScore(params).then( (res) => {
                    this.loading=false;
                    if (res.re == StatisticsInterface.SUCCESS) {
                        let data=res.data;
                        this.list1=data.homeworkList;
                        this.list2=data.activityList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            close(){
                this.show=false;
            }
        }
    };
</script>
<style scoped>
    .width-unified{
        width:250px;
    }
</style>
