import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('../layouts/BasicLayout')),
    children: [
      {
        path: '/',
        Component: lazy(() => import('../pages/home')),
      },
      {
        path: '/home',
        Component: lazy(() => import('../pages/home')),
      },
      // {
      //   path: '/gecko',
      //   Component: lazy(() => import('../pages/gecko')),
      // },
      // {
      //   path: '/',
      //   Component: lazy(() => import('../pages/launchpad')),
      // },
      // {
      //   path: '/dashboard',
      //   Component: lazy(() => import('../pages/dashboard')),
      // },
      // {
      //   path: '/create_token',
      //   Component: lazy(() => import('../pages/create')),
      // },
      // {
      //   path: '/airdrop/:ticker',
      //   Component: lazy(() => import('../pages/airdrop')),
      // },
      // {
      //   path: '/share',
      //   Component: lazy(() => import('../pages/share')),
      // },
      {
        path: '*',
        Component: lazy(() => import('../pages/not-found')),
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/not-found')),
  },
];

export default routeConfig;
