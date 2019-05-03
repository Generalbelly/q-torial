<template>
  <div class="form-container">
    <base-logo class="has-margin-bottom-6"></base-logo>
    <validation-observer ref="observer">
      <sign-in-form
        :email.sync="innerEmail"
        :password.sync="innerPassword"
        @click:sign-in="onClickSignIn"
      ></sign-in-form>
    </validation-observer>
    <p class="has-margin-top-5">
      You don't have an account?
      <router-link :to="{ name: 'sign-up' }">
        Create account
      </router-link>
    </p>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import SignInForm from '../../organisms/forms/SignInForm';
import BaseLogo from '../../atoms/BaseLogo/BaseLogo';

export default {
  name: 'SignInTemplate',
  components: {
    BaseLogo,
    SignInForm,
    ValidationObserver,
  },
  props: {
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      innerEmail: null,
      innerPassword: null,
    };
  },
  watch: {
    email(value) {
      this.innerEmail = value;
    },
    password(value) {
      this.innerPassword = value;
    },
  },
  methods: {
    async onClickSignIn() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('click:sign-in', {
          email: this.innerEmail,
          password: this.innerPassword,
        });
      }
    },
  },

};
</script>

<style scoped>
.form-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.form-container > span {
  min-width: 350px;
}
</style>
