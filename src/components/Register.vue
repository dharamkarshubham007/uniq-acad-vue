<template>
  <div id="register">
    <div class="container pt-5">
      <div
        id="register-row"
        class="row justify-content-center align-items-center"
      >
        <div id="register-column" class="col-md-6">
          <div id="register-box" class="col-md-12">
            <form @submit="register" id="register-form" class="form">
              <h3 class="text-center text-info mb-5 display-4">Register</h3>
              <div class="form-row form-group">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                    v-model.trim="firstName"
                  />
                  <div v-if="errors['first_name']" class="invalid">
                    {{ errors["first_name"] }}
                  </div>
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                    v-model.trim="lastName"
                  />
                  <div v-if="errors['last_name']" class="invalid">
                    {{ errors["last_name"] }}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
                <div v-if="errors['email']" class="invalid">
                  {{ errors["email"] }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
                <div v-if="errors['password']" class="invalid">
                  {{ errors["password"] }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  name="confirm-password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                />
                <div v-if="errors['confirm_password']" class="invalid">
                  {{ errors["confirm_password"] }}
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="user_type"
                    >User Type</label
                  >
                </div>
                <select class="custom-select" id="user_type" v-model="userType">
                  <option disabled value="">Choose...</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
                <div v-if="errors['user_type']" class="invalid">
                  {{ errors["user_type"] }}
                </div>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  name="submit"
                  class="btn btn-info btn-md col-4 font-weight-bold"
                  value="Register"
                />
              </div>
              <div id="register-link" class="text-center">
                Already have an account?
                <router-link
                  to="/"
                  class="text-info text-center font-weight-bold"
                  >Login here</router-link
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
import {
  validateEmail,
  validateConfirmPassword,
  validatePassword,
  validateUserType,
  validateFirstName,
  validateLastName,
} from "../utils/validations";
import { WELCOME_HOME_SUCCESS } from "../utils/app-constants";
import { useActions } from "../store/utils/store-functions";
import {
  SIGNUP_ACTION,
  TOGGLE_SPINNER_ACTION,
} from "../store/utils/store-constants";
import { inject } from "vue";
import { auth } from "../firebase";

export default {
  name: "Register",
  setup() {
    const registerState = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      errors: [],
    });
    const toast = inject("toast");
    const { toggleSpinnerAction, signUpAction } = useActions([
      TOGGLE_SPINNER_ACTION,
      SIGNUP_ACTION,
    ]);

    async function register(e) {
      e.preventDefault();
      const isFormValid = validateFormFields();
      if (!isFormValid) return false;
      try {
        toggleSpinnerAction();
        const { user } = await auth.createUserWithEmailAndPassword(
          registerState.email,
          registerState.password
        );
        const userInfo = {
          first_name: registerState.firstName,
          last_name: registerState.lastName,
          email: registerState.email,
          role: registerState.userType,
        };
        await signUpAction({ ...userInfo, uid: user.uid });
        toast.success(WELCOME_HOME_SUCCESS);
      } catch (e) {
        toast.error(e.message);
      } finally {
        toggleSpinnerAction();
      }
    }

    function validateFormFields() {
      let isValid = true;
      isValid &= validateEmail(registerState, registerState.email, "email");
      isValid &= validatePassword(
        registerState,
        registerState.password,
        "password"
      );
      isValid &= validateConfirmPassword(
        registerState,
        registerState.confirmPassword,
        registerState.password,
        "confirm_password"
      );
      isValid &= validateUserType(
        registerState,
        registerState.userType,
        "user_type"
      );
      isValid &= validateFirstName(
        registerState,
        registerState.firstName,
        "first_name"
      );
      isValid &= validateLastName(
        registerState,
        registerState.lastName,
        "last_name"
      );
      return isValid;
    }

    return {
      ...toRefs(registerState),
      register,
    };
  },
};
</script>

<style scoped></style>
