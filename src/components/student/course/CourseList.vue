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
        <td>{{ row.course_status }}</td>
      </tr>
    </template>
    <template v-slot:no-data>
      <tr>
        <td :colspan="tableHeaders.length ? tableHeaders.length : 1">
          You have not enrolled for any courses
        </td>
      </tr>
    </template>
  </Tabular>
</template>

<script>
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
  emits: ["showCourseDetails"],
};
</script>

<style scoped></style>
