import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/discovery',

    children: [
      {
        path: '/discovery',
        name: 'Discovery',
        component: () => import('@/views/discovery/index.vue'),
        redirect: '/discovery/recommend',
        meta: { title: '发现音乐', isNav: true },

        children: [
          {
            path: '/discovery/recommend',
            name: 'Recommend',
            component: () => import('@/views/discovery/recommend/index.vue'),
            meta: { title: '个性推荐' }
          },
          {
            path: '/discovery/playlist',
            name: 'Playlist',
            component: () => import('@/views/discovery/playlist/index.vue'),
            meta: { title: '歌单' }
          }
        ]
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video/index.vue'),
        redirect: '/discovery/video',
        meta: { title: '视频' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
