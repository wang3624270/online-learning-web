<template>
    <div v-loading.fullscreen.lock="loading">
        <header class="am-topbar am-topbar-inverse admin-header">
            <div class="am-topbar-brand">
                <router-link to="/index" class="tpl-logo">
                    <img src="@/components/framepage/assets/img/logo.jpg" alt="">
                </router-link>
            </div>
            <div class="am-collapse am-topbar-collapse" id="topbar-collapse">
                <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">
                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                        <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                            <span class="am-icon-bell-o"></span> 提醒 <span class="am-badge tpl-badge-success am-round">5</span>
                        </a>
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-content-external">
                                <h3>你有 <span class="tpl-color-success">5</span> 条提醒</h3><a href="###">全部</a></li>
                            <li class="tpl-dropdown-list-bdbc"><a href="#" class="tpl-dropdown-list-fl"><span class="am-icon-btn am-icon-plus tpl-dropdown-ico-btn-size tpl-badge-success"></span> 【预览模块】移动端 查看时 手机、电脑框隐藏。</a>
                                <span class="tpl-dropdown-list-fr">3小时前</span>
                            </li>
                            <li class="tpl-dropdown-list-bdbc"><a href="#" class="tpl-dropdown-list-fl"><span class="am-icon-btn am-icon-check tpl-dropdown-ico-btn-size tpl-badge-danger"></span> 移动端，导航条下边距处理</a>
                                <span class="tpl-dropdown-list-fr">15分钟前</span>
                            </li>
                            <li class="tpl-dropdown-list-bdbc"><a href="#" class="tpl-dropdown-list-fl"><span class="am-icon-btn am-icon-bell-o tpl-dropdown-ico-btn-size tpl-badge-warning"></span> 追加统计代码</a>
                                <span class="tpl-dropdown-list-fr">2天前</span>
                            </li>
                        </ul>
                    </li>
                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                        <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                            <span class="am-icon-comment-o"></span> 消息 <span class="am-badge tpl-badge-danger am-round">9</span>
                        </a>
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-content-external">
                                <h3>你有 <span class="tpl-color-danger">9</span> 条新消息</h3><a href="###">全部</a></li>
                            <li>
                                <a href="#" class="tpl-dropdown-content-message">
                                <span class="tpl-dropdown-content-photo">
                      <img src="@/components/framepage/assets/img/user02.png" alt=""> </span>
                                    <span class="tpl-dropdown-content-subject">
                      <span class="tpl-dropdown-content-from"> 禁言小张 </span>
                                <span class="tpl-dropdown-content-time">10分钟前 </span>
                                </span>
                                    <span class="tpl-dropdown-content-font"> Amaze UI 的诞生，依托于 GitHub 及其他技术社区上一些优秀的资源；Amaze UI 的成长，则离不开用户的支持。 </span>
                                </a>
                                <a href="#" class="tpl-dropdown-content-message">
                                <span class="tpl-dropdown-content-photo">
                      <img src="@/components/framepage/assets/img/user03.png" alt=""> </span>
                                    <span class="tpl-dropdown-content-subject">
                      <span class="tpl-dropdown-content-from"> Steam </span>
                                <span class="tpl-dropdown-content-time">18分钟前</span>
                                </span>
                                    <span class="tpl-dropdown-content-font"> 为了能最准确的传达所描述的问题， 建议你在反馈时附上演示，方便我们理解。 </span>
                                </a>
                            </li>

                        </ul>
                    </li>
                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                        <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                            <span class="am-icon-calendar"></span> 进度 <span class="am-badge tpl-badge-primary am-round">4</span>
                        </a>
                        <ul class="am-dropdown-content tpl-dropdown-content">
                            <li class="tpl-dropdown-content-external">
                                <h3>你有 <span class="tpl-color-primary">4</span> 个任务进度</h3><a href="###">全部</a></li>
                            <li>
                                <a href="javascript:;" class="tpl-dropdown-content-progress">
                                <span class="task">
                        <span class="desc">Amaze UI 用户中心 v1.2 </span>
                                <span class="percent">45%</span>
                                </span>
                                    <span class="progress">
                        <div class="am-progress tpl-progress am-progress-striped"><div class="am-progress-bar am-progress-bar-success" style="width:45%"></div></div>
                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" class="tpl-dropdown-content-progress">
                                <span class="task">
                        <span class="desc">新闻内容页 </span>
                                <span class="percent">30%</span>
                                </span>
                                    <span class="progress">
                       <div class="am-progress tpl-progress am-progress-striped"><div class="am-progress-bar am-progress-bar-secondary" style="width:30%"></div></div>
                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" class="tpl-dropdown-content-progress">
                                <span class="task">
                        <span class="desc">管理中心 </span>
                                <span class="percent">60%</span>
                                </span>
                                    <span class="progress">
                        <div class="am-progress tpl-progress am-progress-striped"><div class="am-progress-bar am-progress-bar-warning" style="width:60%"></div></div>
                    </span>
                                </a>
                            </li>

                        </ul>
                    </li>
                    <li class="am-hide-sm-only"><a href="javascript:;" id="admin-fullscreen" class="tpl-header-list-link"><span class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a></li>

                    <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                        <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                            <span class="tpl-header-list-user-nick">{{perName}}</span><span class="tpl-header-list-user-ico"> <img src="@/components/framepage/assets/img/user.png"></span>
                        </a>
                        <ul class="am-dropdown-content">
                            <li><a href="#"><span class="am-icon-bell-o"></span> 资料</a></li>
                            <li><a href="#"><span class="am-icon-cog"></span> 设置</a></li>
                            <li><a href="#" @click="logout"><span class="am-icon-power-off"></span> 退出</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
        <div class="tpl-page-header-fixed">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import '@/components/framepage/assets/css/common.css';
    import '@/components/framepage/assets/css/amazeui.min.css';
    import '@/components/framepage/assets/css/admin.css';
    import '@/components/framepage/assets/css/app.css';
    import { iscroll } from'@/components/framepage/assets/js/iscroll.js';
    import { app } from'@/components/framepage/assets/js/app.js';
    import navItems from '@/components/framepage/navItems';
    import AmazeUI  from 'amazeui';
    import LoginInterface from '@/interfaces/loginInterface';
    import ManageInterface from '@/interfaces/manageInterface';

    export default {
        data () {
            return {
                perName:'',
                groupName:'',
                navItems:[],
                clearHighlightItem:null,
                lastIndex1:null,
                lastIndex2:null,
                loading:false
            }
        },
        beforeMount(){
            this.loading=true;
            this.initPersonInfo();
        },
        mounted(){
            iscroll(window, document, Math);
            app();
        },
        methods:{
            initPersonInfo(){
                ManageInterface.getPersonInfo({}).then( (res) => {
                    this.loading=false;
                    if (res.re == ManageInterface.SUCCESS) {
                        let data=res.data;
                        this.groupName=data.groupName;
                        this.perName=data.perName;
                    } else {
                        this.$message.error(`出错啦【${res.data}】，请稍后重试！😅`);
                    }
                });
            },
            logout(){
                this.loading=true;
                LoginInterface.doLogout({}).then( (res) => {
                    this.loading=false;
                    window.location.href='/';
                });
            }
        }
    }
</script>
<style scoped>
    #vjs_video_3{
        width: 100%;
    }
</style>
