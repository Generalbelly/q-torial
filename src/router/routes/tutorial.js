import TutorialsPage from '../../components/pages/TutorialsPage';
import TutorialPage from '../../components/pages/TutorialPage';

export default [
  {
    path: '/tutorials',
    name: 'tutorials.index',
    component: TutorialsPage,
    props: true,
    meta: { requireAuth: true },
  },
  {
    path: '/tutorials/:id',
    name: 'tutorials.show',
    component: TutorialPage,
    props: true,
    meta: { requireAuth: true },
  },
];
