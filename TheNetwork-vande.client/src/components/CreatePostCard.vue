<template>
    <div class="p-3 pb-0">
      <router-link :to="{name: 'Profile Page', params: {profileId: account.id}}">
        <img class="img-fluid creator-img" :src="account.picture" :alt="account.name">
      </router-link>
        <span class="ps-2 fs-4"> 
          {{ account.name }} <i class="mdi mdi-account-school" v-if="account.graduated"></i> 
        </span>
    </div>
    <div>
      <form @submit.prevent="createPost()">
        <div class="px-2 py-0">
          <label for="body"></label>
          <textarea v-model="editable.body" name="body" id="body" cols="30" rows="10" required maxlength="500" minlength="3" class="form-control" placeholder="Write down your thoughts..."></textarea>
        </div>
        <div class="px-2 py-0">
          <label for="imgUrl"></label>
          <input v-model="editable.imgUrl" type="url" name="imgUrl" id="imgUrl" class="form-control" placeholder="Image URL">
        </div>
        <div class="text-end p-2">
          <button class="btn btn-info" type="submit">
            Post <i class="mdi mdi-send"></i>
          </button>
        </div>

      </form>
  </div>

</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup(){
    const editable = ref({});

    return {
      editable,

      account: computed(() => AppState.account),

      selectedProfile: computed(() => AppState.selectedProfile),

      async createPost() {
                try {
                    const postData = editable.value;
                    await postsService.createPost(postData);
                    editable.value = {}
                }
                catch (error) {
                    Pop.error(error.message);
                }
            },

    }
  }
}
</script>


<style lang="scss" scoped>
.creator-img{
    height: 7vh;
    width: 7vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
</style>