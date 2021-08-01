<template>
  <div class="col-md-6">
    <h3 class="text-center text-info display-6 mb-5">Create Course</h3>
    <form @submit="createCourse" class="form">
      <div class="form-group">
        <input
          type="text"
          name="name"
          class="form-control"
          placeholder="Course Name"
          required="true"
          v-model="name"
        />
        <div v-if="errors['name']" class="invalid">
          {{ errors["name"] }}
        </div>
      </div>
      <div class="form-group">
        <textarea
          class="form-control"
          name="prerequisites"
          rows="3"
          placeholder="Prerequisites"
          required="true"
          v-model="prerequisites"
        ></textarea>
        <div v-if="errors['prerequisites']" class="invalid">
          {{ errors["prerequisites"] }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="number"
          name="duration"
          class="form-control"
          placeholder="Duration in Months"
          required="true"
          v-model="duration"
        />
        <div v-if="errors['duration']" class="invalid">
          {{ errors["duration"] }}
        </div>
      </div>
      <div class="input-group mb-5">
        <div class="input-group-prepend">
          <label class="input-group-text" for="course_type">Course Type</label>
        </div>
        <select class="custom-select" id="course_type" v-model="course_type">
          <option disabled value="">Choose...</option>
          <option value="ui">UI</option>
          <option value="ux">UX</option>
          <option value="backend">Backend</option>
          <option value="other">Other</option>
        </select>
        <div v-if="errors['course_type']" class="invalid">
          {{ errors["course_type"] }}
        </div>
      </div>

      <div class="form-group d-flex justify-content-around">
        <input
          type="button"
          class="btn btn-danger btn-md col-3 font-weight-bold"
          value="Cancel"
          @click="$emit('hideCreateCourseView')"
        />
        <input
          type="submit"
          class="btn btn-info btn-md col-3 font-weight-bold"
          value="Create"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useActions } from "../../../store/utils/store-functions";
import {
  CREATE_INSTRUCTOR_COURSE_ACTION,
  TOGGLE_SPINNER_ACTION,
} from "../../../store/utils/store-constants";
import { getCurrentInstance, inject } from "@vue/runtime-core";
import {
  validateCourseName,
  validateCourseDuration,
  validateCoursePrerequisites,
  validateCourseType,
} from "../../../utils/validations";
import { COURSE_CREATED_SUCCESS } from "../../../utils/app-constants";

export default {
  name: "Create",
  setup() {
    const { emit } = getCurrentInstance();
    const COURSE_NAME = "name";
    const DURATION = "duration";
    const PREREQUISITES = "prerequisites";
    const COURSE_TYPE = "course_type";
    const courseState = reactive({
      name: "",
      prerequisites: "",
      duration: "",
      course_type: "",
      errors: [],
    });
    const toast = inject("toast");
    const { toggleSpinnerAction, createInstructorCourseAction } = useActions([
      TOGGLE_SPINNER_ACTION,
      CREATE_INSTRUCTOR_COURSE_ACTION,
    ]);

    async function createCourse(e) {
      e.preventDefault();
      const isFormValid = validateFormFields();
      if (!isFormValid) return false;
      try {
        toggleSpinnerAction();
        const { name, prerequisites, duration, course_type } = courseState;
        await createInstructorCourseAction({
          name,
          prerequisites,
          duration,
          course_type,
          number_of_students: 0,
        });
        toast.success(COURSE_CREATED_SUCCESS);
        emit("hideCreateCourseView");
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    }

    function validateFormFields() {
      let isValid = true;
      isValid &= validateCourseName(courseState, courseState.name, COURSE_NAME);
      isValid &= validateCourseDuration(
        courseState,
        courseState.duration,
        DURATION
      );
      isValid &= validateCoursePrerequisites(
        courseState,
        courseState.duration,
        PREREQUISITES
      );
      isValid &= validateCourseType(
        courseState,
        courseState.course_type,
        COURSE_TYPE
      );

      return isValid;
    }

    return {
      ...toRefs(courseState),
      createCourse,
    };
  },
  emits: ["hideCreateCourseView"],
};
</script>

<style scoped></style>
