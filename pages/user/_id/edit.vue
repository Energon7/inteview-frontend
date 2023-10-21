<template>
  <form-component :user="userForm" @submit="submit"/>
</template>
<script>
import FormComponent from "~/components/User/FormComponent.vue";

export default {
  async asyncData({ store, route }) {
    await store.dispatch('getUser', route.params.id)
    return {
      userForm: store.getters.getUser
    }
  },
  components: {FormComponent},

  methods: {
    async submit(form) {
      this.loading = true;
      try {
        await this.$store.dispatch('updateUser', {
          id: this.$route.params.id,
          form: form
        })
        this.$router.push('/')
      }catch (e) {}
      this.loading = false;
    }
  }

}
</script>



