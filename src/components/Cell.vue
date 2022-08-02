<template>
  <div
    :class="[discColorClass(color), { 'winner' : winner }]"
    :style="{ '--row': y }"
  >
  </div>
</template>

<script setup lang="ts">
import { CellState } from "../types"
import { discColorClass } from "../func/colors"

type CellProps = {
  x: number,
  y: number,
  color: CellState,
  winner: boolean
}

defineProps<CellProps>()
</script>