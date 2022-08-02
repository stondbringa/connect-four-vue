import { CellState, PlayerColor } from "../types"

export function discColorClass (color: CellState) {
  if (color === 'E') {
    return 'disc'
  }

  return `disc disc-${color === PlayerColor.YELLOW ? 'yellow' : 'red'}`
}