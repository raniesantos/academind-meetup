import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: require('@/components/Home')
    },
    {
      path: '/meetups',
      component: require('@/components/Meetup/Index')
    },
    {
      path: '/meetups/create',
      component: require('@/components/Meetup/Create')
    },
    {
      path: '/meetups/:id',
      props: true,
      component: require('@/components/Meetup/Show')
    },
    {
      path: '/profile',
      component: require('@/components/User/Profile')
    },
    {
      path: '/signup',
      component: require('@/components/User/Signup')
    },
    {
      path: '/signin',
      component: require('@/components/User/Signin')
    }
  ],
  mode: 'history'
})
