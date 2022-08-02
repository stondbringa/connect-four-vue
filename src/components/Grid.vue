<template>
  <div
    class="grid"
    :style="{ '--rows': grid.length, '--cols': nbCols }"
  >
    <template v-for="(row, y) in grid">
      <Cell
        v-for="(color, x) in row"
        :x="x"
        :y="y"
        :color="color"
        :key="`${x}-${y}`"
        :winner="winnerCell({
          x,
          y
        })"
      />
    </template>
    <div
      class="columns"
      v-show="showColumns"
    >
      <Column
        v-for="(_, k) in cols"
        :key="k"
        :color="color"
        @click.prevent="onDrop(k)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Cell from './Cell.vue'
import Column from './Column.vue'

import {
  FourConnectedPositions,
  GridState,
  PlayerColor,
  Position
} from '../types'

type GridProps = {
  grid: GridState,
  color?: PlayerColor,
  showColumns: boolean,
  winnerCells: FourConnectedPositions | null
}

const props = defineProps<GridProps>()

const emit = defineEmits<{
  (e: 'on-drop', col: number): void
}>()

const nbCols: number = props.grid[0].length
const cols: number[] = new Array(nbCols).fill(1)

const onDrop = (col: number): void => {
  emit('on-drop', col)
}

const winnerCell = (position: Position): boolean => {
  let winnerPosition: Position

  if (!props.winnerCells) {
    return false
  }

  for (winnerPosition of props.winnerCells) {
    if (
      position.x === winnerPosition.x &&
      position.y === winnerPosition.y
    ) {
      return true
    }
  }

  return false
}
</script>