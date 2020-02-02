<template>
  <instruction-template
    :loading="requesting"
    :support-email="supportEmail"
    @click:done="onClickDone"
  />
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import axios from 'axios';
import InstructionTemplate from '../../templates/InstructionTemplate';
import { getUserFirebaseService } from '../../../firebase';
import UserEntity from '../../atoms/Entities/UserEntity';

export default {
  name: 'InstructionPage',
  components: {
    InstructionTemplate,
  },
  data() {
    return {
      supportEmail: process.env.VUE_APP_CONTACT_EMAIL,
    };
  },
  computed: {
    ...mapGetters([
      'setupComplete',
      'firebaseConfig',
    ]),
    ...mapState([
      'user',
      'requesting',
    ]),
    ...mapState('tutorial', [
      'repositoryReady',
    ]),
  },
  watch: {
    setupComplete: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$router.push({
            name: 'tutorials.index',
          });
        }
      },
    },
  },
  methods: {
    ...mapActions([
      'setServerSideErrors',
      'setRequesting',
      'updateUser',
    ]),
    ...mapActions('tutorial', [
      'testTutorial',
    ]),
    async onClickDone() {
      // Firestore, Storageはローケーションの選択が必須
      // Cloud Functionsはus-central1でデプロイされるよう
      const results = await Promise.all([
        this.validateCloudFunctions(),
        this.validateFirestore(),
        this.validateCloudStorage(),
      ]);
      if (!results.every(result => result.valid)) {
        await this.setServerSideErrors({
          general: results.reduce((acc, cv) => {
            if (cv.valid) return acc;
            return `${acc}${cv.message}<br />`;
          }, ''),
        });
        return;
      }
      try {
        await this.setRequesting(true);
        await this.updateUser(new UserEntity({
          ...this.user,
          setupComplete: true,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        await this.setRequesting(false);
      }
    },
    async validateCloudFunctions() {
      let valid = false;
      let message = 'It looks like that Cloud Function hasn\'t been correctly set up.';
      try {
        await axios.post(
          `https://us-central1-${this.firebaseConfig.projectId}.cloudfunctions.net/getTutorial`,
          {},
        );
      } catch (error) {
        const { response } = error;
        if (response) {
          const { status } = response;
          if (status === 422) {
            valid = true;
            message = 'ok';
          }
        }
      }
      return {
        valid,
        message,
      };
    },
    async validateFirestore() {
      if (!this.repositoryReady) {
        return {
          valid: false,
          message: 'Unknown error occurred, Please contact us by email.',
        };
      }
      let valid = false;
      let message = 'It looks like that Firestore hasn\'t been correctly set up.';
      try {
        await this.testTutorial();
      } catch (error) {
        if (error.name === 'FirebaseError' && error.message === 'Missing or insufficient permissions.') {
          valid = true;
          message = 'ok';
        }
      }
      return {
        valid,
        message,
      };
    },
    async validateCloudStorage() {
      let valid = true;
      let message = 'ok';
      try {
        await getUserFirebaseService(this.firebaseConfig).updateAssets();
      } catch (error) {
        valid = false;
        message = 'It looks like that Cloud Storage hasn\'t been correctly set up.';
      }
      return {
        valid,
        message,
      };
    },
  },
};
</script>

<style scoped>
</style>
