const colors = ['olivine', 'orchid', 'flax', 'jordy', 'tangerine'] as const

export default function generateColor(): typeof colors[number] {
  return colors[Math.floor(Math.random() * colors.length)]
}