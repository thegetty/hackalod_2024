<template>
  <div class="p-home">
    <div class="hammer-holder">
      <img src="@/assets/hammer.png" class="p-hammer" />
      <p>SOLD!</p>
    </div>
    <SearchBox @searchUpdate="handleSearchUpdate" />
    <div class="text_holder">
      <RichText :content="markdown" />
    </div>
    <hr />
    <ReceiptView :activityURI="activityURI" />
    <ObjectView :lodURL="objectURI" />
    <PersonView :lodURL="personURI" />
    <div class="p-home__body-content">{{ message }}</div>
  </div>
</template>

<script>
import { RichText } from "@thegetty/getty-ui";
import SearchBox from "@/components/molecules/searchBox/index.vue";
import PersonView from "@/components/organisms/personView/index.vue";
import ReceiptView from "@/components/organisms/receiptView/index.vue";
import ObjectView from "@/components/organisms/objectView/index.vue";
import markdownContent from "@/data/welcome.md";

export default {
  name: "HomePage",
  components: { RichText, ReceiptView, ObjectView, PersonView, SearchBox },
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
      lunrIndex: undefined,
      documents: [
        {
          name: "Lunr",
          text: "Like Solr, but much smaller, and not as bright.",
        },
        {
          name: "React",
          text: "A JavaScript library for building user interfaces.",
        },
        {
          name: "Lodash",
          text: "A modern JavaScript utility library delivering modularity, performance & extras.",
        },
      ],
      objectURI: undefined,
      activityURI: undefined,
      personURI: undefined,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleSearchUpdate(e) {
      console.log("e", e.buyer_uri);
      this.activityURI = e.activity_uri;
      this.objectURI = e.object_uri;
      this.personURI = e.buyer_uri;
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
