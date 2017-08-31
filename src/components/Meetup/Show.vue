<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ meetup.title }}</h6>
            <template v-if="authUserOwnsMeetup">
              <v-spacer></v-spacer>
              <meetup-edit-modal></meetup-edit-modal>
            </template>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl" height="400px"></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    props: ['id'],
    computed: {
      ...mapState(['user']),
      ...mapGetters(['authCheck', 'loadedMeetup']),
      meetup () {
        return this.loadedMeetup(this.id)
      },
      authUserOwnsMeetup () {
        if (!this.authCheck) {
          return false
        }
        return this.user.id === this.meetup.userId
      }
    }
  }
</script>
