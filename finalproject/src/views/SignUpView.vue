<template>
  <h1>Sign up</h1>
  <form>
    <div id="signupview">
      <div v-if="errorMsg">
        <p>{{ errorMsg }}</p>
      </div>
      <div>
        <label for="email"
          >Email:
          <input type="email" required id="email" v-model="email" />
        </label>
      </div>
      <div>
        <label for="password"
          >Password:
          <input type="password" required id="password" v-model="password" />
        </label>
      </div>
      <div>
        <label for="repeatPass"
          >Confirm password:
          <input
            type="password"
            required
            id="repeatPass"
            v-model="repeatPass"
          />
        </label>
      </div>
      <button @click.prevent="handleSignUp">Sign up</button>
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
