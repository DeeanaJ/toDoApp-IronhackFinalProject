<template>
  <h1>Sign in</h1>
  <form>
    <div id='signinview'>
    <div>
      <label for="email"
        >Email:
        <input
          type="email"
          required
          id="email"
          v-model="email"
        />
      </label>
    </div>
    <div>
      <label for="password"
        >Password:
        <input
          type="password"
          required
          id="password"
          v-model="password"
        />
      </label>
    </div>
    <button @click.prevent="handleSignIn">Sign in</button>
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
