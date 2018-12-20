<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="讲座研讨主题">
                        <el-input v-model="form.theme" placeholder="请输入讲座研讨主题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="list" border style="width: 100%" size="middle" v-loading="loading">
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="theme" label="主题">
                        <template slot-scope="scope">
                            <a href="#" @click="detail(scope.row)">{{scope.row.theme}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="speaker" label="主讲"></el-table-column>
                    <el-table-column prop="collegeName" label="主办学院"></el-table-column>
                    <el-table-column prop="startTime" label="直播时间" width="160px">
                        <template slot-scope="scope">
                            {{scope.row.startTimeStr}}-{{scope.row.endTimeStr}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="讲座直播">
                        <template slot-scope="scope">
                            <el-button @click="come(scope.row)" type="text" size="small" v-if="scope.row.value=='1'">点击进入</el-button>
                            <span v-else>不在直播时间内<el-button @click="search" type="text" size="small">点击刷新</el-button></span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <portal-lecture-info  :data="data" ref="lectureInfo"></portal-lecture-info>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import LectureInfo from '@/components/lecture/lecturePreview/lectureInfo.vue';


    export default {
        data() {
            return {
                form:{
                    theme:'',
                },
                data:{},
                list:[],
                loading:false
            }
        },
        components: {
            'portal-lecture-info':LectureInfo
        },
        mounted(){
            this.search();
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                params.lectureType='1';
                params.state='1';
                LectureInterface.getEntryList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.entryList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            detail(params){
                this.data=params;
                this.$refs.lectureInfo.show=true;
            },
            come(live){
                this.$router.push({
                    name: 'liveStudy',
                    query: {
                        lectureId:live.lectureId,
                        liveId:live.liveId,
                        theme:live.theme
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>
