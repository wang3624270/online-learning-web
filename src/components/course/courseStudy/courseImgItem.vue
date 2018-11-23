<template>
    <div class='am-u-sm-12 am-u-md-6 am-u-lg-4' style='float:left;'>
        <div class='tpl-table-images-content'>
            <div class='tpl-table-images-content-i-time'>课程结束时间:{{data.endDate}}</div>
            <div class='tpl-i-title'><span class=' tpl-1-font'>课程名称:{{data.courseName}}</span></div>
            <a href='javascript:;' class='tpl-table-images-content-i'>
                <img src='./assets/img/default_cover_img.jpg' alt='封面图片'>
            </a>
            <div class='tpl-table-images-content-block'>
                <div class='tpl-i-font' style='height:42px;'>课程简介</div>
                <div class='tpl-i-more'>
                    <ul>
                        <li><span class='am-text-warning'>已学0%</span></li>
                        <li><span class='am-text-success tpl-1-font'>用时36小时23分</span></li>
                        <li><span class='font-green tpl-1-font'>学习至1-1 课程介绍</span></li>
                    </ul>
                </div>
                <div class='am-btn-toolbar'>
                    <div class='am-btn-group am-btn-group-xs tpl-edit-content-btn'>
                        <button onclick='startStudy()' type='button' class='am-btn am-btn-default am-btn-success'>
                            <span class='am-icon-hand-o-right'></span> 学习</button>
                        <button onclick='deleteCourse()' type='button' class='am-btn am-btn-default am-btn-danger' style='float:right'>
                            <span class='am-icon-trash-o'></span> 删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {

            };
        },
        props: ['data'],
        methods: {

        }
    };
</script>
<style scoped>

</style>
