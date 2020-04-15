<template>
  <div>
    <validatable-text-field
      name="Api Key"
      label="Api Key"
      v-model="apiKey"
      rules="required"
    />
    <validatable-text-field
      name="Auth Domain"
      label="Auth Domain"
      v-model="authDomain"
      rules="required"
    />
    <validatable-text-field
      name="Database URL"
      label="Database URL"
      v-model="databaseURL"
      rules="required"
    />
    <validatable-text-field
      name="Project Id"
      label="Project Id"
      v-model="projectId"
      rules="required"
    />
    <validatable-text-field
      name="Storage Bucket"
      label="Storage Bucket"
      v-model="storageBucket"
      rules="required"
    />
    <validatable-text-field
      name="Messaging Sender Id"
      label="Messaging Sender Id"
      v-model="messagingSenderId"
      rules="required"
    />
    <validatable-text-field
      name="App Id"
      label="App Id"
      v-model="appId"
      rules="required"
    />
  </div>
</template>
<script>
import ValidatableTextField from '../../../molecules/fields/ValidatableTextField';
import FirebaseConfigEntity from '../../../atoms/Entities/FirebaseConfigEntity';

export default {
  name: 'FirebaseConfigForm',
  components: {
    ValidatableTextField,
  },
  props: {
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
  },
  computed: {
    innerFirebaseConfig: {
      get() {
        return this.firebaseConfig;
      },
      set(newValue) {
        return this.$emit('update:firebase-config', new FirebaseConfigEntity(newValue));
      },
    },
    apiKey: {
      get() {
        return this.innerFirebaseConfig.apiKey;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          apiKey: newValue,
        };
      },
    },
    authDomain: {
      get() {
        return this.innerFirebaseConfig.authDomain;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          authDomain: newValue,
        };
      },
    },
    databaseURL: {
      get() {
        return this.innerFirebaseConfig.databaseURL;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          databaseURL: newValue,
        };
      },
    },
    projectId: {
      get() {
        return this.innerFirebaseConfig.projectId;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          projectId: newValue,
        };
      },
    },
    storageBucket: {
      get() {
        return this.innerFirebaseConfig.storageBucket;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          storageBucket: newValue,
        };
      },
    },
    messagingSenderId: {
      get() {
        return this.innerFirebaseConfig.messagingSenderId;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          messagingSenderId: newValue,
        };
      },
    },
    appId: {
      get() {
        return this.innerFirebaseConfig.appId;
      },
      set(newValue) {
        this.innerFirebaseConfig = {
          ...this.innerFirebaseConfig,
          appId: newValue,
        };
      },
    },
  },
};
</script>

<style scoped></style>
