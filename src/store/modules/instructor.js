import {
  auth,
  courseCollection,
  instructorCourseCollection,
  studentCourseCollection,
  userCollection,
} from "../../firebase";

import {
  ADD_INSTRUCTOR_COURSE,
  REMOVE_INSTRUCTOR_STUDENTS,
  SET_INSTRUCTOR_COURSES,
  SET_INSTRUCTOR_STUDENTS,
  FETCH_INSTRUCTOR_STUDENTS_ACTION,
  CREATE_INSTRUCTOR_COURSE_ACTION,
  FETCH_INSTRUCTOR_COURSES_ACTION,
  UNSET_INSTRUCTOR_STUDENTS_ACTION,
} from "../utils/store-constants";

const getters = {
  instructorCourses: (state) => state.instructor_courses,
};

const actions = {
  async [FETCH_INSTRUCTOR_STUDENTS_ACTION]({ commit }, courseId) {
    let students = [];
    const { docs: studentDocs } = await studentCourseCollection
      .where("course_id", "==", courseId)
      .get();

    if (Array.isArray(studentDocs) && studentDocs.length) {
      const studentUserIds = studentDocs.map(
        (doc) => doc.data().student_user_id
      );

      const { docs: userDocs } = await userCollection
        .where("__name__", "in", studentUserIds)
        .get();

      if (Array.isArray(userDocs) && userDocs.length) {
        students = userDocs.map((doc) => {
          return { user_id: doc.id, ...doc.data() };
        });
      }
    }
    commit(SET_INSTRUCTOR_STUDENTS, { students });
  },
  [UNSET_INSTRUCTOR_STUDENTS_ACTION]({ commit }) {
    commit(REMOVE_INSTRUCTOR_STUDENTS);
  },
  async [CREATE_INSTRUCTOR_COURSE_ACTION]({ commit, rootState }, course) {
    let courseInfo = {
      ...course,
      instructor_name: `${rootState.user.user.first_name} ${rootState.user.user.last_name}`,
    };
    const { id } = await courseCollection.add(courseInfo);
    await instructorCourseCollection.add({
      course_id: id,
      instructor_user_id: auth.currentUser.uid,
      number_of_students: 0,
    });

    courseInfo = { ...courseInfo, course_id: id };
    commit(ADD_INSTRUCTOR_COURSE, {
      courses: [courseInfo],
    });
  },
  async [FETCH_INSTRUCTOR_COURSES_ACTION]({ commit, courses = [] }) {
    const { docs } = await instructorCourseCollection
      .where("instructor_user_id", "==", auth.currentUser.uid)
      .get();

    if (Array.isArray(docs) && docs.length) {
      const courseIds = docs.map((doc) => {
        return doc.data().course_id;
      });

      const instructorCoursesPromises = courseIds.map(async (id) => {
        const doc = await courseCollection.doc(id).get();
        if (doc) return { course_id: id, ...doc.data() };
      });

      const instructorCourses = await Promise.all(instructorCoursesPromises);
      courses = instructorCourses.filter((course) => {
        if (course) return true;
      });
    }
    commit(SET_INSTRUCTOR_COURSES, { courses });
  },
};

const mutations = {
  [SET_INSTRUCTOR_COURSES](state, payload) {
    state.instructor_courses = [...payload.courses];
  },
  [ADD_INSTRUCTOR_COURSE](state, payload) {
    state.instructor_courses = [
      ...state.instructor_courses,
      ...payload.courses,
    ];
  },
  [SET_INSTRUCTOR_STUDENTS](state, payload) {
    state.instructor_students = [...payload.students];
  },
  [REMOVE_INSTRUCTOR_STUDENTS](state) {
    state.instructor_students = [];
  },
};

const instructor = {
  state() {
    return {
      instructor_courses: [],
      students: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default instructor;
