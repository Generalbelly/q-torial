<template>
    <tag-template
      :user="user"
    >
    </tag-template>
</template>

<script>
import { mapState } from 'vuex';
import TagTemplate from '../../templates/TagTemplate';
import { getUserFirebaseService } from '../../../firebase';

export default {
  name: 'TagPage',
  components: {
    TagTemplate,
  },
  computed: {
    ...mapState([
      'user',
    ]),
  },
  async mounted() {
    let valid = true;
    let message = 'ok';
    try {
      await getUserFirebaseService(this.user.firebaseConfig).updateAssets();
    } catch (error) {
      valid = false;
      message = 'It looks like that Cloud Storage hasn\'t been correctly set up.';
    }
    return {
      valid,
      message,
    };
  }
};
</script>

<style scoped>
</style>
