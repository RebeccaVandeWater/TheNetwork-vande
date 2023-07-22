<template>
  <div class="container-fluid">
  <section class="row">
    <div class="col-12">
      <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="creator-img-lg" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>

    </div>
  </section>
    <section class="row justify-content-center">
      <div class="col-10 d-flex justify-content-center">
        <div class="elevation-4 bg-white card-size p-3">
          <p>
            Edit Account
          </p>
          <form @submit.prevent="editAccount()">
            <label for="name"></label>
            <input v-model="editable.name" type="text" name="name" class="form-control" placeholder="Name" minlength="2" maxlength="50">

            <label for="picture"></label>
            <input v-model="editable.picture" type="url" name="picture" id="picture" class="form-control" placeholder="Profile Picture" minlength="1" maxlength="500">

            <label for="coverImg"></label>
            <input v-model="editable.coverImg" type="url" name="coverImg" id="coverImg" class="form-control" placeholder="Profile Cover Image" minlength="1" maxlength="500">

            <label for="bio"></label>
            <textarea v-model="editable.bio" name="bio" id="bio" cols="30" rows="10" class="form-control" placeholder="Profile Bio" minlength="1" maxlength="500"></textarea>

            <label for="linkedin"></label>
            <input v-model="editable.linkedin" type="url" name="linkedin" id="linkedin" class="form-control" placeholder="Linkedin" minlength="1" maxlength="500">

            <label for="github"></label>
            <input v-model="editable.github" type="url" name="github" id="github" class="form-control" placeholder="Github" minlength="1" maxlength="500">

            <label for="resume"></label>
            <input v-model="editable.resume" type="url" name="resume" id="resume" class="form-control" placeholder="Resume" minlength="1" maxlength="500">

            <label for="class"></label>
            <input v-model="editable.class" type="text" name="class" class="form-control" placeholder="Code Works Class" minlength="2" maxlength="50">

            <label class="ms-2 text-light-emphasis" for="graduated">Code Works Grad</label>
            <input v-model="editable.graduated" class="m-3" type="checkbox" name="graduated">

            <div class="text-end">
              <button class="btn btn-success" type="submit">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
  </section>

</div>

</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
export default {
  setup() {

    const editable = ref({})

    return {
      editable,

      account: computed(() => AppState.account),

      async editAccount(){
        try {
          if(editable.value.graduated == 'on'){
            editable.value.graduated = true
          }

          const accountData = editable.value

          await accountService.editAccount(accountData)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.card-size{
  width: 50vw;
}

.creator-img-lg{
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
</style>
