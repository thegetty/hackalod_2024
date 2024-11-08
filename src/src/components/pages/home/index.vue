<template>
  <div class="p-home">
    <RichText :content="markdown" />
    <ReceiptView :amount="100" />
    <div class="p-home__body-content">{{ message }}</div>
  </div>
</template>

<script>
import { RichText } from "@thegetty/getty-ui";
import ReceiptView from "@/components/organisms/receiptView/index.vue";
import markdownContent from "@/data/welcome.md";
export default {
  name: "HomePage",
  components: { RichText, ReceiptView },
  props: {
    /**
     * The path the app runs at
     */
    path: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      message: this.$t("home.welcome"),
      markdown: markdownContent,
    };
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
@import "./index";
</style>
