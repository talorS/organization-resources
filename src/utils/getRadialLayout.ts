export type RadialLayoutOptions = {
  centerX: number
  centerY: number
  radius: number
}

export type RadialNodePosition = {
  id: string
  x: number
  y: number
}

export function getRadialLayout(
  resourceIds: readonly string[],
  { centerX, centerY, radius }: RadialLayoutOptions,
): RadialNodePosition[] {
  return resourceIds.map((id, index) => {
    const angle = (index / resourceIds.length) * Math.PI * 2 - Math.PI / 2;

    return {
      id,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  })
}
