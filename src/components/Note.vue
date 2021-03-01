<template>
  <div class="card text-white mb-3" :class="isDone ? 'bg-info' : 'bg-primary'">
    <div class="card-body text-center">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <div class="btn btn-group">
        <button @click="$emit('delete')" class="btn btn-danger">Remove</button>
        <button v-if="!isDone" @click="$emit('done')" class="btn btn-info">
          Done
        </button>
      </div>
    </div>
    <div class="card-footer">Created at {{ dateFormatted }}</div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    title: String,
    content: String,
    createdAt: Number,
    isDone: Boolean,
  },
  emits: ["delete", "done"],
  setup(props) {
    const dateFormatted = computed(() =>
      new Date(props.createdAt).toLocaleDateString()
    );

    return {
      dateFormatted,
    };
  },
};
</script>

<style scope>
.card-disabled h5, .card-disabled p {
  opacity: 0.5;
}
</style>