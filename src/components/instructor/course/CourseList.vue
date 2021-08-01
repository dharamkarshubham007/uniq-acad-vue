<template>
  <Tabular :headers="tableHeaders" :rows="courses" style="max-height: 300px">
    <template v-slot:table-rows="{ rows }">
      <tr
        class="cursor"
        v-for="(row, index) in rows"
        :key="index"
        @click="$emit('showCourseDetails', index)"
      >
        <td>
          {{ row.name }}
        </td>
        <td>{{ row.number_of_students }}</td>
        <td>
          <button
            class="btn btn-md btn-info font-weight-bold"
            @click="viewStudents($event, index)"
          >
            View Students
          </button>
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <tr>
        <td :colspan="Array.isArray(tableHeaders) ? tableHeaders.length : 1">
          No courses
        </td>
      </tr>
    </template>
  </Tabular>
</template>

<script>
import { getCurrentInstance } from "@vue/runtime-core";
import Tabular from "../../utils/Tabular.vue";
export default {
  name: "CourseList",
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
    function viewStudents(event, index) {
      event.stopPropagation();
      emit("showStudents", index);
    }

    return {
      viewStudents,
    };
  },
  emits: ["showCourseDetails", "showStudents"],
};
</script>

<style scoped></style>
