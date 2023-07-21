<template>
  <div class="d-flex justify-content-around mb-4">
          <button class="btn btn-outline-secondary" type="button" @click="changePage(newer)" :disabled="!newer">
            <i class="mdi mdi-chevron-left"></i> Newer
          </button>
          <button class="btn btn-outline-secondary" type="button" @click="changePage(older)" :disabled="!older">
            Older <i class="mdi mdi-chevron-right"></i> 
          </button>
      </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup(){
    return {
      
      older: computed(() => AppState.olderPage),

      newer: computed(() => AppState.newerPage),

      async changePage(url) {
        try {
            // logger.log("Change page", url)
            await postsService.changePage(url);
        }
        catch (error) {
            Pop.error(error.message);
        }
    }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>