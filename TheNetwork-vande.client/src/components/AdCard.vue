<template>
  <div>
<img class="img-fluid" :src="ad.tall" :alt="ad.title">
  </div>
</template>


<script>
import { Ad } from '../models/Ad.js';

export default {
  props:{
    ad: {type: Ad, required: true}
  },

  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>