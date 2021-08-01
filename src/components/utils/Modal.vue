<template>
  <teleport to="#modal">
    <div>
      <div
        class="modal fade show"
        id="modal_ui"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal_ui"
        aria-hidden="true"
        style="display:block !important"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal_ui_title">{{ title }}</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="$emit('close')"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="modal-body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="modal-footer"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
    >
  </teleport>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      required: true,
      type: String,
      default: "Modal Title",
    },
  },
  setup(props, { emit }) {
    function modalClose() {
      emit("close");
    }

    return {
      modalClose,
    };
  },
  emits: ["close"],
};
</script>

<style scoped>
.showModal {
  display: block !important;
}
</style>
