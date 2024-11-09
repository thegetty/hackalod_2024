<template>
  <div class="p-receipt databox">
    <h3>Receipt</h3>

    <dl>
      <dt>Document</dt>
      <dd>{{ transactionName }}</dd>
      <dt>Artwork Title</dt>
      <dd>{{ title }}</dd>

      <dt>Buyer</dt>
      <dd>{{ buyerName }}</dd>
      <dt>Amount</dt>
      <dd>{{ cost }}</dd>
      <dt>Date</dt>
      <dd>{{ transactionDate }}</dd>
    </dl>
    <hr />
    <dl>
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
      return this.lod?.identified_by?.at(0)?.content || "no transaction name";
    },
    buyerName: function () {
      return getPrimaryName(this.personLOD);
    },
    title: function () {
      return getPrimaryName(this.objectLOD, {
        requestedClassifications: "http://vocab.getty.edu/aat/300417193",
      });
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
        .filter((n) => n?.type == "Payment")
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
