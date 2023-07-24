<template>
  <div class="container-fluid" v-if="profile">
    <section class="row">
      <div class="col-12 d-flex justify-content-center">
        <img class="banner-style img-fluid flex-fill" :src="profile.coverImg" :alt="profile.name">
      </div>

      <div class="col-md-3 col-12 mt-2">
        <div class="bg-white elevation-3 p-3" v-if="account.id">
          <ProfileCard />
        </div>
      </div>

      <div class="col-md-6 col-12">

          <div class="bg-white elevation-3 my-2" v-if="account.id">
            <CreatePostCard />
          </div>
          <div class="bg-white elevation-3 my-2" v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
          <div>
            <PaginationComponent />
          </div>
      </div>

      <div class="col-md-3 col-12">
          <div v-for="ad in ads" :key="ad.title">
            <AdCard :ad="ad" />
          </div>
      </div>

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
            account: computed(() => AppState.account),
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
