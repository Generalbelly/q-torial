<template>
  <div>
    <centering-layout>
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
              Follow the instruction of this <a href="https://github.com/Qtorial/firebase">repository</a> to complete the setup.
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
            If you encounter any problem, feel free to contact us by email: <span class="has-text-grey-darker">{{ supportEmail }}</span>
          </div>
        </div>
      </template>
    </centering-layout>
    <base-loading is-full-page :active="loading" />
  </div>
</template>

<script>
import CenteringLayout from '../../molecules/layouts/CenteringLayout';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import BaseSubHeading from '../../atoms/BaseSubHeading';
import BaseLoading from '../../atoms/BaseLoading';

export default {
  name: 'InstructionTemplate',
  components: {
    BaseLoading,
    BaseSubHeading,
    PrimaryButton,
    CenteringLayout,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    supportEmail: {
      type: String,
      default: null,
    },
  },
  methods: {
    onClickDone() {
      this.$emit('click:done');
    },
  },
};
</script>

<style scoped>

</style>
