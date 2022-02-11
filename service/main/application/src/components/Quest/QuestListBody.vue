<template>
  <v-container>
    <template v-for="quest in quests">
        <v-card v-bind:class="[quest.type ? 'light-blue lighten-3 question-card' : 'deep-purple lighten-3 question-card']" :key="quest._id" class="pa-2">
            <v-card-title class="headline mb-1 font-weight-bold">{{quest.title}}</v-card-title>
            <v-list-tile-sub-title class="pl-3">{{quest.question}}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="quest.answer !== undefined" class="white--text pr-3 pt-3 text-xs-right">{{quest.answer}}</v-list-tile-sub-title>
            <v-card-actions class="pl-0" v-else>
              <v-flex class="text-xs-right">
                  <v-btn text color="green darken-1 white--text" v-on:click="openForm(quest)">Ответить</v-btn>
              </v-flex>
            </v-card-actions>
        </v-card>
    </template>
    <v-dialog class="answer-dialog" v-model="modalShow" persistent max-width="600px">
      <div class='ui form'>
        <div class='field'>
          <v-text-field label="Ответ" v-model="answerText" color="white" class="white--text" rows="5" textarea dark required></v-text-field>
        </div>
        <v-card-actions>
          <v-btn class='ui basic blue button' v-on:click="sendForm()">
            Отправить
          </v-btn>
          <v-btn class='ui basic red button' v-on:click="closeForm()">
            Отмена
          </v-btn>
        </v-card-actions>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'

const OracleAPI = `http://${window.location.hostname}:3001`

export default {
  data () {
    return {
      questModel: {},
      modalShow: false,
      answerText: ''
    }
  },
  props: ['quests'],
  methods: {
    sendForm () {
      if (this.answerText) {
        Axios.post(`${OracleAPI}/api/v1/answer`, {
          quest_id: this.questModel._id,
          answer: this.answerText
        },
        {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) }
        }
        ).then(function (data) {
          data = data.data
          if (data.success !== true) {
            alert('fail')
          } else {
            this.quests = this.quests.filter(x => x._id !== this.questModel._id)
            this.closeForm()
          }
        }.bind(this)).catch(({response: {data}}) => {
          alert(data.message)
        })
      }
    },
    openForm (quest) {
      this.questModel = quest
      this.modalShow = true
    },
    closeForm () {
      this.questModel = {}
      this.modalShow = false
    }
  }
}
</script>

<style lang="scss">
  @import './../../assets/styles';

  .deep-purple.lighten-3.question-card, .light-blue.lighten-3.question-card {
    border: 2px solid $border-color-input !important;
    border-top: 0px !important;
  }

  .ui.form {
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>
