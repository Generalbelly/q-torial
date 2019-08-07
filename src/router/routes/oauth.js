import OauthsPage from '../../components/pages/OauthsPage';
import OauthPage from '../../components/pages/OauthPage';

export default [
  {
    path: '/oauths',
    name: 'oauths.index',
    component: OauthsPage,
    meta: { requireAuth: true },
  },
];
