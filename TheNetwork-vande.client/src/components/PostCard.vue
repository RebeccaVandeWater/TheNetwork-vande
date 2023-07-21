<template>
  <div class="d-flex">
    <div class="m-3">
      <img class="img-fluid post-img" :src="post.imgUrl" :alt="post.creator.name" v-if="post.imgUrl">
    </div>

    <div class="m-3">
      <div class="d-flex">
        <p>
          <router-link :to="{ name:'Profile Page', params: {profileId: post.creatorId} }">
            <img  class="img-fluid creator-img" :src="post.creator.picture" :alt="post.creator.name">
            <span class="ps-2 me-3"> {{ post.creator.name }} <i class="mdi mdi-account-school" v-if="post.creator.graduated"></i> </span>
          </router-link>
        </p>
        <div v-if="account.id == post.creatorId">
          <button @click="removePost()" class="btn btn-danger" type="button">
            <i class="mdi mdi-delete "></i>
          </button>
        </div>
      </div>
      <div class="fs-4 mb-4">
        {{ post.body }}
        <p class="fs-5 like-color text-end mt-2">
          <span class="pe-2">{{ post.likeIds.length }}</span>
          <i @click="likePost()" v-if="account.id" type="button" class="mdi mdi-heart"></i>
          <i v-else class="mdi mdi-heart"></i>
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
import Pop from '../utils/Pop.js';

export default {
  props:{
    post: {type: Post, required: true}
  },

  setup(props){
    return {
      account: computed(() => AppState.account),

      posts: computed(() => AppState.posts),

      async removePost(){
        try {
          const removeConfirm = await Pop.confirm('Are you sure you want to delete this post?')

          if(!removeConfirm){
            return
          }

          const postId = props.post.id

          await postsService.removePost(postId)
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async likePost(){
        try{
          const postId = props.post.id

          await postsService.likePost(postId)
        }catch(error){
          Pop.error(error.message)
        }
      },
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