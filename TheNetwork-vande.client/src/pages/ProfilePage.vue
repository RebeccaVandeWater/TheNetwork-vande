<template>
  <div class="container-fluid debug" v-if="profile">
    <section class="row justify-content-center">
      <div class="col-9">
        <section class="row flex-column justify-content-center">
          <div class="col-12 d-flex justify-content-center">
            <img class="banner-style img-fluid" :src="profile.coverImg" :alt="profile.name">

          </div>
          <div class="col-12 d-flex align-items-center flex-column justify-content-around">
            <div class="col-10 my-4">
              <div class="elevation-4 bg-white p-3 ">
                <div class="d-flex align-items-center"> 
                  <img class="img-fluid rounded-circle creator-img-lg me-3" :src="profile.picture" :alt="profile.name">
                  <h1>
                    {{ profile.name }}
                  </h1>
                </div>

                <div>
                  <p v-if="profile.bio">
                    {{ profile.bio }}
                  </p>
                  <p >
                    {{ profile.class }}
                  </p>
                  <p>
                    <i class="mdi mdi-account-school" v-if="profile.graduated"></i>
                  </p>

                </div>

                <div class="d-flex flex-column justify-content-around fs-4">
                <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a>
                <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github"></i></a>
                <a v-if="profile.resume" :href="profile.resume"><i class="mdi mdi-list-box-outline"></i></a>
              </div>

              </div>
            </div>
            <div class="col-6 bg-white elevation-3 mb-4" v-for="post in posts" :key="post.id">
              <PostCard :post="post" />
            </div>
          </div>
          <div class="col-12">
            <PaginationComponent />
          </div>

        </section>
      </div>

      <div class="col-3">
        <section class="row">
          <div class="col-12" v-for="ad in ads" :key="ad.title">
            <AdCard :ad="ad" />
          </div>
        </section>
      </div>

    </section>

    <section class="row flex-column align-items-center">
      
      
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { profilesService } from '../services/ProfilesService.js'
import { computed, onMounted } from 'vue'
import AdCard from '../components/AdCard.vue'
import { AppState } from '../AppState.js'
import { adsService } from '../services/AdsService.js'
import { postsService } from '../services/PostsService.js'

export default {
    setup() {
        const route = useRoute();
        async function getProfile() {
            try {
                const profileId = route.params.profileId;
                await profilesService.getProfile(profileId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }

        async function getPostsByProfile(){
          try {
            const profileId = route.params.profileId

            await postsService.getPostsByProfile(profileId)
          } catch (error) {
            Pop.error(error.message)
          }
        }
        

        async function getAds(){
          try {
                await adsService.getAds();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }

        onMounted(() => {
            getProfile();
            getAds();
            getPostsByProfile();
        });

        return {
            profile: computed(() => AppState.activeProfile),
            ads: computed(() => AppState.ads),
            posts: computed(() => AppState.posts)
        };
    },
    components: { AdCard }
}
</script>


<style lang="scss" scoped>

.banner-style{
  width: 100vh;
  height: 20vh;
  object-fit: cover;
  object-position: center;
}

.creator-img-lg{
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

</style>
