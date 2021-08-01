<template>
  <div class="container">
    <div class="row justify-content-between mb-2">
      <h3 class="text-left text-info">Enrolled Courses</h3>
      <input
        type="button"
        class="form-input btn btn-info btn-md col-2 font-weight-bold"
        value="Enroll For Course"
        @click="showCourseEnrollmentView"
      />
    </div>
    <div class="row">
      <CourseList
        :tableHeaders="tableHeaders"
        :courses="courses"
        @showCourseDetails="viewEnrolledCourseDetails"
      />
    </div>
    <div class="row justify-content-between mb-2 mt-3" v-if="enrollForCourse">
      <h3 class="text-left text-info">Available Courses</h3>
      <input
        type="button"
        class="form-input btn btn-info btn-md col-2 font-weight-bold"
        value="Close Section"
        @click="enrollForCourse = !enrollForCourse"
      />
    </div>
    <div class="row mb-5" v-if="enrollForCourse">
      <AvailableCourseList
        :tableHeaders="courseEnrollmentTableHeader"
        :courses="coursesForEnrollment"
        @showAvailableCourseDetails="viewAvailableCourseDetails"
        @enrollStudent="enrollStudentForCourse"
      />
    </div>
  </div>
  <template v-if="showModal">
    <CourseDetails :course="selectedCourse" @close="closeModal" />
  </template>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, inject, onMounted } from "@vue/runtime-core";
import { useActions, useState } from "../../store/utils/store-functions";
import {
  GET_AVAILABLE_COURSES_ACTION,
  GET_STUDENT_COURSES_ACTION,
  GET_STUDENT_ENROLLED_FOR_COURSE_ACTION,
  TOGGLE_SPINNER_ACTION,
} from "../../store/utils/store-constants";
import CourseDetails from "./course/CourseDetails.vue";
import CourseList from "./course/CourseList.vue";
import AvailableCourseList from "./course/AvailableCourseList.vue";
export default {
  name: "Home",
  components: {
    CourseDetails,
    CourseList,
    AvailableCourseList,
  },
  setup() {
    const enrollForCourse = ref(false);
    const showModal = ref(false);
    const selectedCourse = ref({});
    const tableHeaders = ["Course", "Status"];
    const courseEnrollmentTableHeader = [
      "Course",
      "Duration",
      "Instructor Name",
      "No of students enrolled",
      "Action",
    ];
    const {
      toggleSpinnerAction,
      getStudentCoursesAction,
      getAvailableCoursesAction,
      getStudentEnrolledForCourseAction,
    } = useActions([
      TOGGLE_SPINNER_ACTION,
      GET_STUDENT_COURSES_ACTION,
      GET_AVAILABLE_COURSES_ACTION,
      GET_STUDENT_ENROLLED_FOR_COURSE_ACTION,
    ]);

    const toast = inject("toast");

    const coursesForEnrollment = computed(
      () => {
        const { student } = useState(["student"]);
        return student.value.courses_for_student_enrollment;
      },
      { immediate: true }
    );

    const courses = computed(
      () => {
        const { student } = useState(["student"]);
        return student.value.student_courses;
      },
      { immediate: true }
    );

    onMounted(async () => {
      try {
        toggleSpinnerAction();
        await getStudentCoursesAction();
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    });

    async function showCourseEnrollmentView() {
      if (!enrollForCourse.value) {
        try {
          toggleSpinnerAction();
          await getAvailableCoursesAction();
        } catch (e) {
          toast.error(e.message);
        } finally {
          toggleSpinnerAction();
        }
        enrollForCourse.value = true;
      }
    }

    function viewAvailableCourseDetails(index) {
      selectedCourse.value = coursesForEnrollment.value[index];
      showModal.value = true;
    }

    function viewEnrolledCourseDetails(index) {
      selectedCourse.value = courses.value[index];
      showModal.value = true;
    }

    function closeModal() {
      selectedCourse.value = {};
      showModal.value = false;
    }

    async function enrollStudentForCourse(index) {
      try {
        toggleSpinnerAction();
        const course = coursesForEnrollment.value[index];
        await getStudentEnrolledForCourseAction({ course, index });
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    }

    return {
      enrollForCourse,
      showModal,
      selectedCourse,
      tableHeaders,
      coursesForEnrollment,
      courses,
      showCourseEnrollmentView,
      courseEnrollmentTableHeader,
      viewAvailableCourseDetails,
      closeModal,
      enrollStudentForCourse,
      viewEnrolledCourseDetails,
    };
  },
};
</script>

<style lang="css" scoped></style>
