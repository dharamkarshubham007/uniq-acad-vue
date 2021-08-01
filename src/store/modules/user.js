import router from "../../router/index";
import { db, userCollection } from "../../firebase";
import {
  INSTRUCTOR_HOME_PATH,
  STUDENT_HOME_PATH,
} from "../../router/route-constants";
import { Role } from "../../utils/roles";
import {
  LOGOUT_USER,
  SET_USER_PROFILE,
  SIGNIN_ACTION,
  SIGNOUT_ACTION,
  SIGNUP_ACTION,
} from "../utils/store-constants";

const getters = {
  user: (state) => state.user,
  userRef: (state) => state.userRef,
};

const actions = {
  async [SIGNIN_ACTION]({ commit }, uid) {
    const user = await userCollection.doc(uid).get();
    const userRef = await db.collection("users").doc(`${uid}`);
    localStorage.setItem("userRef", JSON.stringify(userRef));
    localStorage.setItem("user", JSON.stringify(user.data()));
    if (user.data().role == Role.STUDENT) {
      router.push(STUDENT_HOME_PATH);
    } else if (user.data().role == Role.INSTRUCTOR) {
      router.push(INSTRUCTOR_HOME_PATH);
    }
    commit(SET_USER_PROFILE, { user: user.data(), userRef });
  },
  async [SIGNUP_ACTION]({ commit }, user) {
    const uid = user.uid;
    delete user.uid;
    await userCollection.doc(uid).set(user);
    const userRef = await db.doc(`/users/${uid}`);
    localStorage.setItem("userRef", JSON.stringify(userRef));
    localStorage.setItem("user", JSON.stringify(user));
    if (user.role == Role.STUDENT) {
      router.push(STUDENT_HOME_PATH);
    } else if (user.role == Role.INSTRUCTOR) {
      router.push(INSTRUCTOR_HOME_PATH);
    }
    commit(SET_USER_PROFILE, { user, userRef });
  },
  [SIGNOUT_ACTION]({ commit }) {
    commit(LOGOUT_USER);
  },
};

const mutations = {
  [SET_USER_PROFILE](state, payload) {
    state.user = { ...payload.user };
    state.userRef = { ...payload.userRef };
  },
  [LOGOUT_USER](state) {
    state.user = null;
  },
};

const user = {
  state() {
    return {
      user:
        localStorage.getItem("user") != undefined
          ? JSON.parse(localStorage.getItem("user"))
          : null,
      userRef:
        localStorage.getItem("userRef") != undefined
          ? JSON.parse(localStorage.getItem("userRef"))
          : null,
    };
  },
  getters,
  actions,
  mutations,
};

export default user;
