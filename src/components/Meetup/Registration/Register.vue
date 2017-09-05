<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>{{ userIsRegistered ? 'Unregister from' : 'Register for' }} Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click="registerDialog = false">Cancel</v-btn>
              <v-btn class="green--text darken-1" flat @click="onClickConfirm">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false
      };
    },
    computed: {
      ...mapState(['user']),
      userIsRegistered () {
        return this.user.registeredMeetups.findIndex((meetupId) => {
          return meetupId === this.meetupId;
        }) >= 0;
      }
    },
    methods: {
      ...mapActions(['registerUserForMeetup', 'unregisterUserForMeetup']),
      onClickConfirm () {
        if (this.userIsRegistered) {
          this.unregisterUserForMeetup(this.meetupId);
        } else {
          this.registerUserForMeetup(this.meetupId);
        }
      }
    }
  };
</script>
