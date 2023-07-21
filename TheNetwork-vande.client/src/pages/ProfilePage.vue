<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { profilesService } from '../services/ProfilesService.js'
import { onMounted } from 'vue'

export default {
  setup(){

    const route = useRoute()

    async function getProfile(){
      try {
        const profileId = route.params.profileId

        await profilesService.getProfile(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getProfile()
    })

    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
