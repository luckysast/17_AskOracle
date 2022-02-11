<template>
  <section class="l-quest-list-container">
    <v-container>
      <template v-for="user in users">
            <v-card color="teal lighten-3 userion-card" :key="user._id" class="pa-2">
                <v-card-title class="headline mb-1">{{user.username}}</v-card-title>

                <v-card-actions class="pl-0">
                  <v-flex class="text-xs-right">
                      <v-btn text color="orange darken-1 white--text" :href="'answers?id='+user._id" >Посмотреть ответы</v-btn>
                      <v-btn text color="green darken-1 white--text" v-on:click="openForm(user)">Задать вопрос</v-btn>
                  </v-flex>
                </v-card-actions>
            </v-card>
        </template>
    </v-container>
    <v-dialog class="answer-dialog" v-model="modalShow" persistent max-width="600px">
      <div class='ui form'>
        <div class='field'>
          <v-text-field label="Тема" v-model="questionForm.title" color="white" class="white--text" dark required></v-text-field>
        </div>
        <div class='field'>
          <v-select :items="questionTypes"
                    label="Тип"
                    dark
                    style="overflow: hidden"
                    v-model="questionForm.type">
          </v-select>
        </div>
        <div class='field'>
          <v-text-field label="Вопрос" v-model="questionForm.message" color="white" class="white--text" rows="5" textarea dark required></v-text-field>
        </div>
        <transition name="fade">
          <p class="pl-3 red--text" v-if="errors && errors.length">
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
        </transition>
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
  </section>
</template>

<script>
import Authentication from '@/components/pages/Authentication'
import Axios from 'axios'

const OracleAPI = `http://${window.location.hostname}:3001`

export default {
  props: ['users'],
  data () {
    return {
      modalShow: false,
      questionForm: {},
      questionTypes: [
        { text: 'Публичный', value: 1 },
        { text: 'Личный', value: 0 }
      ],
      errors: []
    }
  },
  methods: {
    sendForm () {
      this.errors = []
      if (!this.questionForm.title) {
        this.errors.push('Требуется указать тему.')
      }
      if (this.questionForm.type === undefined) {
        this.errors.push('Требуется указать тип.')
      }
      if (!this.questionForm.message) {
        this.errors.push('Требуется указать вопрос.')
      }

      if (this.errors.length === 0) {
        Axios.post(`${OracleAPI}/api/v1/question`, {
          title: this.questionForm.title,
          type: this.questionForm.type,
          question: this.questionForm.message,
          answer_user_id: this.userModel._id
        },
        {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) }
        }
        ).then(({data}) => ((data.success !== true) ? alert('fail') : this.closeForm()))
      } else {
        let self = this
        setTimeout(function () {
          self.errors = []
        }, 2500)
      }
    },
    openForm (user) {
      this.userModel = user
      this.modalShow = true
    },
    closeForm () {
      this.userModel = {}
      this.modalShow = false
    }
  }
}
</script>

<style lang="scss">
  @import './../../../assets/styles';
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .teal.lighten-3.userion-card {
    border: 2px solid $border-color-input !important;
    border-top: 0px !important;
  }
</style>
