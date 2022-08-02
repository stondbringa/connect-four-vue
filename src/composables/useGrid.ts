import { ref } from "vue"
import { GridState, PlayerColor } from "../types";

const grid = ref<GridState>([
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E']
])

export function useGrid() {
  return {
    grid,
    rows: (): number => grid.value.length,
    cols: (): number => grid.value[0].length,
    fillCell: (x: number, y: number, color: PlayerColor) => grid.value[y][x] = color,
    resetGrid: (): void => {
      grid.value = [];
      for (let row = 1; row <= 6; row++) {
        grid.value.push(new Array(7).fill('E'))
      }
    }
  }
}