<template>
    <div>
        <el-container>
            <el-header height="auto">
                <el-form :inline="true" :model="form" class="demo-form-inline" size="middle">
                    <el-form-item label="讲座主题">
                        <el-input v-model="form.theme" placeholder="请输入讲座主题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search" size="middle" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main  v-loading="loading">
                <portal-lecture-item v-for="item in list" :data="item" :key="item.lectureId"></portal-lecture-item>
                <div class="fix"></div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import LectureInterface from '@/interfaces/lectureInterface';
    import LectureImgItem from './lectureImgItem.vue';

    export default {
        data() {
            return {
                form:{
                    theme:''
                },
                list:[],
                loading:false
            }
        },
        mounted(){
            this.search();
        },
        components:{
            "portal-lecture-item":LectureImgItem
        },
        methods:{
            search(){
                this.loading=true;
                let params=this.form;
                params.lectureType='1';
                LectureInterface.getLectureList(params).then( (res) => {
                    this.loading=false;
                    if (res.re == LectureInterface.SUCCESS) {
                        let data=res.data;
                        this.list=data.lectureList;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            }
        }
    }
</script>
<style scoped>
#clearFloat{
    clear: both;
}
</style>
