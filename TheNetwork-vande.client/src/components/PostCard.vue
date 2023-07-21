<template>
  <div class="d-flex">
    <div class="m-3">
      <img class="img-fluid post-img" :src="post.imgUrl" :alt="post.creator.name" v-if="post.imgUrl">
    </div>

    <div class="m-3">
      <div class="d-flex">
        <p>
          <img class="img-fluid creator-img" :src="post.creator.picture" :alt="post.creator.name">
          <span class="ps-2 me-3"> {{ post.creator.name }} <i class="mdi mdi-account-school" v-if="post.creator.graduated"></i> </span>
        </p>
        <div v-if="account.id == post.creatorId">
          <button @click="selectPost()" class="btn btn-info me-3" type="button">
            <i class="mdi mdi-pencil"></i>
          </button>
          <button class="btn btn-danger" type="button">
            <i class="mdi mdi-delete"></i>
          </button>
        </div>
      </div>
      <div class="fs-4 mb-4">
        {{ post.body }}
        <p class="fs-5 like-color text-end mt-2">
          <span>{{ post.likeIds.length }}</span>
          <i class="mdi mdi-heart"></i>
        </p>
      </div>
      <span class="fs-6 text-secondary">
        {{ post.createdAt }}
      </span>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';

export default {
  props:{
    post: {type: Post, required: true}
  },

  setup(){
    return {
      account: computed(() => AppState.account),

      selectPost(){
        postsService.selectPost()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.post-img{
    height: 20vh;
    width: 15vh;
    object-fit: cover;
    object-position: center;
  }

.creator-img{
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

.like-color{
  color: lightblue;
}
</style>