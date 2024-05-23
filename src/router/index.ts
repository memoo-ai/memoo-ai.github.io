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
        path: '/gecko',
        Component: lazy(() => import('../pages/gecko')),
      },
      {
        path: '/launchpad',
        Component: lazy(() => import('../pages/launchpad')),
      },
      {
        path: '/dashboard',
        Component: lazy(() => import('../pages/dashboard')),
      },
      {
        path: '/create',
        Component: lazy(() => import('../pages/create')),
      },
      {
        path: '/airdrop/hunt',
        Component: lazy(() => import('../pages/create/airdrop')),
      },
      {
        path: '/imo',
        Component: lazy(() => import('../pages/create/imo')),
      },
      {
        path: '/tokenProfile',
        Component: lazy(() => import('../pages/tokenProfile')),
      },
    ],
  },
  {
    path: '*',
    Component: lazy(() => import('../pages/not-found')),
  },
];

export default routeConfig;
