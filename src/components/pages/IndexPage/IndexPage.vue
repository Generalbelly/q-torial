<template>
  <div class="container">
    <div>
      <div class="basic-layout basic-layout--fv">
        <div class="fv__copy-action">
          <h1 class="has-text-weight-bold is-size-1 is-size-2-mobile">
            Product tutorial builder<br />
            for indie hackers
          </h1>
          <p class="has-margin-top-4 is-size-3 is-hidden-mobile">
            Harness the power of Firebase<br />
          </p>
          <div class="has-margin-top-5 is-hidden-mobile buttons">
            <primary-button size="is-large" @click="redirectToSignUp">
              Start free
            </primary-button>
            <base-button size="is-large">
              Try the demo
            </base-button>
          </div>
        </div>
        <div class="has-text-centered">
          <img
            class="basic-img"
            src="/img/screen.png"
          />
        </div>
        <div class="has-margin-top-5 is-hidden-tablet buttons" style="justify-content: center;">
          <primary-button size="is-large" @click="redirectToSignUp">
            Start free
          </primary-button>
          <base-button size="is-large">
            Try the demo
          </base-button>
        </div>
      </div>
      <div class="basic-layout has-text-centered">
          <h2 class="is-size-1 is-size-2-mobile has-text-weight-semibold has-margin-bottom-5">
            Host at a reasonable price
          </h2>
          <p class="is-size-4 is-size-6-mobile">
            We store tutorials in your firebase project, so that your can serve them from there.
          </p>
          <div class="has-margin-top-6">
            <img
              class="basic-img"
              src="/img/firebase-integration.png"
            />
          </div>
      </div>
      <div class="basic-layout has-text-centered">
        <h2 class="is-size-1 is-size-2-mobile has-text-weight-semibold has-margin-bottom-5">
          Build tutorials code-free
        </h2>
        <p class="is-size-4 is-size-6-mobile">
          Use Qtorial to easily build tutorials and to separate tutorial-related code from your product-related code.
        </p>
        <div class="has-margin-top-6">
          <img
            class="basic-img"
            src="/img/extension.png"
          />
        </div>
      </div>
      <div class="basic-layout has-text-centered">
        <h2 class="is-size-1 is-size-2-mobile has-text-weight-semibold has-margin-bottom-5">
          Measure effectiveness
        </h2>
        <p class="is-size-4 is-size-6-mobile">
          See how effective tutorials are. Google Analytics integration is also supported.
        </p>
        <div>
          <img
            class="basic-img"
            src="/img/measure.png"
          />
        </div>
      </div>
      <div class="basic-layout has-text-centered has-background-info">
        <h2 class="is-size-1 is-size-2-mobile has-text-weight-semibold has-margin-bottom-5">
          Pricing
        </h2>
        <base-columns>
          <base-column>
            <base-card class="has-text-centered">
              <div class="has-text-primary is-size-5">Basic Plan</div>
              <div class="is-size-2">
                Free
              </div>
              <base-level>
                <base-level-item>
                  <ul class="has-margin-top-4 has-text-left is-size-6">
                    <li>
                      Code-free tutorials builder
                    </li>
                    <li>
                      Unlimited number of tutorials
                    </li>
                    <li>
                      Multi-pages tutorials
                    </li>
                    <li>
                      Performance report
                    </li>
                    <li>
                      Google Analytics Integration
                    </li>
                    <li>
                      Email support
                    </li>
                  </ul>
                </base-level-item>
              </base-level>
            </base-card>
          </base-column>
          <base-column>
            <base-card class="has-text-centered has-background-grey" style="height: 100%;">
              <div class="is-size-5 has-text-grey-light">Advanced Plan</div>
              <div class="has-margin-top-6 is-size-2 has-text-grey-light">Coming soon</div>
            </base-card>
          </base-column>
        </base-columns>
        <div class="has-text-centered">
          <p>
            Cloud Firestore, Cloud Functions, Storage &amp; SLA are determined by your Firebase plan.<br />
            Remember, You need a Firebase* project to hook Qtorial up to. For more on Firebase pricing check out:<br />
            <a href="https://firebase.google.com/pricing">https://firebase.google.com/pricing</a><br /><br />
            *Firebase plan limitations apply
          </p>
        </div>
      </div>
      <div class="has-margin-6 has-text-centered">
        <primary-button size="is-large" @click="redirectToSignUp">
          Start free now !
        </primary-button>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import BaseColumns from '../../atoms/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn';
import BaseButton from '../../atoms/BaseButton';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import BaseCard from '../../molecules/BaseCard';
import BaseLevel from '../../atoms/BaseLevel/BaseLevel';
import BaseLevelItem from '../../atoms/BaseLevelItem/BaseLevelItem';
import TheFooter from '../../organisms/global/TheFooter/TheFooter';

export default {
  name: 'IndexPage',
  components: {
    TheFooter,
    BaseLevelItem,
    BaseLevel,
    BaseCard,
    PrimaryButton,
    BaseButton,
    BaseColumn,
    BaseColumns,
  },
  data() {
    return {
      monthlyActiveUsers: 0,
    };
  },
  methods: {
    calculateBasicPrice(value) {
      if (value === 0) {
        return 25;
      }
      if (value <= 1000) {
        return 55;
      }
      if (value <= 5000) {
        return 99;
      }
      if (value <= 10000) {
        return 149;
      }
      if (value <= 20000) {
        return 199;
      }
      return 199;
    },
    commaSeparationFormatter(value) {
      return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    },
    async redirectToSignUp() {
      await this.$router.push({
        name: 'sign-up',
      });
    },
  },
};
</script>

<style scoped>
  .basic-layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 2rem 1rem;
  }
  .basic-layout--fv {
    grid-template-columns: 1fr 1fr;
    padding: 2.5rem 3rem 2rem;
  }
  .basic-layout--fv .fv__copy-action {
    margin-top: 20px;
  }
  .basic-img {
    max-width: 600px;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    .basic-layout {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      padding: 1rem;
    }
    .basic-layout div {
      text-align: center;
    }
    .basic-img {
      margin-top: 2rem;
    }
    .basic-layout .buttons {
      flex-wrap: nowrap;
    }
    .basic-layout div.has-margin-top-6 {
      margin-top: 10px !important;
    }
    .basic-layout--fv .fv__copy-action {
      margin-top: 0 !important;
    }
  }
</style>
