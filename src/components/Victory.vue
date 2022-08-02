<template>
  <div
    class="flex"
    :style="{ 'justify-content': 'space-between' }"
  >
    <h2
      class="flex"
      :style="{ gap: '0.5rem' }"
    >
      <template v-if="winner">Bravo, {{ winner.name }} <span :class="discColorClass(winner.color)"></span> a gagné !</template>
      <template v-else>C'est une égalité !</template>
    </h2>
    <button
      class="button"
      @click.prevent="onRestart"
    >
      Rejouer
    </button>
  </div>
</template>

<script setup lang="ts">
import { discColorClass } from "../func/colors"
import { Player } from "../types"

type VictoryProps = {
  winner: Player
}

defineProps<VictoryProps>()

const emit = defineEmits<{
  (e: 'restart'): void
}>()

const onRestart = () => {
  emit('restart')
}
</script>