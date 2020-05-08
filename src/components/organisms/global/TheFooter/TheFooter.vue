<template>
  <footer class="footer has-text-centered">
    <div class="link-container">
      <router-link to="/terms-of-service">
        Terms Of Service
      </router-link>
      <router-link to="/privacy-policy">
        Privacy Policy
      </router-link>
      <router-link to="/notation">
        Notation based on the Specified Commercial Transaction Act
      </router-link>
    </div>
    <span class="has-margin-top-6 is-inline-block">© 2020 Qtorial</span>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>
<style scoped>
.footer .link-container a {
  border-right: 1px #FF8CBA solid;
  padding: 0 15px;
}
.footer .link-container a:last-of-type {
  border-right: none;
}
@media only screen and (max-width: 768px) {
  .footer .link-container a {
    border-right: none;
    padding-right: unset;
  }
  .link-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
