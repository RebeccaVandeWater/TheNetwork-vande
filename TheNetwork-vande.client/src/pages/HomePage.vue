<template>
  <div class="container-fluid bg-light">
    <section class="row justify-content-between">

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

      <div class="col-md-3 col-12 d-flex flex-column align-items-center">
          <div v-for="ad in ads" :key="ad.title">
            <AdCard :ad="ad" />
          </div>
      </div>

    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import { adsService } from '../services/AdsService.js';
import AdCard from '../components/AdCard.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import CreatePostCard from '../components/CreatePostCard.vue';


export default {
    setup() {
        const editable = ref({});

        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }

        async function getAds() {
            try {
                await adsService.getAds();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }

        onMounted(() => {
            getPosts(),
                getAds();
        });

        return {
            editable,

            ads: computed(() => AppState.ads),

            posts: computed(() => AppState.posts),

            account: computed(() => AppState.account),

        };
    },
    components: { AdCard, PaginationComponent, CreatePostCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

</style>
