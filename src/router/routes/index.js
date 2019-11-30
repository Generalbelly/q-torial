const files = require.context('.', false, /\.js$/);

const routes = [
  // {
  //   name: 'service-page',
  //   path: '/',
  //   // redirect: () => {
  //   //   window.location.href = 'https://www.agito-inc.com';
  //   //   return;
  //   // },
  // },
  // { path: '*', redirect: '/' },
];

files.keys().forEach((key) => {
  if (key === './index.js') return;
  files(key).default.forEach((route) => {
    routes.push(route);
  });
});

export default routes;
