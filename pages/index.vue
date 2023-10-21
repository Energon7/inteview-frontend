<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <data-table-component
        title="Users"
        @loadPage="loadPage"
        @create="create"
        @edit="edit"
        @delete="remove"
        :items="getUsers.data"
        :pagination="getUsers.meta"
        :headers="headers"
        :options="options"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: 'ID', align: 'start', value: 'id' },
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Email', align: 'start', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
 },
 async asyncData({ store, route }) {
   const query = route.query;
   const options = {
     page: parseInt(query.page || 1),
     itemsPerPage: parseInt(query.itemsPerPage || 10),
     sortBy: [ query.sortBy || "id" ],
     sortDesc: [ query.sortDesc === 'false' || true ],
     search: query.search || ""
   };
   if(!store.getters.getUsers.meta) {
     await store.dispatch('fetchUsers', options)
   }


   return {
      options,
   }
 },

 methods: {
   ...mapActions(['fetchUsers']),

   async loadPage(params) {
     this.loading = true;
     this.$router.push({
       path: this.$route.fullPath,
       query: params
     })
     await this.fetchUsers(params)

     this.loading = false;
   },
   create() {
     this.$router.push('/user/create')
   },
   edit(item) {
     this.$router.push(`/user/${item.id}/edit`)
   },
   async remove(item) {
     await this.$store.dispatch('deleteUser', item.id)
     this.$store.dispatch('fetchUsers', this.options)
   }
 },
 computed: {
   ...mapGetters(['getUsers']),
 }
}
</script>
