const files = require.context('.', false, /\.js$/);

const routes = [
  {
    name: 'landing-page',
    path: '/',
    redirect: '/sign-in',
  },
  // { path: '*', redirect: '/' },
];

files.keys().forEach((key) => {
  if (key === './index.js') return;
  files(key).default.forEach((route) => {
    routes.push(route);
  });
});

export default routes;
