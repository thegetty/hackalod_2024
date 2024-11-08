<template>
  <div class="p-receipt">
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
    amount: {
      type: Number,
      default: 0,
    },
    lod: {
      type: Object,
      default(rawProps) {
        return {
          id: "https://data.getty.edu/provenance/9c928dd2-af94-3406-819b-5b9380a7b44f",
          identified_by: [
            {
              content: "Knoedler Sale of Stock Number A4468 (1952-02-06)",
              id: "https://data.getty.edu/provenance/9c928dd2-af94-3406-819b-5b9380a7b44f/tile/14fc7848-b78c-4b9e-a222-f321e3cc945a/node/493fde82-bba5-11ea-ad92-3af9d3b32b71",
              type: "Name",
            },
          ],
          timespan: {
            _label: "1952-02-06",
            begin_of_the_begin: "1952-02-06T00:00:00Z",
            end_of_the_end: "1952-02-07T23:59:59Z",
            id: "https://data.getty.edu/provenance/9c928dd2-af94-3406-819b-5b9380a7b44f/tile/5b5fd836-78f3-4756-a6e4-d2e5a2b0e5d9/node/b7641465-0cd2-11ec-ba15-0a9473e82189",
            identified_by: [
              {
                content: "1952-02-06",
                id: "https://data.getty.edu/provenance/9c928dd2-af94-3406-819b-5b9380a7b44f/tile/710d0ba4-6ca1-45d0-a973-2e67554bd120/node/b7641468-0cd2-11ec-ba15-0a9473e82189",
                type: "Name",
              },
            ],
            type: "TimeSpan",
          },
        };
      },
    },
    currencyType: {
      type: Object,
      default(rawProps) {
        return { id: "http://vocab.getty.edu/aat/300411994" };
      },
    },
  },
  data() {
    return {
      message: this.$t("home.welcome"),
    };
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
