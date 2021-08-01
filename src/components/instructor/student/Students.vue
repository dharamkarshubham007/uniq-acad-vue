<template>
  <div class="container">
    <div class="row justify-content-between mb-2">
      <h3 class="text-left text-info">Students</h3>
      <input
        type="button"
        class="form-input btn btn-info btn-md col-2 font-weight-bold"
        value="Back to Courses"
        @click="backToInstructorCourses"
      />
    </div>
    <div class="row">
      <Tabular :headers="tableHeader" :rows="students">
        <template v-slot:table-rows="{ rows }">
          <tr v-for="(row, index) in rows" :key="index">
            <td>
              {{ `${row.first_name} ${row.last_name}` }}
            </td>
          </tr>
        </template>
        <template v-slot:no-data>
          <tr>
            <td :colspan="Array.isArray(tableHeader) ? tableHeader.length : 1">
              No students
            </td>
          </tr>
        </template>
      </Tabular>
    </div>
  </div>
</template>

<script>
import Tabular from "../../utils/Tabular.vue";
import { computed, inject, onMounted, onUnmounted } from "@vue/runtime-core";
import { useActions, useState } from "../../../store/utils/store-functions";
import { useRouter } from "vue-router";
import { INSTRUCTOR_HOME_PATH } from "../../../router/route-constants";
import {
  FETCH_INSTRUCTOR_STUDENTS_ACTION,
  TOGGLE_SPINNER_ACTION,
  UNSET_INSTRUCTOR_STUDENTS_ACTION,
} from "../../../store/utils/store-constants";
export default {
  name: "Students",
  props: {
    courseId: {
      required: true,
      type: String,
    },
  },
  components: {
    Tabular,
  },
  setup(props) {
    const tableHeader = ["Name"];
    const router = useRouter();
    const toast = inject("toast");

    const {
      fetchInstructorStudentsAction,
      unsetInstructorStudentsAction,
      toggleSpinnerAction,
    } = useActions([
      FETCH_INSTRUCTOR_STUDENTS_ACTION,
      UNSET_INSTRUCTOR_STUDENTS_ACTION,
      TOGGLE_SPINNER_ACTION,
    ]);

    const students = computed(
      () => {
        const { instructor } = useState(["instructor"]);
        return instructor.value.instructor_students;
      },
      { immediate: true }
    );

    onMounted(async () => {
      try {
        toggleSpinnerAction();
        await fetchInstructorStudentsAction(props.courseId);
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    });

    function backToInstructorCourses() {
      router.push({ path: INSTRUCTOR_HOME_PATH });
    }

    onUnmounted(() => {
      unsetInstructorStudentsAction();
    });

    return {
      students,
      tableHeader,
      backToInstructorCourses,
    };
  },
};
</script>

<style scoped></style>
