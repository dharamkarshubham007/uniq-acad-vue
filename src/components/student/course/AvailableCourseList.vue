<template>
  <Tabular :headers="tableHeaders" :rows="courses" style="max-height: 300px">
    <template v-slot:table-rows="{ rows }">
      <tr
        class="cursor"
        v-for="(row, index) in rows"
        :key="row.course_id"
        @click="$emit('showAvailableCourseDetails', index)"
      >
        <td>
          {{ row.name }}
        </td>
        <td>
          {{ row.duration }}
        </td>
        <td>
          {{ row.instructor_name }}
        </td>
        <td>{{ row.number_of_students }}</td>
        <td>
          <button
            class="btn btn-md btn-info font-weight-bold"
            @click="enrollStudentForCourse($event, index)"
          >
            Enroll
          </button>
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <tr>
        <td :colspan="Array.isArray(tableHeaders) ? tableHeaders.length : 1">
          You have not enrolled for any courses
        </td>
      </tr>
    </template>
  </Tabular>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import Tabular from "../../utils/Tabular.vue";
export default {
  name: "AvailableCourseList",
  components: {
    Tabular,
  },
  props: {
    courses: {
      required: true,
      type: Array,
    },
    tableHeaders: {
      required: true,
      type: Array,
    },
  },
  setup() {
    const { emit } = getCurrentInstance();
    function enrollStudentForCourse(event, index) {
      event.stopPropagation();
      emit("enrollStudent", index);
    }

    return {
      enrollStudentForCourse,
    };
  },
  emits: ["showAvailableCourseDetails", "enrollStudent"],
};
</script>

<style scoped></style>
