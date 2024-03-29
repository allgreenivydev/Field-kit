import Tasks from './components/Tasks.vue';
import TasksAll from './components/TasksAll.vue';
import TasksEdit from './components/TasksEdit.vue';
import TasksMap from './components/TasksMap.vue';

const routes = [
  {
    path: '/tasks',
    component: Tasks,
    children: [
      {
        path: '',
        name: 'tasks-all',
        component: TasksAll,
      },
      {
        path: 'edit',
        name: 'tasks-edit',
        component: TasksEdit,
        props: true,
      },
      {
        path: 'map',
        name: 'tasks-map',
        component: TasksMap,
        props: true,
      },
    ],
  },
];

export default routes;
