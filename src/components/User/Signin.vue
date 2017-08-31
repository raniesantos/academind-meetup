<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSubmitSignin">

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign in
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>

              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data () {
      return {
        email: '',
        password: ''
      };
    },
    computed: {
      ...mapState(['user', 'error', 'loading'])
    },
    methods: {
      ...mapActions(['firebaseSignin', 'clearError']),
      onSubmitSignin () {
        this.firebaseSignin({ email: this.email, password: this.password });
      },
      onDismissed () {
        this.clearError();
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/');
        }
      }
    }
  };
</script>
