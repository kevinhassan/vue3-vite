<template>
  <form class="row g-3" @submit.prevent="onSubmit" v-show="isShown">
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="noteTitle"
        placeholder="Enter title..."
        v-model="title"
      />
      <label for="noteTitle">Title</label>
    </div>
    <div class="form-floating">
      <textarea
        class="form-control"
        placeholder="Enter content..."
        id="noteContent"
        style="height: 100px"
        v-model="content"
      ></textarea>
      <label for="noteContent">Content</label>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </form>
  <teleport to="#toast">
    <Toast 
      v-if="noteIsAdded"
      closeable
      title="Success"
      content="Note added"
    />  
  </teleport>
</template>

<script>
import { ref, toRefs, watch, watchEffect } from "vue";
import useApi from "../composables/useApi";
import axiosInstance from "../middleware";
import Toast from '../components/Toast.vue';

export default {
  emits: ["submit"],

  components: {
    Toast
  },

  props: {
    isShown: {
      type: Boolean,
    },
  },

  setup(props, context) {
    const title = ref("");
    const content = ref("");
    const noteIsAdded = ref(false);

    const { isShown } = toRefs(props);

    const { result: note, loading, error, callAPI: createNote } = useApi(
      async () => {
        const res = await axiosInstance.post("/notes", {
          title: title.value,
          content: content.value,
        });
        return res.data.note ?? {};
      }
    );

    const onSubmit = async () => {
      await createNote();
      if (!error.value) {
        context.emit("submit", note.value);
      }
    };

    watch(isShown, (oldValue, newValue) => {
      if (oldValue !== newValue) {
        title.value = "";
        content.value = "";
      }
    });

    watchEffect(() => {
      if (note.value) {
        noteIsAdded.value = true;
        setTimeout(() => {
          noteIsAdded.value = false;
        }, 5000);
      }
    });

    return { title, content, onSubmit, noteIsAdded };
  },
};
</script>

<style scoped>
form {
  padding-top: 50px;
}
#noteContent {
  min-height: 100px;
}
</style>