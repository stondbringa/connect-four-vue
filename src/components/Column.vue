<template>
  <div class="column">
    <div :class="discColorClass(color)"></div>
  </div>
</template>

<script setup lang="ts">
import { discColorClass } from "../func/colors"
import { PlayerColor } from "../types"

type ColumnProps = {
  color: PlayerColor
}

defineProps<ColumnProps>()
</script>