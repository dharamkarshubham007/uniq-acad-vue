import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import Toaster from "@incuca/vue3-toaster";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(Toaster, {
        position: "top-right",
        duration: 3000,
        class: "font-weight-bold",
      })
      .mount("#app");
  }
});
