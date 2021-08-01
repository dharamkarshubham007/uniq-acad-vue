<template>
  <div class="container">
    <div class="row justify-content-between mb-2">
      <h3 class="text-left text-info">List of Courses</h3>
      <input
        type="button"
        class="form-input btn btn-info btn-md col-2 font-weight-bold"
        value="Create"
        @click="showCreateCourseView"
      />
    </div>
    <div class="row">
      <CourseList
        :tableHeaders="tableHeaders"
        :courses="courses"
        @showCourseDetails="showRow"
        @showStudents="viewStudents"
      />
    </div>
    <div class="row justify-content-center mt-3 mb-5" v-if="createCourse">
      <Create @hideCreateCourseView="hideCreateCourseView" />
    </div>
  </div>
  <template v-if="showModal">
    <CourseDetails :course="selectedCourse" @close="closeModal" />
  </template>
</template>

<script>
import { ref } from "@vue/reactivity";
import CourseList from "./course/CourseList.vue";
import Create from "./course/Create.vue";
import { computed, inject, onMounted } from "@vue/runtime-core";
import { useActions, useState } from "../../store/utils/store-functions";
import {
  FETCH_INSTRUCTOR_COURSES_ACTION,
  TOGGLE_SPINNER_ACTION,
} from "../../store/utils/store-constants";
import CourseDetails from "./course/CourseDetails.vue";
import { useRouter } from "vue-router";
import { INSTRUCTOR_STUDENTS_PATH_NAME } from "../../router/route-constants";

export default {
  name: "Home",
  components: {
    Create,
    CourseList,
    CourseDetails,
  },
  setup() {
    const router = useRouter();
    const createCourse = ref(false);
    const showModal = ref(false);
    const selectedCourse = ref({});
    const tableHeaders = ["Name", "Number of Students", "Action"];
    const { fetchInstructorCoursesAction, toggleSpinnerAction } = useActions([
      FETCH_INSTRUCTOR_COURSES_ACTION,
      TOGGLE_SPINNER_ACTION,
    ]);
    const toast = inject("toast");

    const courses = computed(
      () => {
        const { instructor } = useState(["instructor"]);
        return instructor.value.instructor_courses;
      },
      { immediate: true }
    );

    onMounted(async () => {
      try {
        toggleSpinnerAction();
        await fetchInstructorCoursesAction();
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    });

    function showCreateCourseView() {
      createCourse.value = true;
    }

    function hideCreateCourseView() {
      createCourse.value = false;
    }

    function showRow(index) {
      showModal.value = true;
      selectedCourse.value = courses.value[index];
    }

    function closeModal() {
      showModal.value = false;
      selectedCourse.value = {};
    }

    function viewStudents(index) {
      const course = courses.value[index];
      router.push({
        name: INSTRUCTOR_STUDENTS_PATH_NAME,
        params: {
          courseId: course.course_id,
        },
      });
    }

    return {
      courses,
      createCourse,
      showCreateCourseView,
      hideCreateCourseView,
      tableHeaders,
      showModal,
      showRow,
      selectedCourse,
      closeModal,
      viewStudents,
    };
  },
};
</script>

<style scoped>
.course-type-text {
  text-transform: uppercase;
}
</style>
