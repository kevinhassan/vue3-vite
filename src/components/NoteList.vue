<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="(note, index) in notes" :key="`notes#${index}`">
        <Note
          style="width: 18rem"
          :title="note.title"
          :content="note.content"
          :createdAt="note.createdAt"
          :isDone="note.isDone"
          @delete="onDelete(index)"
          @done="onDone(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Note from "./Note.vue";

export default {
  components: {
    Note,
  },
  props: {
    notes: {
      type: Array,
    },
  },
  emits: ["noteDeleted", "noteDone"],
  setup(props, context) {
    const onDelete = (noteIndex) => {
      context.emit("noteDeleted", noteIndex);
    };
    const onDone = (noteIndex) => {
      context.emit("noteDone", noteIndex);
    };
    return {
      onDelete,
      onDone,
    };
  },
};
</script>

<style>
</style>