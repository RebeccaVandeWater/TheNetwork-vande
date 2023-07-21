<template>
  <nav class="navbar navbar-expand-lg navbar-dark teal-gradient-bg px-3">
    <!-- FIXME Router doesn't work, not taken to home page? -->
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p class="fs-3 m-3">
          Network
        </p>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link> -->
          <router-link :to="{ name: 'Search Page' }" class="btn text-dark lighten-30 selectable text-uppercase">
            Search
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.teal-gradient-bg{
  background: rgb(0,227,152);
  background: linear-gradient(90deg, rgba(0,227,152,1) 0%, rgba(9,214,191,0.9444152661064426) 35%, rgba(161,235,250,0.8099614845938375) 100%);
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
