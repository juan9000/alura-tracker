<template>
  <section>
    <h1 class="title">Projects</h1>
    <form>
      <div class="field">
        <label for="projectName" class="label"> Project Name </label>
        <input type="text" class="input" v-model="projectName" />
        <div class="field">
          <button class="button" type="submit">Save</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Projects",
});
</script>
