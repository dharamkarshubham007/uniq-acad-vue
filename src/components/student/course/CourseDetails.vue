<template>
  <Modal :title="course && course.name" @close="$emit('close')">
    <template v-slot:modal-body>
      <template v-if="course">
        <p>Name: {{ course.name }}</p>
        <p>Prerequisites: {{ course.prerequisites }}</p>
        <p>Duration: {{ course.duration }} months</p>
        <p>Course Type: {{ course.course_type }}</p>
        <p>Instructor: {{ course.instructor_name }}</p>
      </template>
    </template>
    <template v-slot:modal-footer>
      <button
        type="button"
        class="btn btn-default text-info"
        data-dismiss="modal"
        @click="$emit('close')"
      >
        Close
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "../../utils/Modal.vue";
export default {
  name: "CourseDetails",
  components: {
    Modal,
  },
  props: {
    course: {
      required: true,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
