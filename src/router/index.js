import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/homepage'
import Framepage from '@/components/framepage'
import Testpage from '@/components/testpage'
import Helloworld from '@/components/helloworld'

Vue.use(Router)

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
