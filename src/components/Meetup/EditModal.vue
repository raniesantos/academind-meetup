<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="title" v-model="newTitle" id="title" label="Title" required></v-text-field>
              <v-text-field name="description" v-model="newDescription" id="description" label="Description" multi-line required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onClickSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        newTitle: this.meetup.title,
        newDescription: this.meetup.description
      }
    },
    methods: {
      ...mapActions(['updateMeetup']),
      onClickSave () {
        if (this.newTitle.trim() === '' || this.newDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.updateMeetup({
          id: this.meetup.id,
          title: this.newTitle,
          description: this.newDescription
        })
      }
    }
  }
</script>
