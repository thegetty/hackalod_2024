<template>
  <div class="p-receipt databox">
    <h3>Receipt</h3>

    <p>{{ transactionName }}</p>
    <p>Amount: {{ formattedCurrency }}</p>
    <p>Date: {{ transactionDate }}</p>
  </div>
</template>

<script>
export default {
  name: "ReceiptView",
  components: {},
  props: {
    activityURI: {
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
  },

  data() {
    return { lod: {} };
  },
  computed: {
    transactionName: function () {
      return this.lod?.identified_by?.at(0)?.content || "no transaction name";
    },

    transactionDate: function () {
      return (
        this.lod?.timespan?.identified_by?.at(0)?.content || "Unknown Date"
      );
    },

    formattedCurrency: function () {
      return "";
      const aatNum = this.currencyType.id.split("/").pop();
      switch (aatNum) {
        case "300411998":
          //Pound
          return `£${this.amount}`;
          break;
        case "300412016":
          //Franc
          return `${this.amount} F`;
          break;
        case "300411996":
          //Euro
          return `€${this.amount}`;
          break;
        case "300411994":
          //Dollar
          return `$${this.amount}`;
          break;
        default:
          return `${this.amount} of an unknown currency`;
      }
    },
  },
  methods: {},
};
</script>
<style lang="scss">
@import "./index";
</style>
