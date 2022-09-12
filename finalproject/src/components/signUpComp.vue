<template>
    <div>
    <h1>Sign up</h1>
    <form>
      <div id="signupview">
        <label for="email"
          >Email:
          <input type="email" required id="email" v-model="email" />
        </label>
        <label for="password"
          >Password:
          <input type="password" required id="password" v-model="password" />
        </label>
        <button @click="handleSignUp">Sign Up</button>
      </div>
    </form>
    <p>Already have an account?</p>
    <router-link to="/signin">Sign in </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import userStore from '@/store/user';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  name: 'SignUpComp',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const userData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };
      this.signUp(userData.email, userData.password);
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
