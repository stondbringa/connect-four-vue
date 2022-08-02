<template>
  <div>
    <h2
      class="flex"
      :style="{ gap: '0.5rem' }"
    >
      Au tour de {{ currentPlayer.name }} <span :class="discColorClass(currentPlayer.color)"></span> de jouer
    </h2>
  </div>
</template>

<script setup lang="ts">
import { discColorClass } from "../func/colors"
import { Player } from "../types";

type GameInfoProps = {
  currentPlayer: Player
}

defineProps<GameInfoProps>()
</script>