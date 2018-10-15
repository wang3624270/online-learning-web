<template>
    <div>
        <el-pagination
            :page-size="size"
            :page-sizes="sizes"
            :total="total"
            :current-page="cur"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            v-if="total>0">
        </el-pagination>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                size: this.pageSize,
                cur: this.curPage,
                sizes: this.sizeOptions || [10, 30, 50 ]
            };
        },
        props: ['pageSize', 'total', 'curPage', 'clickCallback', 'sizeOptions' ],
        watch: {
            pageSize: function(val) {
                this.size = val;
            },
            curPage: function(val) {
                this.cur = val;
            },
            sizeOptions: function(val) {
                if (val && val instanceof Array) {
                    this.sizes = val;
                } else {
                    this.sizes = [10, 30, 50];
                }
            }
        },
        methods: {
            handleSizeChange (curSize) {
                let self = this;
                self.size = curSize;
                self.cur = 1;
                if (self.clickCallback) {
                    self.clickCallback(curSize, self.cur);
                }
            },

            handleCurrentChange (curPage) {
                let self = this;
                self.cur = curPage;
                if (self.clickCallback) {
                    self.clickCallback(self.size, curPage);
                }
            }
        }
    }
</script>

<style scoped>

</style>
