<template>
  <div class="l-base__wrapper">
    <Hero name="Content" :data="heroData" />
    <div class="l-base__intro gui-container">
      <RichText :content="markdown" />
    </div>
    <section>
      <!-- note: container is a getty-ui class that adds the page gutter -->
      <div class="gui-container">
        <router-view :path="path" />
      </div>
    </section>
  </div>
</template>

<script>
import { Hero, RichText } from "@thegetty/getty-ui";
import "@thegetty/getty-ui/dist/getty-ui.css";
import markdownContent from "@/data/intro.md?raw";

export default {
  name: "LayoutBase",
  components: { Hero, RichText },
  props: {
    /** * The path the app runs at */ path: { type: String, default: "/" },
  },
  data: function () {
    return {
      markdown: markdownContent,
      heroData: {
        title: this.$t("base.app_name"),
      },
    };
  },
  computed: {},
  methods: {},
};
</script>
