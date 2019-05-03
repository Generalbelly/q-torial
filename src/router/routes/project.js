import ProjectsPage from '../../components/pages/ProjectsPage';
import ProjectPage from '../../components/pages/ProjectPage';

export default [
  {
    path: '/projects',
    name: 'projects.index',
    component: ProjectsPage,
    meta: { requireAuth: true },
  },
  {
    path: '/projects/create',
    name: 'projects.create',
    component: ProjectPage,
    meta: { requireAuth: true },
  },
  {
    path: '/projects/:id',
    name: 'projects.show',
    component: ProjectPage,
    props: true,
    meta: { requireAuth: true },
  },
];
