<template>
  <div>
    <the-navbar
      v-if="userEntity && userEntity.emailVerified"
      :navItems="navItems"
      @click:sign-out="signOut"
    ></the-navbar>
    <!--        <nav-->
    <!--            class="navbar is-spaced has-shadow"-->
    <!--            role="navigation"-->
    <!--            aria-label="main navigation"-->
    <!--        >-->
    <!--            <div class="container" v-if="user">-->
    <!--                <div class="navbar-brand">-->
    <!--                    <span class="navbar-item">-->
    <!--                        <logo></logo>-->
    <!--                    </span>-->
    <!--                    <a-->
    <!--                        role="button"-->
    <!--                        class="navbar-burger burger"-->
    <!--                        :class="{'is-active': burgerMenuActive}"-->
    <!--                        aria-label="menu"-->
    <!--                        aria-expanded="false"-->
    <!--                        @click="burgerMenuActive = !burgerMenuActive"-->
    <!--                    >-->
    <!--                        <span aria-hidden="true"></span>-->
    <!--                        <span aria-hidden="true"></span>-->
    <!--                        <span aria-hidden="true"></span>-->
    <!--                    </a>-->
    <!--                </div>-->

    <!--                <div-->
    <!--                    class="navbar-menu"-->
    <!--                    :class="{'is-active': burgerMenuActive}"-->
    <!--                >-->
    <!--                    <div class="navbar-start">-->
    <!--                        <router-link-->
    <!--                            :class="navItemClass('/projects')"-->
    <!--                            :to="{ name : 'projects.index'}"-->
    <!--                        >-->
    <!--                            <b-icon icon="book" class="has-text-primary" size="is-small"></b-icon>-->
    <!--                            <span>Projects</span>-->
    <!--                        </router-link>-->
    <!--                        <router-link-->
    <!--                            :class="navItemClass('/tags')"-->
    <!--                            :to="{ name : 'tags.show', params: { id: userKey }}"-->
    <!--                        >-->
    <!--                            <code-icon size="is-small"></code-icon>-->
    <!--                            <span>Your tag</span>-->
    <!--                        </router-link>-->
    <!--                    </div>-->

    <!--                    <div class="navbar-end has-text-centered-mobile">-->
    <!--                        <a-->
    <!--                            class="navbar-item"-->
    <!--                            @click="signout"-->
    <!--                        >-->
    <!--                            <b-icon icon="sign-out-alt" size="is-small"></b-icon>-->
    <!--                            <span>Sign out</span>-->
    <!--                        </a>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div v-else class="container">-->
    <!--                <div class="navbar-brand">-->
    <!--                    <span class="navbar-item">-->
    <!--                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">-->
    <!--                    </span>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </nav>-->
    <the-main
      class="has-padding-5"
    >
      <router-view></router-view>
    </the-main>

    <!--<extension-install-banner class="banner has-background-white-ter" v-if="showExtensionLink"></extension-install-banner>-->

    <!--<footer class="footer">-->
    <!--<div class="content has-text-centered">-->
    <!--<p>-->
    <!--&copy; 2018 Omotenashi-->
    <!--</p>-->
    <!--</div>-->
    <!--</footer>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import firebase from './firebase';
import { UNAUTHORIZED_401, UNAUTHORIZED_419, INTERNAL_SERVER_ERROR } from './utils/constants';
// import ExtensionInstallBanner from './components/organisms/ExtensionInstallBanner';
import CodeIcon from './components/atoms/icons/CodeIcon';
import chromeExtension from './chromeExtension';
import Logo from './components/atoms/BaseLogo';
import TheNavbar from './components/organisms/global/TheNavbar';
import TheMain from './components/organisms/global/TheMain';

export default {
  name: 'App',
  components: {
    TheMain,
    TheNavbar,
    Logo,
    CodeIcon,
    // ExtensionInstallBanner,
  },
  data() {
    return {
      showExtensionLink: false,
      navItems: [
        {
          icon: 'book',
          iconClass: 'has-text-primary',
          text: 'Projects',
          to: { name: 'projects.index' },
        },
        {
          icon: 'book',
          iconClass: 'has-text-primary',
          text: 'Tag',
          to: { name: 'tags.show', params: { id: this.userKey } },
        },
      ],
      mainMinHeight: '',
    };
  },
  computed: {
    ...mapState([
      'errorCode',
      'serverSideErrors',
      'userEntity',
    ]),
    ...mapGetters([
      'userKey',
    ]),
  },
  watch: {
    serverSideErrors() {
      if (this.serverSideErrors.general) {
        return this.showSnackbar(this.serverSideErrors.general);
      }
      return [];
    },
  },
  mounted() {
    this.checkIfExtensionInstalled();
  },
  methods: {
    checkIfExtensionInstalled() {
      chromeExtension.getVersion()
        .then((response) => {
          this.showExtensionLink = !!response;
        });
    },
    showSnackbar(message = 'Oops! Something went wrong.') {
      this.$snackbar.open({
        position: 'is-top',
        type: 'is-warning',
        message,
      });
    },
    signOut(e) {
      console.log('call from App.vue', e);
      firebase.signOut().then(() => {
        this.$router.push({
          name: 'sign-in',
        });
      });
    },
  },
};
</script>

<style scoped>
  .banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
