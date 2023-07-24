<template>
  <div class="m-3 ms-0 d-flex align-items-center">
              <router-link :to="{name: 'Profile Page', params: {profileId: account.id}}">
                <img class="img-fluid creator-img-lg" :src="account.picture" :alt="account.name">
              </router-link>
              <p class="fs-3 ms-3">{{ account.name }}</p>
            </div>
            
            <div class="d-flex flex-column">

              <div class="d-flex fs-4 mb-3">
                <div class="pe-2">
                  <a v-if="account.linkedin" :href="account.linkedin"><i class="mdi mdi-linkedin"></i></a>
                  <i v-else class="mdi mdi-linkedin text-secondary" title="Manage your account to complete your profile information."></i>
                </div>

                <div class="pe-2">
                  <a v-if="account.github" :href="account.github"><i class="mdi mdi-github"></i></a>
                  <i v-else class="mdi mdi-github text-secondary" title="Manage your account to complete your profile information."></i>
                </div>

                <div class="pe-2">
                  <a v-if="account.resume" :href="account.resume"><i class="mdi mdi-list-box-outline"></i></a>
                  <i v-else class="mdi mdi-list-box-outline text-secondary" title="Manage your account to complete your profile information."></i>
                </div>
              </div>
              <div class="d-flex">
                <p v-if="account.class" class="pe-2 fs-6">
                  Code Works Cohort: <span> {{ account.class }} </span> 
                </p>
                <p v-else class="pe-2 text-secondary">
                  Code Works Cohort:
                  <em>
                    Manage your account to complete your profile information.
                  </em>
                </p>
                <i class="mdi mdi-account-school" v-if="account.graduated"></i>
              </div>
              <div>
                <p v-if="account.bio" class="fs-5">
                  {{ account.bio }}
                </p>
                <p v-else class="text-secondary">
                  Profile Bio:
                  <em>
                    Manage your account to complete your profile information.
                  </em>
                </p>
              </div>
          </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup(){
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
.creator-img-lg{
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
</style>