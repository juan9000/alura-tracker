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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { POST_PROJECT, PUT_PROJECT } from "@/store/type-actions";
import { TypeNotification } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Form",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();

    const store = useStore();
    const { notify } = useNotifier();
    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (project) => project.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const save = () => {
      if (props.id) {
        store
          .dispatch(PUT_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => {
            sucessNotification();
          });
      } else {
        store.dispatch(POST_PROJECT, projectName.value).then(() => {
          sucessNotification();
        });
      }
    };

    const sucessNotification = () => {
      projectName.value = "";
      notify(TypeNotification.SUCESS, "Exelent!", "Project available for use");
      router.push("/projects");
    };

    return {
      projectName,
      save,
    };
  },
});
</script>
