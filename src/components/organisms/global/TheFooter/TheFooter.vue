<template>
  <footer class="container has-padding-y-5">
    <base-level>
      <base-level-left>
        <base-level-item>f
          <router-link to="/privacy-policy">Terms Of Service</router-link>
        </base-level-item>
        <base-level-item>
          <router-link to="/privacy-policy">Privacy Policy</router-link>
        </base-level-item>
        <base-level-item>
          <router-link to="/notation">Notation based on the Specified Commercial Transaction Act</router-link>
        </base-level-item>
      </base-level-left>
      <base-level-right>
        © 2020 Qtorial
      </base-level-right>
    </base-level>
  </footer>
</template>

<script>

import BaseLevelItem from '../../../atoms/BaseLevelItem/BaseLevelItem';
import BaseLevelRight from '../../../atoms/BaseLevelRight/BaseLevelRight';
import BaseLevelLeft from '../../../atoms/BaseLevelLeft/BaseLevelLeft';
import BaseLevel from '../../../atoms/BaseLevel/BaseLevel';

export default {
  name: 'TheFooter',
  components: {
    BaseLevelItem,
    BaseLevelRight,
    BaseLevelLeft,
    BaseLevel,
  },
};
</script>
<style></style>
