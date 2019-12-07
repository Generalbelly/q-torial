<template>
  <div class="form-container">
    <base-logo class="has-margin-bottom-6" @click="onClickLogo" />
    <validation-observer ref="observer">
      <sign-up-form
        :email.sync="innerEmail"
        :password.sync="innerPassword"
        @click:sign-up="onClickSignUp"
      />
    </validation-observer>
    <p class="has-margin-top-5">
      Do you have an account?
      <router-link :to="{ name: 'sign-in' }">
        Sign in
      </router-link>
    </p>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import SignUpForm from '../../organisms/forms/SignUpForm';
import BaseLogo from '../../atoms/BaseLogo';

export default {
  name: 'SignUpTemplate',
  components: {
    BaseLogo,
    SignUpForm,
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
  mounted() {
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
  },
  methods: {
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.onClickSignUp();
      }
    },
    async onClickSignUp() {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        this.$emit('click:sign-up', {
          email: this.innerEmail,
          password: this.innerPassword,
        });
      }
    },
    onClickLogo() {
      this.$router.push({
        name: 'index',
      });
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
