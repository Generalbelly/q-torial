import IndexPage from '../../components/pages/IndexPage';
import PageNotFoundPage from '../../components/pages/PageNotFoundPage';
import NotationPage from '../../components/pages/NotationPage';
import PrivacyPolicyPage from '../../components/pages/PrivacyPolicyPage/PrivacyPolicyPage';
import TermsOfServicePage from '../../components/pages/TermsOfServicePage/TermsOfServicePage';

const files = require.context('.', false, /\.js$/);

const routes = [
  {
    name: 'index',
    path: '/',
    component: IndexPage,
  },
  {
    name: 'notation',
    path: '/notation',
    component: NotationPage,
  },
  {
    name: 'privacy-policy',
    path: '/privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    name: 'terms-of-service',
    path: '/terms-of-service',
    component: TermsOfServicePage,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: PageNotFoundPage,
  },
];

files.keys().forEach(key => {
  if (key === './index.js') return;
  files(key).default.forEach(route => {
    routes.push(route);
  });
});

export default routes;
