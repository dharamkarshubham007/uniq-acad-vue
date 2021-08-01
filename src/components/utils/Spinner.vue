<template>
  <teleport to="#spinner">
    <div v-show="spinnerState">
      <div class="loader"><img src="@/assets/pinwheel.gif" /></div>
      <div class="modal-backdrop fade show"></div>
    </div>
  </teleport>
</template>

<script>
import { SPINNER_STATE_GETTER } from "../../store/utils/store-constants";
import { useGetters } from "../../store/utils/store-functions";
export default {
  name: "Spinner",
  setup() {
    const { spinnerState } = useGetters([SPINNER_STATE_GETTER]);
    return {
      spinnerState,
    };
  },
};
</script>

<style scoped>
.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: transparent;
}
.loader img {
  position: relative;
  left: 50%;
  top: 40%;
}
</style>
