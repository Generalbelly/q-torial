<template>
  <div class="has-text-centered">
    <section class="section">
      <h1 class="is-size-3 has-margin-bottom-3">
        Notation based on the Specified Commercial Transaction Act
      </h1>
      <span>特定商取引法に基づく表記</span>
    </section>
    <base-level>
      <base-level-item>
        <table class="table is-bordered">
          <tbody>
          <tr>
            <th>Seller</th>
            <td>Nobuyoshi Shimmen</td>
          </tr>
          <tr>
            <th>Operating Officer</th>
            <td>Nobuyoshi Shimmen</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>Higashiogu 1-21-6, Arakawa-ku, Tokyo 116-0012, Japan</td>
          </tr>
          <tr>
            <th>Contact</th>
            <td>
              <ul>
                <li>Email: support@q-torial.ap</li>
                <li>Tel: +817040874039</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Payment Methods</th>
            <td>Credit Card</td>
          </tr>
          <tr>
            <th>Delivery Time</th>
            <td>We will offer the Service as soon as the payment transaction becomes complete.</td>
          </tr>
          <tr>
            <th>Cancelling / Returning of Product(s)</th>
            <td>
              In principle, order cancellations and product returns or exchange are not accepted
            </td>
          </tr>
          <tr>
            <th>Supported platforms</th>
            <td>
              <ul>
                <li>MacOS: Latest version of Google Chrome</li>
                <li>WindowOS: Latest version of Google Chrome</li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </base-level-item>
    </base-level>
    <the-footer class="footer--notation" />
  </div>
</template>

<script>

import BaseLevel from '../../atoms/BaseLevel';
import BaseLevelItem from '../../atoms/BaseLevelItem';
import TheFooter from '../../organisms/global/TheFooter/TheFooter';

export default {
  name: 'NotationPage',
  components: {
    TheFooter,
    BaseLevelItem,
    BaseLevel,
  },
};
</script>

<style scoped>
  .footer--notation {
    position: fixed; bottom: 0; left: 0; right: 0px;
  }
</style>
