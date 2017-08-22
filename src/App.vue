<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="authCheck" @click="onClickSignout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer;">
          DevMeetup
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon> {{ item.title }}
        </v-btn>
        <v-btn v-if="authCheck" flat @click="onClickSignout">
          <v-icon left dark>exit_to_app</v-icon> Sign out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import menu from './utils/menu'

  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      ...mapGetters(['authCheck']),
      menuItems () {
        return (this.authCheck ? menu.auth : menu.guest)
      }
    },
    methods: {
      ...mapActions(['firebaseSignout']),
      onClickSignout () {
        this.firebaseSignout()
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
