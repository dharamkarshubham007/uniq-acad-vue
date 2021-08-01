import {
  INSTRUCTOR_HOME_PATH,
  REGISTER_PATH,
  ROOT_PATH,
  STUDENT_HOME_PATH,
} from "../router/route-constants";

export const userNavLinks = [
  {
    name: "Login",
    path: ROOT_PATH,
  },
  {
    name: "Register",
    path: REGISTER_PATH,
  },
];

export const studentNavlinks = [
  {
    name: "Home",
    path: STUDENT_HOME_PATH,
  },
];

export const instructorNavLinks = [
  {
    name: "Home",
    path: INSTRUCTOR_HOME_PATH,
  },
];
