import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './auth-guard';

Vue.use(Router);

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
      component: require('@/components/Meetup/Create'),
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      props: true,
      component: require('@/components/Meetup/Show')
    },
    {
      path: '/profile',
      component: require('@/components/User/Profile'),
      beforeEnter: AuthGuard
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
});
