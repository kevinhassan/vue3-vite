<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-brand">
        <img
          v-if="image"
          :src="image.src"
          :alt="image.alt"
          class="navbar-brand"
          width="50"
          height="50"
        />
      </div>
      <span >{{ title }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: { type: String },
    image: {
      type: Object,
      validator: (value) => Object.keys(value).includes("src", "alt"),
    },
  },
};
</script>

<style scoped>
img {
  height: 50px;
  width: 50px;
}
</style>