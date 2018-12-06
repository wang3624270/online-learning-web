<template>
    <div>
        <el-dialog title="签到记录" :visible.sync="show" width="800px" v-loading="loading" :close-on-click-modal="false">
            <el-table :data="applyList" border style="width: 100%" size="middle" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" :selectable="func"></el-table-column>
                <el-table-column prop="attendance" label="签到情况" :formatter="formatAttendance" v-if="!showAttend"></el-table-column>
                <el-table-column prop="perNum" label="用户名"></el-table-column>
                <el-table-column prop="perName" label="姓名" ></el-table-column>
                <el-table-column prop="mobilePhone" label="联系方式"></el-table-column>
                <el-table-column prop="createTimeStr" label="报名时间"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer" v-show="showAttend">
                <el-button type="primary" @click="attendance">签到</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import {attendances} from '@/dictionary/lectureOptions.js'

    export default {
        data() {
            return {
                multipleSelection:[],
                applyList:[],
                lectureId:'',
                show: false,
                loading:false,
                showAttend:false,
                attendances:attendances
            };
        },
        watch:{
            show(val){
                if(val==true){
                    this.loading=true;
                    let params={
                        lectureId:this.lectureId
                    };
                    LectureInterface.hasAttendance(params).then( (res) => {
                        this.loading=false;
                        if (res.re == LectureInterface.SUCCESS) {
                            let data=res.data;
                            this.showAttend=data.showAttend;
                            console.log(data.showAttend);
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }
            }
        },
        methods: {
            attendance(){
                this.$confirm('此操作将提交签到记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params={
                        entryList:this.multipleSelection,
                        lectureId:this.lectureId
                    };
                    LectureInterface.subAttendance(params).then( (res) => {
                        if (res.re == LectureInterface.SUCCESS) {
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        } else {
                            this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            formatAttendance(row, column, val) {
                let str = '';
                this.attendances.forEach((option) => {
                    if(option.value == val) {
                        str = option.label;
                    }
                });
                return str;
            },
            func(){
                return this.showAttend;
            }
        }
    };
</script>
<style scoped>

</style>
