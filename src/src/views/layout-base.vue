<template>
  <GettyPage :application-base-url="path">
    <Hero name="Content" :data="heroData" />
    <section>
      <!-- note: container is a getty-ui class that adds the page gutter -->
      <div class="gui-container">
        <router-view :path="path" />
      </div>
    </section>
  </GettyPage>
</template>

<script>
import { GettyPage, Hero } from "@thegetty/getty-ui";
import "@thegetty/getty-ui/dist/getty-ui.css";
export default {
  name: "LayoutBase",
  components: { GettyPage, Hero },
  props: {
    /** * The path the app runs at */ path: { type: String, default: "/" },
  },
  data: function () {
    return {
      heroData: {
        title: this.$t("base.app_name"),
      },
    };
  },
  computed: {},
  methods: {},
};
</script>
