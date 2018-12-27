<template>
    <div>
        <el-dialog :title="title" :visible.sync="show" width="600px" v-loading="loading" :close-on-click-modal="false">
            <pre>{{content}}</pre>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="close">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import ManageInterface from '@/interfaces/manageInterface';

    export default {
        data() {
            return {
                content:'',
                title:'',
                show: false,
                loading:false
            };
        },
        methods: {
            close(){
                this.show=false;
            }
        }
    };
</script>
<style scoped>

</style>
