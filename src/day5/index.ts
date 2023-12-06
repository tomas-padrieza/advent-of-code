import { readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

// const input = prepareInput(readInput())
const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48`

const goA = (input: string) => {
  const [[seeds], ...maps] = input.split(/\s\n/).map((g) => g.split(/\n/))

  let seedPositions = seeds
    .replace("seeds: ", "")
    .split(" ")
    .map((n) => Number(n))

  maps.forEach(([_, ...mapNums]) => {
    const mapMappings = mapNums.map((mapNum) => {
      const [destinationStart, sourceStart, len] = mapNum
        .split(" ")
        .map((n) => Number(n))
      return {
        destination: destinationStart,
        source: sourceStart,
        len: len,
      }
    })

    seedPositions = seedPositions.map((seedPosition) => {
      const [matchMapping] = mapMappings.filter(
        (mapping) =>
          seedPosition >= mapping.source &&
          seedPosition < mapping.source + mapping.len,
      )

      return matchMapping
        ? matchMapping.destination + seedPosition - matchMapping.source
        : seedPosition
    })
  })

  return Math.min(...seedPositions)
}

const goB = (input: string) => {}

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
