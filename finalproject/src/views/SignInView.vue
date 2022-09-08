<template>
  <div>
    <h1>Sign in</h1>
    <form>
      <div id="signinview">
        <label for="email"
          >Email:
          <input type="email" required id="email" v-model="email" />
        </label>
        <label for="password"
          >Password:
          <input type="password" required id="password" v-model="password" />
        </label>
        <button @click="handleSignIn">Sign In</button>
      </div>
    </form>
    <p>Don't have an account?</p>
    <router-link to="/signup">Sign up </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'SignInView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      const userData = {
        email: '',
        password: '',
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
