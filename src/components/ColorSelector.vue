<template>
  <div class="players">
    <div
      class="player"
      v-for="player in players"
      :key="player.id"
    >
      {{ player.name }}
      <div
        :class="discColorClass(player.color)"
        v-if="player.color"
      ></div>
    </div>
  </div>
  <h3>Sélectionnez une couleur : </h3>
  <div class="selector">
    <button
      v-for="color in colors"
      :key="color"
      :class="discColorClass(color)"
      :disabled="disabled"
      @click="onSelect(color)"
    >
    </button>
  </div>
</template>

<script setup lang="ts">
import { PlayerColor, Player} from "../types"
import { discColorClass } from "../func/colors"

type ColorSectorProps = {
  players: Player[],
  colors: PlayerColor[],
  disabled: boolean
}

defineProps<ColorSectorProps>()

const emit = defineEmits<{
  (e: 'select-color', color: PlayerColor): void
}>()

const onSelect = (color: PlayerColor) => {
  emit('select-color', color)
}
</script>