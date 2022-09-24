<template>
  <form>
    <div id="signupview" class="nes-container with-title is-centered">
       <p class='title'>Sign up</p>
      <div v-if="errorMsg">
        <p>{{ errorMsg }}</p>
      </div>
      <div class="nes-field is-inline">
        <label for="email"
          >Email:
          <input
            type="email"
            id="email"
            class="nes-input"
            required
            v-model="email"
          />
        </label>
      </div>
      <div class="nes-field is-inline">
        <label for="password"
          >Password:
          <input
            type="password"
            id="password"
            class="nes-input"
            required
            v-model="password"
          />
        </label>
      </div>
     <div class="nes-field is-inline">
        <label for="repeatPass"
          >Repeat password:
          <input
            type="password"
            id="repeatPass"
            class="nes-input"
            required
            v-model="repeatPass"
          />
        </label>
      </div>
      <button
        type="button"
        class="nes-btn is-success"
        @click.prevent="handleSignUp"
      >
        Sign up
      </button>
    </div>
  </form>
  <p>Already have an account?</p>
  <router-link to="/signin">Sign in </router-link>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'RegisterView',
  data() {
    return {
      errorMsg: '',
      email: '',
      password: '',
      repeatPass: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    async handleSignUp() {
      if (this.password === this.repeatPass) {
        try {
          const userData = {
            email: this.email,
            password: this.password,
            repeatPass: this.repeatPass,
          };
          this.signUp(userData.email, userData.password);
        } catch (error) {
          this.errorMsg = error.message;
        }
      }
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
