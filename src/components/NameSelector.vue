<template>
  <h1>Sélectionnez un pseudo :</h1>
  <div
    v-if="error"
    class="alert"
  >
    {{ error }}
    <button
      @click="error = ''"
      class="alert__close"
    >
      &times;
    </button>
  </div>
  <form
    class="flex"
    :style="{ 'gap': '0.5rem'}"
    action=""
    @submit.prevent="onSubmit"
  >
    <label for="name">
      Votre pseudo
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      :disabled="disabled"
    />
    <button
      class="button"
      :disabled="disabled"
    >
      Choisir
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type NameSelectorProps = {
  disabled: boolean
}

defineProps<NameSelectorProps>()

const emit = defineEmits<{
  (e: 'select-name', name: string): void
}>()

const error = ref<string>('');

const onSubmit = ($e: Event) => {
  const name = new FormData($e.currentTarget as HTMLFormElement).get('name')

  if (!name || !name.toString().trim()) {
    error.value = 'Vous devez choisir un pseudo'
    return
  }

  emit('select-name', name.toString())
}
</script>