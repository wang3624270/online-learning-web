<template>
  <div>
    <header class="am-topbar am-topbar-inverse admin-header">
      <div class="am-topbar-brand">
        <a href="javascript:;" class="tpl-logo">
          <img src="./assets/img/logo.png" alt="">
        </a>
      </div>
      <div class="am-icon-list tpl-header-nav-hover-ico am-fl am-margin-right">

      </div>

      <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

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
                      <img src="./assets/img/user02.png" alt=""> </span>
                  <span class="tpl-dropdown-content-subject">
                      <span class="tpl-dropdown-content-from"> 禁言小张 </span>
                                <span class="tpl-dropdown-content-time">10分钟前 </span>
                                </span>
                  <span class="tpl-dropdown-content-font"> Amaze UI 的诞生，依托于 GitHub 及其他技术社区上一些优秀的资源；Amaze UI 的成长，则离不开用户的支持。 </span>
                </a>
                <a href="#" class="tpl-dropdown-content-message">
                                <span class="tpl-dropdown-content-photo">
                      <img src="./assets/img/user03.png" alt=""> </span>
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
              <span class="tpl-header-list-user-nick">禁言小张</span><span class="tpl-header-list-user-ico"> <img src="./assets/img/user01.png"></span>
            </a>
            <ul class="am-dropdown-content">
              <li><a href="#"><span class="am-icon-bell-o"></span> 资料</a></li>
              <li><a href="#"><span class="am-icon-cog"></span> 设置</a></li>
              <li><a href="/"><span class="am-icon-power-off"></span> 退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </header>

    <div class="tpl-page-container tpl-page-header-fixed">

      <div class="tpl-left-nav tpl-left-nav-hover">
        <div class="tpl-left-nav-title">
          Amaze UI 列表
        </div>
        <div class="tpl-left-nav-list">
          <ul class="tpl-left-nav-menu">
            <li class="tpl-left-nav-item" @click="clearMenu">
              <router-link to="/index" class="nav-link">
                <i class="am-icon-home"></i>
                <span>首页</span>
               </router-link>
            </li>
            <li class="tpl-left-nav-item" v-for="(item,index1) in navItems">
              <a class="nav-link tpl-left-nav-link-list">
                <i :class="item.icon"></i>
                <span>{{item.label}}</span>
                <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right tpl-left-nav-more-ico-rotate"></i>
              </a>
              <ul @click="selectMenu(index1,index2)" class="tpl-left-nav-sub-menu" style="display: block;" v-for="(subItem,index2) in item.children">
                <li>
                  <router-link :to="subItem.path" name="second-level" :class="subItem.style">
                    <i class="am-icon-angle-right"></i>
                    <span>{{subItem.label}}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="tpl-content-wrapper">
        <div class="tpl-portlet-components" style="min-height: 600px;">
            <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
      import './assets/css/amazeui.min.css';
      import './assets/css/admin.css';
      import './assets/css/app.css';
      import { iscroll } from'./assets/js/iscroll.js';
      import { app } from'./assets/js/app.js';
      import navItems from './navItems';
      import AmazeUI  from 'amazeui';
      import $ from 'jquery';
      export default {
          data () {
            return {
                navItems:navItems,
                clearHighlightItem:null,
                lastIndex1:null,
                lastIndex2:null
            }
          },
          mounted(){
              iscroll(window, document, Math);
              app();
          },
          methods:{
              selectMenu(index1,index2){
                  this.clearMenu();
                  this.navItems[index1].children[index2].style='select-menu';
                  this.lastIndex1=index1;
                  this.lastIndex2=index2;
                  console.log(this.navItems);
              },
              clearMenu(){
                  if(this.lastIndex1!=null){
                      this.navItems[this.lastIndex1].children[this.lastIndex2].style='';
                  }
              }
          }
      }
</script>
<style scoped>
    .select-menu{
        border-left: 3px solid #5C9ACF!important;
        background: #f2f6f9;
        margin-left: -3px;
    }
</style>
