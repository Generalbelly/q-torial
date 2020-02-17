import ThanksPage from '../../components/pages/ThanksPage';
import UpgradePage from '../../components/pages/UpgradePage';
import TutorialsPage from '../../components/pages/TutorialsPage';
import TutorialPage from '../../components/pages/TutorialPage';
import TutorialPerformancePage from '../../components/pages/TutorialPerformancePage';

export default [
  {
    path: '/tutorials',
    name: 'tutorials.index',
    component: TutorialsPage,
    props: true,
    meta: {
      requireAuth: true,
      requireFirebase: true,
    },
    children: [
      {
        path: 'upgrade',
        component: UpgradePage,
      },
      {
        path: 'thanks',
        component: ThanksPage,
      },
    ],
  },
  {
    path: '/tutorials/:id',
    name: 'tutorials.show',
    component: TutorialPage,
    props: true,
    meta: {
      requireAuth: true,
      requireFirebase: true,
    },
  },
  {
    path: '/tutorials/:id/performance',
    name: 'tutorials.performance',
    component: TutorialPerformancePage,
    props: true,
    meta: {
      requireAuth: true,
      requireFirebase: true,
    },
  },
];
