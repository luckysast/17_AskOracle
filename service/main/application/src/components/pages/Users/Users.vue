<template>
  <main class="l-user-page">
    <app-header></app-header>

    <div class="l-user">
      <h4 class="white--text text-xs-center my-0">
        Пользователи
      </h4>

      <user-list slot="user-list" :users="users"></user-list>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
import UserList from '@/components/pages/Users/UserList'

const OracleAPI = `http://${window.location.hostname}:3001`

export default {
  components: {
    'user-list': UserList
  },
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers () {
      Axios.get(`${OracleAPI}/api/v1/users`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: {}
      }).then(({data}) => (this.users = data))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../../assets/styles";

  .l-user {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>
