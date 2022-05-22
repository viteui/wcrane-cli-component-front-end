import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: "@/pages/index"
        },
        {
          path: '/detail',
          component: "@/pages/detail"
        }
      ]
    },
  ],
  mfsu: {},
  fastRefresh: {},
});
