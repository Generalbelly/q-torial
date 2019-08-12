import GasPage from '../../components/pages/GasPage';
import GaPage from '../../components/pages/GaPage';

export default [
  {
    path: '/google-analytics',
    name: 'gas.index',
    exact: true,
    component: GasPage,
    meta: { requireAuth: true },
    children: [
      {
        path: ':id',
        name: 'gas.show',
        component: GaPage,
        props: true,
        meta: { requireAuth: true },
      },
    ],
  },
];
