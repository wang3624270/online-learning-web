<template>
    <div>
        <ol class="breadcrumb">
            <li><router-link :to="{ path: '/qube'}">首页</router-link></li>
            <li>报表类数据</li>
            <li class="active">原创认证统计</li>
        </ol>
        <div>
            <el-form :inline="true" class="demo-form-inline" :model="form" size="small" @submit.native.prevent>
                <el-form-item label="日期范围">
                    <el-date-picker
                        v-model="dateRange"
                        type="daterange"
                        align="right"
                        placeholder="请选择日期范围"
                        :clearable="false"
                        :editable="false"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="tableData" stripe border v-loading.body="loading" max-height="500">
                <el-table-column label="日期" prop="dt"></el-table-column>
                <el-table-column label="每日原创认证申请人数" prop="new_apply_num"></el-table-column>
                <el-table-column label="每日新增原创认证用户数" prop="new_verified_num"></el-table-column>
                <el-table-column label="原创认证用户总数" prop="original_total"></el-table-column>
                <el-table-column label="原创认证用户占比" prop="originalRatio" :formatter="formatRate"></el-table-column>
                <el-table-column label="每日侵权行为覆盖人数" prop="daily_tort_num"></el-table-column>
                <el-table-column label="累计侵权行为覆盖人数" prop="total_tort_num"></el-table-column>
                <el-table-column label="因侵权行为而取消原创认证总数" prop="tort_cancel_original_verified_num"></el-table-column>
                <el-table-column label="每日活跃原创认证用户数（有视频发布）" prop="dailyActiveOriginalUserNum"></el-table-column>
                <el-table-column label="每日声明原创视频数" prop="dailyDeclareOriginalVideoNum"></el-table-column>
                <el-table-column label="每日违规声明原创视频数" prop="dailyInvalidOriginalVideoNum"></el-table-column>
                <el-table-column label="每日声明转载视频数" prop="dailyDeclareReprintVideoNum"></el-table-column>
            </el-table>
        </div>
        <portal-pagination v-show="!loading" slot="page" :page-size="pageSize" :total="total" :cur-page="pageCur" :click-callback="listen"></portal-pagination>
    </div>
</template>

<script>
    import { DATETIMERANG_SHORTCUTS } from '@/kit/utils';
    import TimeFormatUtils from '@/kit/timeFormatUtils';
    import Pagination from '@/widgets/pagination';

    export default {
        myChart : null,
        data() {
            let end = TimeFormatUtils.getPreviousDate(0, 0);
            let start = TimeFormatUtils.getPreviousDate(7, 0);
            return {
                form: {
                    startDate: start,
                    endDate: end
                },
                tableData: [],
                dateRange: [start, end],
                pickerOptions: Object.assign( {},
                    DATETIMERANG_SHORTCUTS,
                    {
                        disabledDate: (time) => {
                            return time.getTime() > Date.now();
                        }
                    }
                ),
                loading: false,

                pageCur: 1,
                pageSize: 20,
                total: 0
            };
        },
        mounted() {
            this.search();
        },
        components: {
            'portal-pagination': Pagination
        },
        watch: {
            dateRange(val, oldVal) {
                this.form.startDate = val[0];
                this.form.endDate = val[1];
                this.getData();
            }
        },
        methods: {
            search(){
                this.pageCur=1;
                this.getData();
            },
            getData() {
                // this.tableData = [];
                // this.loading = true;
                // this.form.pageIndex = this.pageCur;
                // this.form.pageSize = this.pageSize;
                // QubeInter.getOriginalDT(this.form).then( (res) => {
                //     this.loading = false;
                //     if (res && res.status == 'SUCCESS') {
                //         this.tableData = res.originUserData;
                //         this.total = res.resultSize || 0;
                //     } else {
                //         let errMsg = res.errMsg ? `${res.status}:${res.errMsg}` : res.status;
                //         this.$message.error(`出错啦【${errMsg}】，请稍后重试！😅`);
                //     }
                // });
            },

            listen(pageSize, pageIndex) {
                this.pageSize = pageSize;
                this.pageCur = pageIndex;
                this.getData();
            },

            formatRate(row, column, val) {
                return `${(val*100).toFixed(2)}%`;
            }
        }
    };
</script>
