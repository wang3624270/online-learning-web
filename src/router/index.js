import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/homepage'
import Testpage from '@/components/testpage'
import Helloworld from '@/components/helloworld'

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
                path: 'test',
                name: 'testpage',
                component: Testpage
            },
        ]
    },
  ]
})
