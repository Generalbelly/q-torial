<template>
  <div>
    <p class="has-padding-3">Copy and paste this code into the &lt;HEAD&gt; of a webpage you want to show tutorials.</p>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Standard">
        <textarea
          id="tag"
          @click="$event.target.select()"
          readonly
          rows="3"
          cols="80"
          class="textarea"
        ><script>(function(w,d,s,o,i){if(!w[o]){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='{{ url }}';j.onload=function(){w[o].init(i);};f.parentNode.insertBefore(j,f);}})(window,document,'script','Qtorial','{{ user.firebaseConfig.uid }}')</script></textarea>
        <b-tooltip
          type="is-black"
          :active="copiedInClipboard"
          label="Copied!"
          position="is-bottom"
          animated
        >
          <base-button
            id="copy-in-clipboard"
            class="has-margin-top-4"
            data-clipboard-target="#tag"
            @mouseenter="copiedInClipboard = false"
          >
            Copy to clipboard
          </base-button>
        </b-tooltip>
      </b-tab-item>
      <b-tab-item label="Custom">
        <textarea
          id="tag-custom"
          @click="$event.target.select()"
          readonly
          rows="3"
          cols="80"
          class="textarea"
        ><script>(function(w,d,s,o,i,c){if(!w[o]){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='{{ url }}';j.onload=function(){w[o].init(i,c);};f.parentNode.insertBefore(j,f);}})(window,document,'script','Qtorial','{{ user.firebaseConfig.uid }}', YOUR_CUSTOMER_ID)</script></textarea>
        <p class="has-margin-top-3">
          Use this code if you would like to associate data with your user data. Replace YOUR_CUSTOMER_ID in the code with your actual user id.
        </p>
        <b-tooltip
          type="is-black"
          :active="copiedInClipboard"
          label="Copied!"
          position="is-bottom"
          animated
        >
          <base-button
            id="copy-in-clipboard"
            class="has-margin-top-4"
            data-clipboard-target="#tag-custom"
            @mouseenter="copiedInClipboard = false"
          >
            Copy to clipboard
          </base-button>
        </b-tooltip>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import BaseButton from '../../atoms/BaseButton';
import UserEntity from '../../atoms/Entities/UserEntity';
import { getUserFirebaseService } from '../../../firebase';

export default {
  name: 'TagTemplate',
  components: {
    BaseButton,
  },
  props: {
    user: {
      type: Object,
      default() {
        return new UserEntity();
      },
    },
  },
  data() {
    return {
      copiedInClipboard: false,
      url: `https://storage.googleapis.com/${this.user.firebaseConfig.storageBucket}/js/q-torial.js`,
      activeTab: null,
    };
  },
  created() {
    const clipboard = new ClipboardJS('#copy-in-clipboard');
    clipboard.on('success', this.onCopySuccess);
  },
  async mounted() {
    await getUserFirebaseService(this.user.firebaseConfig).updateAssets();
  },
  methods: {
    onCopySuccess() {
      this.copiedInClipboard = true;
    },
  },
};
</script>

<style scoped>
  .textarea {
    font-family: courier new,courier,serif;
    font-size: 12px;
    max-width: 800px;
    overflow: auto;
    resize: none;
    user-select: all;
  }
</style>
