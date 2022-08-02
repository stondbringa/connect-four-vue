<template>
  <div class="container">
    <NameSelector
      @select-name="onSelectName"
      :disabled="nameChosen || gameStarted"
    />
    <hr/>
    <ColorSelector
      :players="players"
      :colors="[
        PlayerColor.YELLOW,
        PlayerColor.RED
      ]"
      @select-color="onSelectColor"
      :disabled="colorSelected || gameStarted"
    />
    <hr/>
    <GameInfo
      :current-player="currentPlayer"
    />
    <Victory
      v-if="gameOver"
      :winner="winner"
      @restart="onRestart"
    />
    <Grid
      :show-columns="!gameOver"
      :color="currentPlayer.color"
      :grid="grid"
      @on-drop="onDrop"
      :winner-cells="winnerCellPositions"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import NameSelector from "./components/NameSelector.vue"
import ColorSelector from "./components/ColorSelector.vue"
import Grid from "./components/Grid.vue"
import { FourConnectedPositions, Player, PlayerColor } from "./types"
import GameInfo from "./components/GameInfo.vue";
import Victory from "./components/Victory.vue";
import { useGrid } from "./composables/useGrid";

const { grid, rows, cols, resetGrid, fillCell } = useGrid()

const myPlayerDefaultName: string = 'John'
const myPlayerDefaultColor: PlayerColor = PlayerColor.RED

const myPlayer = ref<Player>({
  id: 1,
  name: myPlayerDefaultName,
  color: myPlayerDefaultColor
})

const otherPlayer = ref<Player>({
  id: 2,
  name: 'Marc',
  color: PlayerColor.YELLOW
})

const players = ref<Player[]>([
  myPlayer.value,
  otherPlayer.value
])

const currentPlayer = ref<Player>(myPlayer.value)
const currentGameColor = ref<PlayerColor>(myPlayer.value.color)

const winner = ref<null | Player>(null)

const gameOver = ref<boolean>(false)
const gameStarted = ref<boolean>(false)

const winnerCellPositions = ref<FourConnectedPositions | null>(null)

const onSelectName = (name: string) => {
  myPlayer.value.name = name
  nameChosen.value = true
}

const onSelectColor = (color: PlayerColor) => {
  myPlayer.value.color = color
  otherPlayer.value.color = myPlayer.value.color === PlayerColor.YELLOW ?
      PlayerColor.RED :
      PlayerColor.YELLOW
  colorSelected.value = true
  currentGameColor.value = myPlayer.value.color
}

const onRestart = (): void => {
  resetGrid()
  myPlayer.value.name = myPlayerDefaultName
  myPlayer.value.color = myPlayerDefaultColor
  otherPlayer.value.color = PlayerColor.YELLOW
  colorSelected.value = false
  nameChosen.value = false
  gameOver.value = false
  gameStarted.value = false
  winner.value = null
  winnerCellPositions.value = null
}

const switchPlayer = () => {
  currentPlayer.value = currentPlayer.value.id === myPlayer.value.id ?
    otherPlayer.value :
    myPlayer.value
}

const nameChosen = ref<boolean>(false)
const colorSelected = ref<boolean>(false)

const nbMoves = ref<number>(0)

const onDrop = (
  col: number,
): void => {
  // Parse rows from the bottom to find the first empty cell on the column clicked
  let result
  for (let y = grid.value.length - 1; y >= 0; y--) {
    let row = grid.value[y];
    if (row[col] === 'E') {
      // Cell empty, we can drop the token and switch to the next player color
      fillCell(col, y, currentPlayer.value.color)
      nbMoves.value++
      gameStarted.value = true
      result = getWinnerCells(col, y, currentPlayer.value.color)
      if (result !== false) {
        gameOver.value = true
        winner.value = currentPlayer.value
        winnerCellPositions.value = result
      } else if (nbMoves.value === rows() * cols()) {
        gameOver.value = true
      } else {
        switchPlayer()
      }
      break
    }
  }
}

const getWinnerCells = (
  x: number,
  y: number,
  color: PlayerColor
): FourConnectedPositions | false => {
  let winnerPositions: FourConnectedPositions = [];

  const directions = [
      [1, 0],
      [0, -1],
      [1, -1],
      [-1, -1]
  ]

  let posX, posY
  for (let direction of directions) {
    winnerPositions = []
    winnerPositions.push({
      x,
      y
    })
    for (let forward of [1, -1]) {
      for (let i = 1; i < 4; ++i) {
        posX = x + (i * direction[0]) * forward
        posY = y + (i * direction[1]) * forward

        if (grid.value?.[posY]?.[posX] === color) {
          winnerPositions.push({
            x: posX,
            y: posY
          })
        }
        if (winnerPositions.length >= 4) {
          return winnerPositions
        }
      }
    }
  }

  return false
}
</script>