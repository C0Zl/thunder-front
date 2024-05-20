import { createRouter, createWebHistory } from 'vue-router';

import AlbumView from '@/views/AlbumView.vue';
import BoardView from '@/views/BoardView.vue';
import FriendView from '@/views/FriendView.vue';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import MyThunderView from '@/views/MyThunderView.vue';
import ThunderView from '@/views/ThunderView.vue';
import UserView from '@/views/UserView.vue';

import Map from '@/components/home/Map.vue'
import List from '@/components/home/List.vue'
import Signup from '@/components/user/Signup.vue';
import Login from '@/components/user/Login.vue';
import ThunderCreate from '@/components/thunder/ThunderCreate.vue';
import RemainMyThunder from '@/components/mythunder/RemainMyThunder.vue';
import PastMyThunder from '@/components/mythunder/PastMyThunder.vue';
import ThunderDetail from '@/components/thunder/ThunderDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { showHeader: true },
      children: [
        {
          path: '',
          name: 'map',
          component: Map,
        },
        {
          path: 'list',
          name: 'list',
          component: List,
        }
      ]
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
      redirect: { name: 'remain' }, // 기본 경로 설정
      children: [
        {
          path: 'remain',
          name: 'remain',
          component: RemainMyThunder
        },
        {
          path: 'past',
          name: 'past',
          component: PastMyThunder
        }
      ]
    },
    {
      path: '/thunder',
      name: 'thunder',
      component: ThunderView,
      meta : {showHeader: true},
      children : [
        {
          path: 'create',
          name: 'thunderCreate',
          component: ThunderCreate,
        },
        {
          path: '{thunderId}',
          name: 'thunderDetail',
          component: ThunderDetail
        },
      ]
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
