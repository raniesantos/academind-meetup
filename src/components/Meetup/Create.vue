<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Meetup</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>

        <form @submit.prevent="onSubmitCreate">

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" v-model="title" id="title" label="Title" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="location" v-model="location" id="location" label="Location" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="image-url" v-model="imageUrl" id="image-url" label="Image URL" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="description" v-model="description" id="description" label="Description" multi-line required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Date and Time</h4>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" class="primary" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-flex>
          </v-layout>

        </form>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        time: new Date()
      }
    },
    methods: {
      ...mapActions(['createMeetup']),
      onSubmitCreate () {
        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        this.createMeetup(meetupData)
        this.$router.push('/meetups')
      }
    },
    computed: {
      formIsValid () {
        return (
          this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
        )
      },
      submittableDateTime () {
        const date = new Date(this.date)
        const timeIsString = (typeof this.time === 'string')
        const hours = (timeIsString ? this.time.match(/^(\d+)/)[1] : this.time.getHours())
        const minutes = (timeIsString ? this.time.match(/:(\d+)/)[1] : this.time.getMinutes())
        date.setHours(hours)
        date.setMinutes(minutes)
        return date
      }
    }
  }
</script>
