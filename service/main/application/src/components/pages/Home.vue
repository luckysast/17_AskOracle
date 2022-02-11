<template>
  <main class="l-home-page">
    <app-header></app-header>

    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Вопросы для {{user.username}}
      </h4>

      <quest-list>
        <quest-list-body slot="quest-list-body" :quests="quests"></quest-list-body>
      </quest-list>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
import QuestListBody from './../Quest/QuestListBody'

const OracleAPI = `http://${window.location.hostname}:3001`

export default {
  components: {
    'quest-list-body': QuestListBody
  },
  data () {
    return {
      quests: [],
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted () {
    this.getAllQuests()
  },
  methods: {
    getAllQuests () {
      Axios.get(`${OracleAPI}/api/v1/questions`, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      }).then(({data}) => (this.quests = data))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../assets/styles";

  .l-home {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>
