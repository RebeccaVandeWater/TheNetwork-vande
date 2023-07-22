<template>
  <div class="mb-5">
<img class="img-fluid img-size" :src="ad.tall" :alt="ad.title">
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
.img-size{
  height: 50vh;
}
</style>