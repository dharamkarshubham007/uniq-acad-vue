import { createStore } from "vuex";
import { spinner, user, instructor, student } from "./modules/";
import { RESET_STATE } from "./utils/store-constants";

let initialState = {
  spinner: spinner.state(),
  user: user.state(),
  instructor: instructor.state(),
  student: student.state(),
};

export default createStore({
  modules: {
    spinner,
    user,
    instructor,
    student,
  },
  actions: {
    resetStateAction({ commit }) {
      commit(RESET_STATE, initialState);
    },
  },
  mutations: {
    resetState(state, initialState) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], initialState[key]);
      });
    },
  },
});
