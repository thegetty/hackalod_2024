<template>
  <div class="p-receipt databox">
    <!-- <div class="databox_header">Receipt</div> -->
    <h3 class="p-receipt__transaction-header">{{ transactionName }}</h3>
    <h3 class="p-receipt__transaction-header">{{ title }}</h3>
    <hr />

    <figure
      class="p-receipt__object-image"
      v-if="presentLocationData?.object_image_url"
    >
      <img :src="presentLocationData?.object_image_url" />
      <figcaption>
        <a
          v-if="presentLocationData.object_page_url"
          :href="presentLocationData.object_page_url"
          >Visit this object at {{ presentLocationData.present_location }}</a
        >
        <span v-else>{{ presentLocationData.present_location }}</span>
      </figcaption>
    </figure>

    <div class="p-receipt__metadata">
      <dl>
        <dt>Purchase Date</dt>
        <dd>{{ transactionDate }}</dd>

        <dt>Buyer</dt>
        <dd>{{ buyerName }}</dd>
      </dl>
      <hr />

      <p class="cost">{{ cost }}</p>
      <p class="current_cost">{{ currentPrice }} in 2024</p>

      <hr />
      <dl class="lod_data">
        <dt>Activity URI</dt>
        <dd class="uri_display">
          <a :href="activityURI" target="_blank">{{
            activityURI?.split("/").at(-1)
          }}</a>
        </dd>
        <dt>Object URI</dt>
        <dd class="uri_display">
          <a :href="objectURI" target="_blank">{{
            objectURI?.split("/").at(-1)
          }}</a>
        </dd>
        <dt>Buyer ULAN</dt>
        <dd class="uri_display">
          <a :href="ulan" target="_blank">{{ ulan?.split("/").at(-1) }}</a>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import {
  getClassifiedAs,
  getAccessionNumbers,
  getPrimaryName,
} from "@thegetty/linkedart.js";
export default {
  name: "ReceiptView",
  components: {},
  props: {
    activityURI: {
      type: String,
    },
    objectURI: {
      type: String,
    },
    personURI: {
      type: String,
    },
    presentLocationData: {
      type: Object,
    },
  },
  watch: {
    amount: {
      handler: async function (newAmount) {
        if (!newAmount) return;
        if (!this.transactionDate) return;
        let date_parts = this.transactionDate?.split("-");
        let year = date_parts.shift();
        let month = date_parts.shift() || 1;
        let day = date_parts.shift() || 1;
        console.log(date_parts, year, month, day);
        let statURL = `https://www.statbureau.org/calculate-inflation-price-json?country=united-states&start=${year}%2F${month}%2F${day}&end=2024%2F11%2F09&amount=${newAmount}&format=false`;
        const response = await fetch(statURL);
        const rawPrice = await response.json();

        this.currentPrice = this.formattedCurrency(
          Math.floor(rawPrice),
          this.currency
        );
      },
    },
    activityURI: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        const response = await fetch(newURL);
        this.lod = await response.json();
      },
    },
    objectURI: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        const response = await fetch(newURL);
        this.objectLOD = await response.json();
      },
    },
    personURI: {
      immediate: true,
      handler: async function (newURL) {
        if (!newURL) return;
        const response = await fetch(newURL);
        this.personLOD = await response.json();
      },
    },
  },

  data() {
    return { lod: {}, objectLOD: {}, personLOD: {}, currentPrice: undefined };
  },
  computed: {
    transactionName: function () {
      return (
        this.lod?.identified_by?.at(0)?.content?.replace("Knoedler ", "") ||
        "no transaction name"
      );
    },
    buyerName: function () {
      return getPrimaryName(this.personLOD);
    },
    title: function () {
      let _title = getPrimaryName(this.objectLOD, {
        requestedClassifications: "http://vocab.getty.edu/aat/300417193",
      });
      if (this.presentLocationData && this.presentLocationData?.museum_title) {
        _title = this.presentLocationData?.museum_title;
      }
      return _title;
    },
    ulan: function () {
      return this.personLOD["skos:exactMatch"]?.id;
    },
    transactionDate: function () {
      return (
        this.lod?.timespan?.identified_by?.at(0)?.content || "Unknown Date"
      );
    },
    amount: function () {
      return this.lod?.part?.filter((n) => n?.type == "Payment")?.at(0)
        ?.paid_amount?.value;
    },
    currency: function () {
      return this.lod?.part?.filter((n) => n?.type == "Payment")?.at(0)
        ?.paid_amount?.currency?.id;
    },
    cost: function () {
      const paymentLOD = this.lod?.part
        ?.filter((n) => n?.type == "Payment")
        ?.at(0)?.paid_amount;
      //return paymentLOD;
      return this.formattedCurrency(
        paymentLOD?.value,
        paymentLOD?.currency?.id
      );
    },
  },
  methods: {
    formattedCurrency: function (amount, currencyAAT) {
      const aatNum = currencyAAT?.split("/").pop();
      // return aatNum;
      switch (aatNum) {
        case "300411998":
          //Pound
          return `£${amount.toLocaleString()}`;
          break;
        case "300412016":
          //Franc
          return `${amount.toLocaleString()} F`;
          break;
        case "300411996":
          //Euro
          return `€${amount.toLocaleString()}`;
          break;
        case "300411994":
          //Dollar
          return `$${amount.toLocaleString()}`;
          break;
        default:
          return `${amount} of an unknown currency`;
      }
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
