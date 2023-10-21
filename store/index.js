import Vue from 'vue'
export const state = () => ({
  users: {},
  user: {}
})

export const getters = {
  getUsers: (s) => s.users,
  getUser: (s) => s.user
}

export const actions = {
  nuxtServerInit({dispatch, commit}) {
  },

  async fetchUsers({ commit }, payload) {
    const query = new URLSearchParams(payload).toString()
    const data = await this.$axios.$get(`/users?${query}`);
    commit('mutate', {
      key: 'users',
      value: data || {}
    })
  },
  async storeUser({ commit }, form) {
    await this.$axios.$post('/users', form);
  },

  async updateUser({ commit }, payload) {
    await this.$axios.$put(`/users/${payload.id}`, payload.form);
  },

  async deleteUser({ commit }, id) {
    try {
      await this.$axios.$delete(`/users/${id}`);
      this.$toast.success(`Successfully deleted: ${id}`)
    }catch (e) {

    }

  },

  async getUser({ commit }, id) {
    const data = await this.$axios.$get(`/users/${id}`);

    commit('mutate', {
      key: 'user',
      value: data || {}
    })
  }
}

export const mutations = {
  mutate(state, payload) {
    Vue.set(state,payload.key, payload.value);
  }
}
