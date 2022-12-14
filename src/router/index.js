import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import CategoryView from '../views/CategoryView.vue'
import DashboardView from '../views/DashboardView.vue'
import BranchView from '../views/BranchView.vue'
import StudentView from '../views/StudentView.vue'
import StudentsView from '../views/StudentsView.vue'
import BookView from '../views/BookView.vue'
import BookItemView from '../views/BookItemView.vue'
import LibraryView from '../views/LibraryView.vue'
import axios from 'axios'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryView
  },
  {
    path: '/branches',
    name: 'branches',
    component: BranchView
  },
  {
    path: '/students',
    name: 'students',
    component: StudentsView
  },
  {
    path: '/students/:id',
    name: 'view-student',
    component: StudentView
  },
  {
    path: '/books',
    name: 'books',
    component: BookView
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryView
  },
  {
    path: '/book-items',
    name: 'book-items',
    component: BookItemView
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
});

router.beforeEach((req, res, next) => {
  if (!localStorage.getItem("accessToken")) {
    if (req.path === '/login') {
      return next()
    }

    return next({ name: 'login' })
  }

  axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("accessToken");

  next()
})

export default router;
