<template>
  <main class="l-home-page">
    <app-header></app-header>

    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Ответы {{user ? user.username : ''}}
      </h4>

      <quest-list>
        <quest-list-body slot="quest-list-body" :quests="answers"></quest-list-body>
      </quest-list>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
import QuestListBody from './../../Quest/QuestListBody'

const OracleAPI = `http://${window.location.hostname}:3001`

export default {
  components: {
    'quest-list-body': QuestListBody
  },
  data () {
    return {
      answers: [],
      user: (this.$route.query.id !== undefined) ? this.getUser(this.$route.query.id) : JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted () {
    this.getAllQuests()
  },
  methods: {
    getAllQuests () {
      Axios.get(`${OracleAPI}/api/v1/answers`, {
        headers: { Authorization: Authentication.getAuthenticationHeader(this) },
        params: { user_id: ((this.$route.query.id !== undefined) ? this.$route.query.id : '') }
      }).then(({ data }) => (this.answers = data))
    },
    getUser (userId) {
      Axios.get(`${OracleAPI}/api/v1/users`, {
        headers: { Authorization: Authentication.getAuthenticationHeader(this) },
        params: { user_id: userId }
      }).then(({ data }) => (this.user = data))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './../../../assets/styles';

  .l-home {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>
