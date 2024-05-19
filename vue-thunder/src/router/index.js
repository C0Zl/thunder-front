import { createRouter, createWebHistory } from 'vue-router';

import AlbumView from '@/views/AlbumView.vue';
import BoardView from '@/views/BoardView.vue';
import FriendView from '@/views/FriendView.vue';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import MyThunderView from '@/views/MyThunderView.vue';
import ThunderView from '@/views/ThunderView.vue';
import UserView from '@/views/UserView.vue';

import Signup from '@/components/user/Signup.vue';
import Login from '@/components/user/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { showHeader: true }
    },
    {
      path: '/album',
      name: 'album',
      component: AlbumView,
      meta: { showHeader: true }
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
      meta: { showHeader: true }
    },
    {
      path: '/friend',
      name: 'friend',
      component: FriendView,
      meta: { showHeader: true }
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManageView,
      meta: { showHeader: true }
    },
    {
      path: '/myThunder',
      name: 'myThunder',
      component: MyThunderView,
    },
    {
      path: '/thunder',
      name: 'thunder',
      component: ThunderView,
          meta : {showHeader: true}
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta : {showHeader: false},
      children : [
        {
          path : 'signup',
          name : 'signup',
          component : Signup,
          meta : {showHeader: false}
        },
        {
          path : 'login',
          name : 'login',
          component : Login,
          meta : {showHeader: false}
        },
      ]
    },
  ]
})

export default router;
