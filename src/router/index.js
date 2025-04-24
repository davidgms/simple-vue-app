import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/events/Details.vue'
import EventLayout from '../views/events/Layout.vue'
import EventEdit from '../views/events/Edit.vue'
import EventRegister from '../views/events/Register.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: () => import(/* webpackChunkName: "event-list" */ '../views/EventList.vue'),
      props: route => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'event-details',
          props: true,
          component: EventDetails,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return {path: '/events/' + to.params.afterEvent}
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top:0 }
    }
  },
})

export default router
