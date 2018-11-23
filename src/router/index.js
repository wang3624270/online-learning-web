import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/homepage';
import Helloworld from '@/components/helloworld';
import MenuManage from '@/components/manage/menu';
import GroupManage from '@/components/manage/group';
import PersonManage from '@/components/manage/person';
import CourseManage from '@/components/course/courseManage';
import ResourceManage from '@/components/course/resourceManage';
import TermManage from '@/components/course/term';
import TeachTackManage from '@/components/course/teachTackManage';
import CourseStudy from '@/components/course/courseStudy';

Vue.use(Router);
//懒加载
const Framepage = resolve => require(['@/components/framepage'], resolve);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: Homepage
        },
        {
            path: '/index',
            component: Framepage,
            children: [
                {
                    path: '',
                    name: 'helloworld',
                    component: Helloworld
                },
                {
                    path: '/index/manage/menu',
                    name: 'menuManage',
                    component: MenuManage
                },
                {
                    path: '/index/manage/group',
                    name: 'groupManage',
                    component: GroupManage
                },
                {
                    path: '/index/manage/person',
                    name: 'personManage',
                    component: PersonManage
                },
                {
                    path: '/index/course/courseManage',
                    name: 'courseManage',
                    component: CourseManage
                },
                {
                    path: '/index/course/resourceManage',
                    name: 'resourceManage',
                    component: ResourceManage
                },
                {
                    path: '/index/course/term',
                    name: 'termManage',
                    component: TermManage
                },
                {
                    path: '/index/course/teachTackManage',
                    name: 'teachTackManage',
                    component: TeachTackManage
                },
                {
                    path: '/index/course/courseStudy',
                    name: 'courseStudy',
                    component: CourseStudy
                }
            ]
        },
        {
            path:'*',
            redirect:'/index'
        }
    ]
})
