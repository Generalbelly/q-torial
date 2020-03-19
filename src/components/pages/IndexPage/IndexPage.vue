<template>
  <div class="container">
    <section class="section">
      <base-columns>
        <base-column class="is-flex">
          <h1 class="has-text-weight-bold" style="font-size: 60px;">
            Tutorial builder for indie hackers
          </h1>
          <p class="has-margin-top-4 is-size-3">
            Seamlessly integrates with Firebase<br />
          </p>
          <div class="has-margin-top-6 buttons">
            <primary-button size="is-large">
              Start free
            </primary-button>
            <base-button size="is-large">
              Try the demo
            </base-button>
          </div>
<!--          <span class="is-siz-5">-->
<!--            Risk free 14-day trial • Cancel anytime-->
<!--          </span>-->
        </base-column>
        <base-column>
          <img src="/img/screen.png" />
        </base-column>
      </base-columns>
    </section>
    <section class="section">
      <base-columns>
        <base-column>
          <img src="/img/welcome.png" />
        </base-column>
        <base-column class="is-flex">
          <h2 class="is-size-1 has-text-weight-semibold has-margin-bottom-5">
            Build tutorials code-free
          </h2>
          <p class="is-size-4">
            Use Qtorial to easily build tutorials and to separate tutorial-related code from your product-related code.
          </p>
        </base-column>
      </base-columns>
      <base-columns>
        <base-column class="is-flex">
          <h2 class="is-size-1 has-text-weight-semibold has-margin-bottom-5">
            Host tutorials at almost no cost or reasonable price
          </h2>
          <p class="is-size-4">
            We store tutorials you build in your firebase project, so that your can serve them from there.
          </p>
        </base-column>
        <base-column>
          <img src="/img/firebase-integration.png" />
        </base-column>
      </base-columns>
      <base-columns>
        <base-column>
          <img src="/img/measure.png" />
        </base-column>
        <base-column class="is-flex">
          <h2 class="is-size-1 has-text-weight-semibold has-margin-bottom-5">
            Measure effectiveness
          </h2>
          <p class="is-size-4">
            See how effective tutorials are.<br />
            Google Analytics integration is also supported.
          </p>
        </base-column>
      </base-columns>
    </section>
    <section class="section has-background-info">
      <p class="has-padding-top-3 has-text-centered is-size-1 has-text-weight-semibold  has-text-grey">
        Pricing
      </p>
      <base-columns class="has-padding-y-5">
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
                    Multipage tutorials
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
<!--            <div class="is-size-2">-->
<!--              ???<span class="is-size-7">/Mo</span>-->
<!--            </div>-->
            <div class="has-margin-top-6 is-size-2 has-text-grey-light">Coming soon</div>
          </base-card>
        </base-column>
<!--        <base-column>-->
<!--          <base-card class="has-text-centered">-->
<!--            <div class="label is-size-5 has-padding-bottom-4">{{ commaSeparationFormatter(monthlyActiveUsers) }} Monthly Active Users</div>-->
<!--            <base-slider-->
<!--              size="is-medium"-->
<!--              :min="0"-->
<!--              :max="20000"-->
<!--              v-model="monthlyActiveUsers"-->
<!--              :items="[1000, 2500, 5000, 10000, 20000]"-->
<!--            />-->
<!--            <div class="has-margin-top-5 is-size-2">-->
<!--              ${{ calculateBasicPrice(monthlyActiveUsers) }}-->
<!--              <span class="is-size-6">-->
<!--                /Mo-->
<!--              </span>-->
<!--            </div>-->
<!--            <ul class="has-margin-top-4">-->
<!--              <li>-->
<!--                Code-free tutorials builder-->
<!--              </li>-->
<!--              <li>-->
<!--                Unlimited number of tutorials-->
<!--              </li>-->
<!--              <li>-->
<!--                Tutorials performance reporting-->
<!--              </li>-->
<!--              <li>-->
<!--                Google Analytics Integration-->
<!--              </li>-->
<!--              <li>-->
<!--                Email support-->
<!--              </li>-->
<!--            </ul>-->
<!--            <p class="has-margin-top-4 help">-->
<!--              Do you have more than 20,000 users?-->
<!--              Contact us for a customized Enterprise plan-->
<!--            </p>-->
<!--          </base-card>-->
<!--        </base-column>-->
      </base-columns>
      <div class="has-text-centered">
        <p>
          Cloud Firestore, Cloud Functions, Storage &amp; SLA are determined by your Firebase plan.<br />
          Remember, You need a Firebase* project to hook Qtorial up to. For more on Firebase pricing check out:<br />
          <a href="https://firebase.google.com/pricing">https://firebase.google.com/pricing</a><br /><br />
          *Firebase plan limitations apply
        </p>
      </div>
    </section>
    <section class="has-text-centered section">
<!--      <p class="has-padding-top-3 has-text-centered is-size-1 has-text-weight-semibold has-margin-bottom-5">30 Days Money-Back Guarantee</p>-->
<!--      <p>Try Qtorial for free up to 14 Days now!</p>-->
      <div class="has-margin-5">
        <primary-button size="is-large">
          Start free now !
        </primary-button>
      </div>
    </section>
    <the-footer />
  </div>
</template>

<script>

import BaseColumns from '../../atoms/BaseColumns';
import BaseColumn from '../../atoms/BaseColumn';
import BaseButton from '../../atoms/BaseButton';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import BaseCard from '../../molecules/BaseCard';
import BaseSlider from '../../molecules/BaseSlider';
import BaseLevel from '../../atoms/BaseLevel/BaseLevel';
import BaseLevelLeft from '../../atoms/BaseLevelLeft/BaseLevelLeft';
import BaseLevelRight from '../../atoms/BaseLevelRight/BaseLevelRight';
import BaseLevelItem from '../../atoms/BaseLevelItem/BaseLevelItem';
import TheFooter from '../../organisms/global/TheFooter/TheFooter';

export default {
  name: 'IndexPage',
  components: {
    TheFooter,
    BaseLevelItem,
    BaseLevelRight,
    BaseLevelLeft,
    BaseLevel,
    BaseSlider,
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
  },
};
</script>

<style scoped>
  .columns > .column {
    justify-content: center;
    flex-direction: column;
  }
  .section {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .section:nth-child(1) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  @media only screen and (max-width: 600px) {
    .section {
      padding-left: 2rem;
      padding-right: 2rem;
    }
    .section:nth-child(1) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .section:nth-child(1) .buttons .button {
      width: 100%;
      margin-right: 0;
    }
  }
</style>
