<template>
  <Modal :title="course && course.name" @close="$emit('close')">
    <template v-slot:modal-body>
      <template v-if="course">
        <p>
          Name:
          <span>
            {{ course.name }}
          </span>
        </p>
        <p>
          Prerequisites:
          <span>
            {{ course.prerequisites }}
          </span>
        </p>
        <p>
          Duration: <span> {{ course.duration }} months</span>
        </p>
        <p>
          Course Type:
          <span class="course-type-text">
            {{ course.course_type }}
          </span>
        </p>
        <p>
          Number of Students:
          <span>
            {{ course.number_of_students }}
          </span>
        </p>
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
  name: "Course Details",
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
