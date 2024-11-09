<template>
  <div class="p-home">
    <div class="p-home__header">
      <img src="@/assets/hammer.png" class="p-hammer" />
      <p>SOLD!</p>
    </div>
    <SearchBox @searchUpdate="handleSearchUpdate" />
    <div class="p-home__description">
      <RichText :content="markdown" />
    </div>
    <hr />
    <div class="categories" v-if="activityURI">
      <ReceiptView
        :activityURI="activityURI"
        :objectURI="objectURI"
        :personURI="personURI"
      />
      <PersonView :personURI="personURI" :buyerImage="buyerImage" />
      <ArtistView :lodURL="objectURI" :artistImage="artistImage" />
    </div>
  </div>
</template>

<script>
import { RichText } from "@thegetty/getty-ui";
import SearchBox from "@/components/molecules/searchBox/index.vue";
import PersonView from "@/components/organisms/personView/index.vue";
import ReceiptView from "@/components/organisms/receiptView/index.vue";
import ArtistView from "@/components/organisms/artistView/index.vue";
import markdownContent from "@/data/welcome.md";

export default {
  name: "HomePage",
  components: { RichText, ReceiptView, ArtistView, PersonView, SearchBox },
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
      buyerImage: undefined,
      artistImage: undefined,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleSearchUpdate(e) {
      console.log("e.artist_wiki_image_url;", e.artist_wiki_image_url);
      this.activityURI = e.activity_uri;
      this.objectURI = e.object_uri;
      this.personURI = e.buyer_uri;
      this.buyerImage = e.buyer_wiki_image_url;
      this.artistImage = e.artist_wiki_image_url;
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
