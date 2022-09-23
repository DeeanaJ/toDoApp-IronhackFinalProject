<template>
  <form>
    <div id="signinview" class="nes-container with-title is-centered">
      <p class='title'>Sign in</p>
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
      <button
        type="button"
        class="nes-btn is-success"
        @click.prevent="handleSignIn"
      >
        Sign in
      </button>
    </div>
  </form>
  <p>Don't have an account?</p>
  <router-link to="/register">Sign up </router-link>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'SignInView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.signIn(userData.email, userData.password);
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
