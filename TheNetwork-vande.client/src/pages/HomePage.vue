<template>
  <div class="container-fluid bg-light">
    <section class="row justify-content-between">
      <div class="col-3 bg-white elevation-3">
        <div class="m-3 d-flex align-items-center">
          <img class="img-fluid creator-img-lg" :src="account.picture" :alt="account.name">
          <p class="fs-3 ms-3">{{ account.name }}</p>
        </div>
        <div v-if="account.bio">
          {{ account.bio }}
        </div>
        <div class="d-flex flex-column justify-content-around fs-4">
          <a v-if="account.linkedin" :href="account.linkedin"><i class="mdi mdi-linkedin"></i></a>
          <a v-if="account.github" :href="account.github"><i class="mdi mdi-github"></i></a>
          <a v-if="account.resume" :href="account.resume"><i class="mdi mdi-list-box-outline"></i></a>
        </div>
      </div>
      <div class="col-5 bg-white elevation-3 my-4" v-if="account.id">
        <div class="mt-3">
          <p>
            <img class="img-fluid creator-img" :src="account.picture" :alt="account.name">
            <span class="ps-2"> 
              {{ account.name }} <i class="mdi mdi-account-school" v-if="account.graduated"></i> 
            </span>
          </p>
        </div>
          <form @submit.prevent="createPost()">
            <div class="mb-2">
              <label for="body"></label>
              <textarea v-model="editable.body" name="body" id="body" cols="30" rows="10" required maxlength="500" minlength="3" class="form-control" placeholder="Write down your thoughts..."></textarea>
            </div>
            <div class="mb-2">
              <label for="imgUrl"></label>
              <input v-model="editable.imgUrl" type="url" name="imgUrl" id="imgUrl" class="form-control" placeholder="Image URL">
            </div>
            <div class="text-end mb-3">
              <button class="btn btn-info" type="submit">
                Post <i class="mdi mdi-send"></i>
              </button>
            </div>

          </form>
      </div>
      <div class="col-3" v-for="ad in ads" :key="ad.title">
        <AdCard :ad="ad" />
      </div>
    </section>

    <section class="row flex-column align-items-center">
      <div class="col-6 bg-white elevation-3 mb-4" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
      
      <div>
        <PaginationComponent />
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
            
            async createPost() {
                try {
                    const postData = editable.value;
                    await postsService.createPost(postData);
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },

            async editPost() {
                const postData = editable.value;
                await postsService.editPost(postData);
                editable.value = {};
            },

        };
    },
    components: { AdCard, PaginationComponent }
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

.creator-img{
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
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
