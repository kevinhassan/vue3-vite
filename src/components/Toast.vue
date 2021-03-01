<template>
  <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img
        v-if="image"
        :src="image.src"
        class="rounded me-2"
        :alt="image.alt"
      />
      <strong class="me-auto">{{ title }}</strong>
      <small>{{ meta }}</small>
      <button
        v-if="closeable"
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      validator: (value) => Object.keys(value).includes("src", "alt"),
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    meta: {
      type: String,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
</style>