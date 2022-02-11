<template>
  <header class="l-header-container">
    <v-layout row wrap>
      <v-flex xs12 md1 class="mr-2 ml-3">
        <v-btn block color="light-blue lighten-1" href="/">Вопросы</v-btn>
      </v-flex>
      <v-flex xs12 md1 class="mr-2">
        <v-btn block color="light-blue lighten-1" href="answers">Ответы</v-btn>
      </v-flex>
      <v-flex xs12 md2 class="mr-5">
        <v-btn block color="teal lighten-1" href="users">Пользователи</v-btn>
      </v-flex>
      <v-flex xs12 offset-md6 md1>
        <v-btn block color="red lighten-1" @click.native="submitSignout()">Выйти</v-btn>
      </v-flex>
    </v-layout>
  </header>
</template>

<script>
import Authentication from '@/components/pages/Authentication'
export default {
  data () {
    return {
    }
  },
  methods: {
    submitSignout () {
      Authentication.signout(this, '/login')
    }
  }
}
</script>

<style lang="scss">
  @import "./../assets/styles";

  .l-header-container {
    background-color: $background-color;
    margin: 0 auto;
    padding: 0 15px;
    min-width: 272px;

    .layout.wrap {
      padding-bottom: 10px;
    }

    label, input, .icon, .input-group__selections__comma {
      color: #29b6f6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }

    .btn {
      margin-top: 15px;
    }
  }
</style>
