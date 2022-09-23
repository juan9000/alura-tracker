<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label"> Project Name </label>
        <input type="text" class="input" v-model="projectName" />
        <div class="field mt-2">
          <button class="button" type="submit">Save</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { POST_PROJECT, PUT_PROJECT } from "@/store/type-actions";
import { TypeNotification } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";

export default defineComponent({
  name: "Form",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (project) => project.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    save() {
      if (this.id) {
        this.store
          .dispatch(PUT_PROJECT, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => {
            this.sucessNotification();
          });
      } else {
        this.store.dispatch(POST_PROJECT, this.projectName).then(() => {
          this.sucessNotification();
        });
      }
    },
    sucessNotification() {
      this.projectName = "";
      this.notify(
        TypeNotification.SUCESS,
        "Exelent!",
        "Project available for use"
      );
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    return {
      store,
      notify,
    };
  },
});
</script>
