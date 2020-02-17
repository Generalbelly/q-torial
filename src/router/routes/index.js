import IndexPage from '../../components/pages/IndexPage';
import PageNotFoundPage from '../../components/pages/PageNotFoundPage/PageNotFoundPage';

const files = require.context('.', false, /\.js$/);

const routes = [
  {
    name: 'index',
    path: '/',
    component: IndexPage,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: PageNotFoundPage,
  },
];

files.keys().forEach((key) => {
  if (key === './index.js') return;
  files(key).default.forEach((route) => {
    routes.push(route);
  });
});

export default routes;
