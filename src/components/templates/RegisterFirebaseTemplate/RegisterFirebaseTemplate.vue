<template>
  <div>
    <centering-layout
      v-if="!shouldShowCreateUserModal && !shouldShowInstructionModal"
      min-width="unset"
      max-width="unset"
    >
      <template v-slot:content>
        <base-columns class="has-padding-5">
          <base-column>
            <base-heading
              class="has-text-weight-bold"
            >
              Register your firebase project
            </base-heading>
            <p>
              We need you to create a new firebase project, so that we can store tutorials you make in the firebase project. <br />
              If you haven't created a firebase project yet, follow the instruction <span class="has-text-weight-semibold">Step1</span> and <span class="has-text-weight-semibold">Step2</span> of this <a href="https://firebase.google.com/docs/web/setup" target="_blank">page</a>
            </p>
            <div class="has-padding-y-6">
              <img src="img/firebase-integration.png">
            </div>
          </base-column>
          <base-column>
            <firebase-config-form
              :firebase-config.sync="innerFirebaseConfig"
            />
            <primary-button
              class="has-margin-top-5 is-fullwidth"
              @click="onClickRegister"
              clickable-with-enter
            >
              Register
            </primary-button>
          </base-column>
        </base-columns>
      </template>
    </centering-layout>
    <base-modal
      :active="shouldShowCreateUserModal"
      :can-cancel="false"
      hide-cancel
    >
      <template v-slot:content>
        <base-heading v-if="useExistingUser">
          Sign in for your firebase project
        </base-heading>
        <base-heading v-else>
          Sign up for your firebase project
        </base-heading>
        <p>All the tutorials you build on Qtorial will belong to a user account you register.</p>
        <template v-if="useExistingUser">
          <p class="has-margin-bottom-5">
            If you would like to create a new user for this project, click <span @click="innerUseExistingUser = false" class="has-text-link has-cursor-pointer">here</span>
          </p>
          <sign-in-form
            :email.sync="innerEmail"
            :password.sync="innerPassword"
            :has-forget-password-link="false"
          />
        </template>
        <template v-else>
          <p class="has-margin-bottom-5">
            If you would like to register an existing user of this project, click <span @click="innerUseExistingUser = true" class="has-text-link has-cursor-pointer">here</span>
          </p>
          <sign-up-form
            :email.sync="innerEmail"
            :password.sync="innerPassword"
            :has-docs-check="false"
          />
        </template>
      </template>
      <template v-slot:primary-action-button>
        <primary-button
          v-if="useExistingUser"
          @click="onClickCreate"
          class="has-margin-top-3 is-fullwidth"
          clickable-with-enter
        >
          Sign in
        </primary-button>
        <primary-button
          v-else
          @click="onClickCreate"
          class="has-margin-top-3 is-fullwidth"
          clickable-with-enter
        >
          Sign up
        </primary-button>
      </template>
    </base-modal>
    <base-modal
      :active="shouldShowInstructionModal"
      :can-cancel="false"
      hide-footer
    >
      <template v-slot:content>
        <div class="content">
          <base-sub-heading
            class="has-text-weight-bold"
          >
            Set up your firebase project for Qtorial
          </base-sub-heading>
          <ol>
            <li class="has-margin-bottom-5">
              Enable firestore and storage in your firebase project, following these instructions.
              <ul>
                <li>
                  <a href="https://firebase.google.com/docs/firestore/quickstart#create" target="_blank">Firestore</a>
                </li>
                <li>
                  <a href="https://firebase.google.com/docs/storage/web/start#create-default-bucket" target="_blank">Storage</a>
                </li>
              </ul>
            </li>
            <li>
              Follow the instruction of this <a href="https://github.com/Qtorial/firebase" target="_blank">repository</a> to complete the setup.
            </li>
          </ol>
          <primary-button
            clickable-with-enter
            class="has-margin-top-5 is-fullwidth"
            @click="onClickDone"
          >
            Done
          </primary-button>
          <div class="help has-margin-top-4 has-text-centered">
            If you encounter any problem, feel free to contact us by chat or by email: <span class="has-text-grey-darker">{{ supportEmail }}</span>
          </div>
        </div>
      </template>
    </base-modal>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import SignUpForm from '../../organisms/forms/SignUpForm';
import BaseLogo from '../../atoms/BaseLogo';
import CenteringLayout from '../../molecules/layouts/CenteringLayout';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import FirebaseConfigForm from '../../organisms/forms/FirebaseConfigForm';
import BaseButton from '../../atoms/BaseButton';
import BaseSubHeading from '../../atoms/BaseSubHeading';
import BaseLoading from '../../atoms/BaseLoading/BaseLoading';
import BaseHeading from '../../atoms/BaseHeading/BaseHeading';
import BaseColumns from '../../atoms/BaseColumns/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn/BaseColumn';
import BaseModal from '../../molecules/BaseModal/BaseModal';
import SignInForm from '../../organisms/forms/SignInForm/SignInForm';

export default {
  name: 'RegisterFirebaseTemplate',
  components: {
    SignInForm,
    BaseModal,
    BaseColumn,
    BaseColumns,
    BaseHeading,
    BaseLoading,
    BaseSubHeading,
    BaseButton,
    FirebaseConfigForm,
    PrimaryButton,
    CenteringLayout,
    BaseLogo,
    SignUpForm,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    supportEmail: {
      type: String,
      default: null,
    },
    firebaseConfig: {
      type: Object,
      default() {
        return {
          apiKey: null,
          authDomain: null,
          databaseURL: null,
          projectId: null,
          storageBucket: null,
          messagingSenderId: null,
          appId: null,
        };
      },
    },
    shouldShowCreateUserModal: {
      type: Boolean,
      default: false,
    },
    shouldShowInstructionModal: {
      type: Boolean,
      default: false,
    },
    useExistingUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      shouldShowHelp: false,
    };
  },
  computed: {
    innerEmail: {
      get() {
        return this.email;
      },
      set(newValue) {
        this.$emit('update:email', newValue);
      },
    },
    innerPassword: {
      get() {
        return this.password;
      },
      set(newValue) {
        this.$emit('update:password', newValue);
      },
    },
    innerFirebaseConfig: {
      get() {
        return this.firebaseConfig;
      },
      set(newValue) {
        this.$emit('update:firebase-config', newValue);
      },
    },
    innerUseExistingUser: {
      get() {
        return this.useExistingUser;
      },
      set(newValue) {
        this.$emit('update:use-existing-user', newValue);
      },
    }
  },
  methods: {
    onClickRegister() {
      this.$emit('click:register');
    },
    onClickCreate() {
      this.$emit('click:create');
    },
    onClickDone() {
      this.$emit('click:done');
    },
  },
};
</script>

<style scoped></style>
