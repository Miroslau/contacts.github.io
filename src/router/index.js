import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactPage from '../components/ContactPage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: () => import('../components/Contacts.vue')
  },
  {
    path: '/ContactPage',
    name: 'ContactPage',
    component: ContactPage,
    props: true,
  }
]

const router = new VueRouter({
  routes
})

export default router
