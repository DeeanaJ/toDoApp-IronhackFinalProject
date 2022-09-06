<template>
  <h1>Sign up / Sign in</h1>
  <form>
    <div id="auth">
      <label for="email"
        >Email:
        <input type="email" required id="email" v-model="email" />
      </label>
      <label for="password"
        >Password:
        <input type="password" required id="password" v-model="password" />
      </label>
    </div>
  </form>
  <button @click="handleSignUp">Sign Up</button>
  <button @click="handleSignIn">Sign In</button>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: 'assd.asd@asc.com',
        password: '123456',
      };
      this.signUp(userData.email, userData.password);
    },
    handleSignIn() {
      const userData = {
        email: 'assd.asd@asc.com',
        password: '123456',
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
