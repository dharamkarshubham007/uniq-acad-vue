import {
  TOGGLE_SPINNER,
  TOGGLE_SPINNER_ACTION,
} from "../utils/store-constants";

const getters = {
  spinnerState: (state) => state.showLoader,
};

const actions = {
  [TOGGLE_SPINNER_ACTION]({ commit }) {
    commit(TOGGLE_SPINNER);
  },
};

const mutations = {
  [TOGGLE_SPINNER](state) {
    state.showLoader = !state.showLoader;
  },
};

const spinner = {
  state() {
    return {
      showLoader: false,
    };
  },
  getters,
  actions,
  mutations,
};

export default spinner;
