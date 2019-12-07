import IndexPage from '../../components/pages/IndexPage';

const files = require.context('.', false, /\.js$/);

const routes = [
  {
    name: 'index',
    path: '/',
    component: IndexPage,
  },
];

files.keys().forEach((key) => {
  if (key === './index.js') return;
  files(key).default.forEach((route) => {
    routes.push(route);
  });
});

export default routes;
