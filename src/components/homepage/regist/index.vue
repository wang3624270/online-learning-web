<template>
    <div>
        <el-dialog title="注册账号" :visible.sync="show" width="800px" v-loading="loading">

        </el-dialog>
    </div>
</template>
<script>
    import LoginInterface from '@/interfaces/loginInterface';

    export default {
        data() {
            return {

                show:false,
                loading:false
            }
        },
        watch: {

        },
        methods:{

        }
    }
</script>
<style scoped>

</style>
