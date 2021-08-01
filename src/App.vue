<template>
  <Header />
  <router-view />
  <Spinner />
  <Footer />
</template>
<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Spinner from "./components/utils/Spinner.vue";
export default {
  name: "App",
  components: {
    Header,
    Spinner,
    Footer,
  },
};
</script>
<style>
:root {
  --primary-bg-color: #e3f2fd !important;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.primary-bg-color {
  background-color: var(--primary-bg-color);
}

.cursor {
  cursor: pointer;
}

a {
  text-decoration: none !important;
}

.invalid {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
  font-weight: 500;
}

@media only screen and (min-width: 992px) {
  #navbarNavDropdown {
    display: flex !important;
    justify-content: flex-end;
  }
}
</style>
