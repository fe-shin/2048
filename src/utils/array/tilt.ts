function tilt({
  value,
  direction,
}: {
  value: number[]
  direction: 'R' | 'L'
}): number[] {
  if (direction === 'L') {
    for (let i = 0; i < value.length; i++) {
      if (value[i] === 0) {
        value.splice(i, 1)
        value.push(0)
      }
    }
    // Sum up the matching numbers
  } else {
    for (let i = value.length - 1; i >= 0; i--) {
      if (value[i] === 0) {
        value.splice(i, 1)
        value.unshift(0)
      }
    }
    // Sum up the matching numbers
  }

  return value
}

export { tilt }
