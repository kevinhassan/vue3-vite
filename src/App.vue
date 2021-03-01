<template>
  <Header :image="headerImage" :title="headerTitle" />

  <div
    class="position-fixed bottom-0 end-0 p-3"
    style="z-index: 5"
    id="toast"
  />
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-12">
        <Form :isShown="showForm" @submit="onSubmit" />
      </div>
      <div class="col-2">
        <button class="btn" @click="toggleShowForm">
          {{ showForm ? "🔼 Fermer " : "🔽  Ajouter" }}
        </button>
      </div>
    </div>
  </div>
  <div class="container">
    <div v-if="error" class="alert alert-danger" role="alert">
      Error loading notes : {{ error }}
    </div>
    <div v-if="loading">
      <h2 class="text-center">Loading notes...</h2>
    </div>
    <div v-else>
      <h1 class="text-center">Saved notes</h1>
      <NoteList :notes="notes" @noteDeleted="onDelete" @noteDone="onDone" />
    </div>
  </div>
</template>

<script>
import NoteList from "./components/NoteList.vue";
import Form from "./components/Form.vue";
import Header from "./components/Header.vue";
import { onMounted, ref, watchEffect } from "vue";
import useApi from "./composables/useApi";
import axiosInstance from "./middleware";

export default {
  name: "App",

  components: {
    Header,
    NoteList,
    Form,
  },
  setup() {
    const notes = ref([]);
    const headerTitle = "Vue 3 Notes";
    const headerImage = {
      src: "/src/assets/logo.png",
      alt: "logo",
    };

    const showForm = ref(false);
    const toggleShowForm = () => {
      showForm.value = !showForm.value;
    };

    const { result: notesFetched, loading, error, callAPI: getNotes } = useApi(
      async () => {
        const res = await axiosInstance.get("/notes");
        return res.data.notes ?? [];
      }
    );

    const onSubmit = async (noteToSubmit) => {
      const { result: note, error, callAPI: createNote } = useApi(async () => {
        const res = await axiosInstance.post("/notes", noteToSubmit);
        return res.data.note ?? {};
      });
      await createNote();
      if (!error.value) notes.value = [note.value, ...notes.value];
    };

    watchEffect(() => {
      notes.value = notesFetched.value;
    });

    watchEffect(() => {
      showForm.value = notes.value?.length === 0;
    });

    onMounted(() => {
      getNotes();
    });

    const onDelete = async (noteIndex) => {
      const { error, callAPI: deleteNote } = useApi(async () => {
        const res = await axiosInstance.delete(`/notes/${noteIndex}`);
        return res.data;
      });
      await deleteNote();
      if (!error.value)
        notes.value = notes.value.filter((note, index) => index !== noteIndex);
    };

    const onDone = async (noteIndex) => {
      const { result: noteUpdated, error, callAPI: noteDone } = useApi(
        async () => {
          const res = await axiosInstance.put(`/notes/${noteIndex}/done`);
          return res.data.note;
        }
      );
      await noteDone();
      console.log(noteUpdated.value);
      if (!error.value) {
        notes.value = notes.value.map((note, index) =>
          index === noteIndex ? noteUpdated.value : note
        );
      }
    };

    return {
      notes,
      showForm,
      toggleShowForm,
      headerTitle,
      headerImage,
      loading,
      error,
      onSubmit,
      onDelete,
      onDone,
    };
  },
};
</script>

<style scoped>
</style>
