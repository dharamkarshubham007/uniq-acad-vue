import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import { auth } from "../firebase";
import { Role } from "../utils/roles";
import {
  STUDENT_HOME_PATH,
  STUDENT_HOME_PATH_NAME,
  LOGIN_PATH,
  REGISTER_PATH,
  REGISTER_PATH_NAME,
  ROOT_PATH,
  ROOT_PATH_NAME,
  NOT_MATCHING_PATH,
  INSTRUCTOR_HOME_PATH,
  INSTRUCTOR_HOME_PATH_NAME,
  INSTRUCTOR_STUDENTS_PATH,
  INSTRUCTOR_STUDENTS_PATH_NAME,
} from "./route-constants";

const routes = [
  {
    path: ROOT_PATH,
    name: ROOT_PATH_NAME,
    component: Login,
  },
  {
    path: REGISTER_PATH,
    name: REGISTER_PATH_NAME,
    component: Register,
  },
  {
    path: STUDENT_HOME_PATH,
    name: STUDENT_HOME_PATH_NAME,
    // component: () => StudentHome,
    component: () =>
      import(
        /* webpackChunkName: "student-home" */ "../components/student/Home.vue"
      ),
    exact: true,

    meta: { requiresAuth: true, authorize: [Role.STUDENT] },
  },
  {
    path: INSTRUCTOR_HOME_PATH,
    name: INSTRUCTOR_HOME_PATH_NAME,
    component: () =>
      import(
        /* webpackChunkName: "instructor-home" */
        "../components/instructor/Home.vue"
      ),
    meta: { requiresAuth: true, authorize: [Role.INSTRUCTOR] },
  },
  {
    path: INSTRUCTOR_STUDENTS_PATH,
    name: INSTRUCTOR_STUDENTS_PATH_NAME,
    component: () =>
      import(
        /* webpackChunkName: "instructor-students" */
        "../components/instructor/student/Students.vue"
      ),
    props: true,
    meta: { requiresAuth: true, authorize: [Role.INSTRUCTOR] },
  },
  {
    path: LOGIN_PATH,
    redirect: ROOT_PATH,
  },
  // otherwise redirect to root
  { path: NOT_MATCHING_PATH, redirect: ROOT_PATH },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authorize = to.meta.authorize;
  const authenticatedUser = auth.currentUser;
  const user = JSON.parse(localStorage.getItem("user"));
  if (requiresAuth && !authenticatedUser) {
    next(ROOT_PATH);
  } else if (!requiresAuth && authenticatedUser) {
    const userRole = user.role;
    if (userRole == Role.INSTRUCTOR) {
      next(INSTRUCTOR_HOME_PATH);
    } else if (userRole == Role.STUDENT) {
      next(STUDENT_HOME_PATH);
    }
  } else if (requiresAuth && authenticatedUser) {
    const userRole = user.role;
    if (
      authorize.length &&
      !authorize.includes(userRole) &&
      userRole == Role.INSTRUCTOR
    ) {
      next(INSTRUCTOR_HOME_PATH);
    } else if (
      authorize.length &&
      !authorize.includes(userRole) &&
      userRole == Role.STUDENT
    ) {
      next(STUDENT_HOME_PATH);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
