<template>
  <div class="container-fluid">
    <section class="row justify-content-center">

      <div class="col-12">
        <div class="elevation-2 bg-white p-3 mt-2">
          <form @submit.prevent="getPostsByQuery()">
            <label for="searchBar"></label>
            <input v-model="editable.query" type="text" name="searchBar" id="searchBar" required minlength="2" maxlength="75" class="form-control" placeholder="Search posts">
            <div class="text-end">
              <button class="btn btn-info mt-2">
                <i class="mdi mdi-magnify"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="row flex-column align-items-center mt-4">
      <div class="col-12 bg-white elevation-3 mb-4" v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>
      <div class="m-3" v-if="older">
        <PaginationComponent />
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import PostCard from '../components/PostCard.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';

export default {
    setup() {
        const editable = ref({});

        function clearPosts(){
          postsService.clearPosts()
        }

        onMounted(() => {
          clearPosts()
        })

        return {
            editable,

            ads: computed(() => AppState.ads),

            posts: computed(() => AppState.posts),

            older: computed(() => AppState.olderPage),

            newer: computed(() => AppState.newerPage),

            async getPostsByQuery(){
              try {
                const query = editable.value.query

                await postsService.getPostsByQuery(query)

                editable.value = {}
              } catch (error) {
                Pop.error(error.message)
              }
            }
        };
    },
    components: { PostCard, PaginationComponent }
}
</script>


<style lang="scss" scoped>

</style>