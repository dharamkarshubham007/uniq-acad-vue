<template>
  <nav class="navbar navbar-expand-lg navbar-light primary-bg-color mb-4">
    <router-link class="navbar-brand text-info font-weight-bold" to="/"
      >GS Lab Academy</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav nav">
        <template v-if="!isLoggedIn">
          <template v-for="item in navLinks[role]" :key="item.name">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="item.path"
                exact-active-class="active-link"
                >{{ item.name }}</router-link
              >
            </li>
          </template>
        </template>
        <template v-if="isLoggedIn">
          <template v-for="item in navLinks[role]" :key="item.name">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="item.path"
                active-class="active-link"
                >{{ item.name }}</router-link
              >
            </li>
          </template>
        </template>
        <li class="nav-item" v-if="isLoggedIn">
          <span class="nav-link user-name-text font-weight-bold text-success">
            Hello {{ userName }}
          </span>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link font-weight-bold" href="#" @click="logout"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, inject, reactive } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { auth } from "../firebase";
import { LOGOUT_SUCCESS } from "../utils/app-constants";
import { ROOT_PATH } from "../router/route-constants";
import { useActions, useState } from "../store/utils/store-functions";
import {
  RESET_STATE_ACTION,
  SIGNOUT_ACTION,
  TOGGLE_SPINNER_ACTION,
  USER_STATE,
} from "../store/utils/store-constants";
import {
  userNavLinks,
  studentNavlinks,
  instructorNavLinks,
} from "../utils/role-navlinks";

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const toast = inject("toast");

    const {
      resetStateAction,
      toggleSpinnerAction,
      signOutAction,
    } = useActions([RESET_STATE_ACTION, TOGGLE_SPINNER_ACTION, SIGNOUT_ACTION]);

    const navLinks = reactive({
      user: userNavLinks,
      student: studentNavlinks,
      instructor: instructorNavLinks,
    });

    const isLoggedIn = computed(() => {
      const { user } = useState([USER_STATE]);
      return user.value.user != null ? true : false;
    });

    const role = computed(() => {
      const { user } = useState([USER_STATE]);
      return user.value.user ? user.value.user.role : "user";
    });

    const userName = computed(() => {
      const { user } = useState([USER_STATE]);

      return user.value.user ? user.value.user.first_name : "User";
    });

    async function logout(e) {
      e.preventDefault();
      try {
        toggleSpinnerAction();
        await auth.signOut();
        localStorage.removeItem("user");
        localStorage.removeItem("userRef");
        await resetStateAction();
        await signOutAction();
        toast.success(LOGOUT_SUCCESS);
        router.push(ROOT_PATH);
      } catch (e) {
        toast.error(e.message);
        toggleSpinnerAction();
      }
    }

    return {
      logout,
      isLoggedIn,
      role,
      navLinks,
      userName,
    };
  },
};
</script>

<style scoped>
.user-name-text {
  text-transform: capitalize;
}
.active-link {
  color: teal !important;
  font-weight: bold;
}
</style>
