import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'
import Page_404 from '@/views/error/page_404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/discovery',

    children: [
      {
        path: '/discovery',
        name: 'Discovery',
        component: () => import('@/views/discovery/index.vue'),
        redirect: '/discovery/recommend',
        meta: { title: '发现音乐', isNav: true, icon: 'music', keepAlive: true },

        children: [
          {
            path: '/discovery/recommend',
            name: 'Recommend',
            component: () => import('@/views/discovery/recommend/index.vue'),
            meta: { title: '个性推荐', keepAlive: true }
          },
          {
            path: '/discovery/playlists',
            name: 'Playlists',
            component: () => import('@/views/discovery/playlists/index.vue'),
            meta: { title: '歌单', keepAlive: false }
          }
        ]
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/index.vue'),
        meta: { title: '视频', isNav: true, icon: 'video', keepAlive: false }
      },
      {
        path: '/playlist',
        name: 'Playlist',
        component: () => import('@/views/playlist/index.vue'),
        meta: { keepAlive: false }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/index.vue'),
        meta: { keepAlive: false }
      },
      {
        path: '/:pathMatch(.*)',
        name: 'Error',
        component: Page_404
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
