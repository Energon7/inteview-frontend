<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-sheet width="600" class="mx-auto">

      <v-form @submit.prevent="$emit('submit', form)">
        <v-text-field
          v-model="form.name"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="form.address"
          label="Address"
        ></v-text-field>
        <v-text-field
          v-model="form.phone"
          label="Phone"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-btn @click="$router.back()" type="button" block class="mt-2">Cancel</v-btn>
          </v-col>
          <v-col>
            <v-btn :loading="loading" color="success" type="submit" block class="mt-2">Submit</v-btn>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
      </v-form>
    </v-sheet>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: null,
        email: null,
        address: null,
        phone: null,
      }
    }
  },
  mounted() {
    if(this.user) {
      this.form.name = this.user.name;
      this.form.email = this.user.email;
      this.form.address = this.user.address;
      this.form.phone = this.user.phone;
    }
  }
}
</script>

