<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        @keydown.enter="options.search = $event.target.value"
        v-model="searchValue"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="$emit('create')"
      >
        Add New {{ $singularize(title) }}
      </v-btn>
    </v-card-title>
    <v-data-table
      @update:options="loadPage"
      :options="options"
      :headers="headers"
      :items="items"
      :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50]
      }"
      :server-items-length="pagination?.total"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteConfirmation(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog
      v-model="confirmDeleteModal"
      persistent
      max-width="350"
    >
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="confirmDeleteModal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red"
            text
            @click="deleteItem"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    loading: {
      type: Boolean
    },
    items: {
      type: Array,
    },
    pagination: {
      type: Object
    },
    headers: {
      type: Array
    },
    options: {
      type: Object
    },
    search: {
      type: String
    }
  },
  data() {
    return {
      typingTimeout: null,
      confirmDeleteModal: false,
      deletableItem: null
    }
  },
  methods: {
    deleteConfirmation(item) {
      this.deletableItem = item;
      this.confirmDeleteModal = true;
    },
    loadPage(options) {
        this.$emit('loadPage', {
          page: options.page,
          itemsPerPage: options.itemsPerPage,
          sortBy: options.sortBy,
          sortDesc: options.sortDesc,
          search: this.searchValue,
        })
    },
    editItem(item) {
      this.$emit('edit', item);
    },
    deleteItem() {
      this.$emit('delete', this.deletableItem);
      this.confirmDeleteModal = false;
      this.deletableItem = null;
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.options.search;
      },
      set(value) {
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.options.search = value;
        },1000)
      }
    }
  }
}
</script>
