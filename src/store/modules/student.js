import moment from "moment";
import {
  auth,
  courseCollection,
  instructorCourseCollection,
  studentCourseCollection,
} from "../../firebase";

import {
  ADD_STUDENT_COURSE,
  GET_AVAILABLE_COURSES_ACTION,
  GET_STUDENT_COURSES_ACTION,
  GET_STUDENT_ENROLLED_FOR_COURSE_ACTION,
  SET_COURSES_FOR_STUDENT_ENROLLMENT,
  SET_STUDENT_COURSES,
} from "../utils/store-constants";

const getters = {
  studentCourses: (state) => state.student_courses,
  coursesForStudentEnrollment: (state) => state.courses_for_student_enrollment,
};

const actions = {
  async [GET_STUDENT_ENROLLED_FOR_COURSE_ACTION]({ commit }, courseInfo) {
    const {
      course: { course_id },
    } = courseInfo;

    const courseDoc = await courseCollection.doc(course_id).get();
    if (courseDoc) {
      await courseCollection.doc(course_id).update({
        number_of_students: courseDoc.data().number_of_students + 1,
      });
    }

    const instructorDocs = await instructorCourseCollection
      .where("course_id", "==", course_id)
      .get();

    instructorDocs.docs.forEach(async (doc) => {
      if (doc) {
        await instructorCourseCollection.doc(doc.id).update({
          number_of_students: doc.data().number_of_students + 1,
        });
      }
    });

    const { course } = courseInfo;
    const studentCourseInfo = {
      course_id: course.course_id,
      course_name: course.name,
      student_user_id: auth.currentUser.uid,
      start_time: Date.now(),
    };

    await studentCourseCollection.add({
      ...studentCourseInfo,
    });

    commit(ADD_STUDENT_COURSE, {
      course: {
        ...studentCourseInfo,
        ...courseDoc.data(),
        course_status: "In Progress",
      },
      index: courseInfo.index,
    });
  },
  async [GET_AVAILABLE_COURSES_ACTION]({ commit }, courses = []) {
    const { docs: studentCourseDocs } = await studentCourseCollection
      .where("student_user_id", "==", auth.currentUser.uid)
      .get();

    if (Array.isArray(studentCourseDocs) && studentCourseDocs.length) {
      const studentCourseIds = studentCourseDocs.map((doc) => {
        return doc.data().course_id;
      });

      const { docs: courseDocs } = await courseCollection
        .where("__name__", "not-in", studentCourseIds)
        .get();

      if (Array.isArray(courseDocs) && courseDocs.length) {
        courses = courseDocs.map((doc) => {
          return { course_id: doc.id, ...doc.data() };
        });
      }
    } else {
      const { docs: courseDocs } = await courseCollection.get();
      if (Array.isArray(courseDocs) && courseDocs.length) {
        courses = courseDocs.map((doc) => {
          return { course_id: doc.id, ...doc.data() };
        });
      }
    }

    commit(SET_COURSES_FOR_STUDENT_ENROLLMENT, { courses });
  },
  async [GET_STUDENT_COURSES_ACTION]({ commit }) {
    const { docs } = await studentCourseCollection
      .where("student_user_id", "==", auth.currentUser.uid)
      .get();

    const studentEnrolledCourses = new Map();
    if (Array.isArray(docs) && docs.length) {
      const courseIds = docs.map((doc) => {
        studentEnrolledCourses.set(doc.data().course_id, { ...doc.data() });
        return doc.data().course_id;
      });

      const courseCollectionPromises = courseIds.map(async (id) => {
        const doc = await courseCollection.doc(id).get();
        if (doc) return { course_id: doc.id, ...doc.data() };
      });

      const courses = await Promise.all(courseCollectionPromises);
      const enrolledCourses = courses.map((course) => {
        const enrolledCourse = studentEnrolledCourses.get(course.course_id);
        const couseStartTime = moment(enrolledCourse.start_time);
        const currentTime = moment(Date.now());
        const days = currentTime.diff(couseStartTime, "days");
        const courseStatus = days > 15 ? "Completed" : "In Progress";
        return {
          course_status: courseStatus,
          ...enrolledCourse,
          ...course,
        };
      });

      commit(SET_STUDENT_COURSES, { courses: enrolledCourses });
    }
  },
};

const mutations = {
  [SET_STUDENT_COURSES](state, payload) {
    state.student_courses = [...payload.courses];
  },
  [SET_COURSES_FOR_STUDENT_ENROLLMENT](state, payload) {
    state.courses_for_student_enrollment = [...payload.courses];
  },
  [ADD_STUDENT_COURSE](state, payload) {
    state.student_courses = [...state.student_courses, payload.course];
    state.courses_for_student_enrollment.splice(payload.index, 1);
  },
};

const student = {
  state() {
    return {
      student_courses: [],
      courses_for_student_enrollment: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default student;
