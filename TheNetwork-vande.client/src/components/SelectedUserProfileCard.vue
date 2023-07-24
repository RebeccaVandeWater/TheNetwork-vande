<template>
  <div class="m-3 ms-0 d-flex align-items-center" v-if="selectedProfile">
              <router-link :to="{name: 'Profile Page', params: {profileId: selectedProfile.id}}">
                <img class="img-fluid creator-img-lg" :src="selectedProfile.picture" :alt="selectedProfile.name">
              </router-link>
              <p class="fs-3 ms-3">{{ selectedProfile.name }}</p>
            </div>
            
            <div class="d-flex flex-column">

              <div class="d-flex fs-4 mb-3">
                <div class="pe-2">
                  <a v-if="selectedProfile.linkedin" :href="selectedProfile.linkedin"><i class="mdi mdi-linkedin"></i></a>
                  <i v-else class="mdi mdi-linkedin text-secondary" title="Manage your account to complete your profile information."></i>
                </div>

                <div class="pe-2">
                  <a v-if="selectedProfile.github" :href="selectedProfile.github"><i class="mdi mdi-github"></i></a>
                  <i v-else class="mdi mdi-github text-secondary" title="Manage your account to complete your profile information."></i>
                </div>

                <div class="pe-2">
                  <a v-if="selectedProfile.resume" :href="selectedProfile.resume"><i class="mdi mdi-list-box-outline"></i></a>
                  <i v-else class="mdi mdi-list-box-outline text-secondary" title="Manage your account to complete your profile information."></i>
                </div>
              </div>
              <div class="d-flex">
                <p v-if="selectedProfile.class" class="pe-2 fs-6">
                  Code Works Cohort: <span> {{ selectedProfile.class }} </span> 
                </p>
                <p v-else class="pe-2 text-secondary">
                  Code Works Cohort:
                  <em>
                    
                  </em>
                </p>
                <i class="mdi mdi-account-school" v-if="selectedProfile.graduated"></i>
              </div>
              <div>
                <p v-if="selectedProfile.bio" class="fs-5">
                  {{ selectedProfile.bio }}
                </p>
                <p v-else class="text-secondary">
                  Profile Bio:
                  <em>
                    
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
      selectedProfile: computed(() => AppState.activeProfile),
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