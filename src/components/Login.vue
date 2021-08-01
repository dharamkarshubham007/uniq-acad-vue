<template>
  <div id="login mt-5">
    <div class="container pt-5">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form @submit="login" id="login-form" class="form">
              <h3 class="text-center text-info display-4 mb-5">Login</h3>
              <div class="form-group">
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="form-control"
                  placeholder="Email"
                  required="true"
                  v-model.trim="email"
                />
                <div v-if="errors['email']" class="invalid">
                  {{ errors["email"] }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                  required="true"
                  v-model="password"
                />
                <div v-if="errors['password']" class="invalid">
                  {{ errors["password"] }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  name="submit"
                  class="btn btn-info btn-md col-4 font-weight-bold"
                  value="Login"
                />
              </div>
              <div id="register-link" class="text-center">
                Don't have an account?
                <router-link
                  to="/register"
                  class="text-info text-center font-weight-bold"
                  >Register here</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { WELCOME_HOME_SUCCESS } from "../utils/app-constants";
import { validateEmail, validatePassword } from "../utils/validations";
import { useActions } from "../store/utils/store-functions";
import {
  SIGNIN_ACTION,
  TOGGLE_SPINNER_ACTION,
} from "../store/utils/store-constants";
import { inject } from "vue";
import { auth } from "../firebase";

export default {
  name: "Login",
  setup() {
    const loginState = reactive({
      email: "",
      password: "",
      errors: [],
    });
    const toast = inject("toast");
    const { toggleSpinnerAction, signInAction } = useActions([
      TOGGLE_SPINNER_ACTION,
      SIGNIN_ACTION,
    ]);

    async function login(e) {
      e.preventDefault();
      const isFormValid = validateFormFields();
      if (!isFormValid) return false;
      try {
        toggleSpinnerAction();
        const { user } = await auth.signInWithEmailAndPassword(
          loginState.email,
          loginState.password
        );
        await signInAction(user.uid);
        toast.success(WELCOME_HOME_SUCCESS);
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    }

    function validateFormFields() {
      let isValid = true;
      isValid &= validateEmail(loginState, loginState.email, "email");
      isValid &= validatePassword(loginState, loginState.password, "password");

      return isValid;
    }

    return {
      ...toRefs(loginState),
      login,
    };
  },
};
</script>
<style scoped></style>
