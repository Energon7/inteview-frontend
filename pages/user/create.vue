<template>
  <user-form-component @submit="submit"/>
</template>
<script>
export default {
  methods: {
    async submit(form) {
      this.loading = true;
      try {
        await this.$store.dispatch('storeUser', form)
        this.$router.push('/')
      }catch (e) {

      }
      this.loading = false;
    }
  }
}
</script>
