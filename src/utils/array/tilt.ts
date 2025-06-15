function tiltLeft({ value }: { value: number[] }): number[] {
  let nonZeros = value.filter((n) => n !== 0)

  for (let i = 0; i < nonZeros.length - 1; i++) {
    if (nonZeros[i] === nonZeros[i + 1]) {
      nonZeros[i] *= 2
      nonZeros[i + 1] = 0
      i++ // skip the next index to prevent double-merge
    }
  }

  nonZeros = nonZeros.filter((n) => n !== 0)

  while (nonZeros.length < value.length) {
    nonZeros.push(0)
  }

  return nonZeros
}

function tiltRight({ value }: { value: number[] }): number[] {
  return tiltLeft({ value: [...value].reverse() }).reverse()
}

export { tiltLeft, tiltRight }
