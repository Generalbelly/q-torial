import TutorialsPage from '../../components/pages/TutorialsPage';
import TutorialPage from '../../components/pages/TutorialPage';
import TutorialPerformancePage
  from '../../components/pages/TutorialPerformancePage/TutorialPerformancePage';

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
  {
    path: '/tutorials/:id/performance',
    name: 'tutorials.performance',
    component: TutorialPerformancePage,
    props: true,
    meta: { requireAuth: true },
  },
];
