<template>
  <div class="p-receipt databox">
    <div class="databox_header">Receipt</div>
    <h3>{{ transactionName }}</h3>
    <hr />

    <figure
      class="p-receipt__object-image"
      v-if="presentLocationData?.object_image_url"
    >
      <img :src="presentLocationData?.object_image_url" />
      <figurecaption>
        <a
          v-if="presentLocationData.object_page_url"
          :href="presentLocationData.object_page_url"
          >Visit this object at {{ presentLocationData.present_location }}</a
        >
        <span v-else>{{ presentLocationData.present_location }}</span>
      </figurecaption>
    </figure>

    <dl>
      <dt>Date</dt>
      <dd>{{ transactionDate }}</dd>

      <dt>Artwork Title</dt>
      <dd>{{ title }}</dd>

      <dt>Buyer</dt>
      <dd>{{ buyerName }}</dd>
    </dl>
    <hr />

    <p class="cost">{{ cost }}</p>

    <hr />
    <dl class="lod_data">
      <dt>Activity URI</dt>
      <dd><a :href="activityURI" target="_blank">LOD Data</a></dd>
      <dt>Object URI</dt>
      <dd>
        <a :href="objectURI" target="_blank">{{
          objectURI.split("/").at(-1)
        }}</a>
      </dd>
      <dt>Buyer ULAN</dt>
      <dd>
        <a :href="ulan" target="_blank">ULAN Record</a>
      </dd>
    </dl>
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
    return { lod: {}, objectLOD: {}, personLOD: {} };
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
