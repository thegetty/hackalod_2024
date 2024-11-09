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
        :presentLocationData="presentLocationData"
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
      presentLocationData: {},
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleSearchUpdate(e) {
      this.presentLocationData = {};
      this.activityURI = e.activity_uri;
      this.objectURI = e.object_uri;
      this.personURI = e.buyer_uri;
      this.buyerImage = e.buyer_wiki_image_url;
      this.artistImage = e.artist_wiki_image_url;

      this.presentLocationData.present_location = e.present_location;
      if (e.object_image_url) {
        this.presentLocationData.object_image_url = e.object_image_url;
      }
      if (e.museum_title) {
        this.presentLocationData.museum_title = e.museum_title;
      }
      if (e.object_page_url) {
        this.presentLocationData.object_page_url = e.object_page_url;
      }
    },
  },
};
</script>
<style lang="scss">
@import "./index";
</style>
