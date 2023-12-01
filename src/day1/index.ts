import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const parseLine = (line: string): number => {
  const mapping: Record<string, number> = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

  const searches = Object.keys(mapping)

  const matches = [
    ...searches.map((search) => ({ search, pos: line.indexOf(search) })),
    ...searches.map((search) => ({ search, pos: line.lastIndexOf(search) })),
  ]

  const filtered = matches.filter((found) => found.pos !== -1)

  const sorted = filtered.sort((a, b) => (a.pos > b.pos ? 1 : -1))

  if (sorted.length === 0) {
    return 0
  }

  const [first, last] = [
    mapping[sorted[0].search],
    mapping[sorted[sorted.length - 1].search],
  ]

  return Number(`${first}${last}`)
}

const goA = (input: string) => {
  const lines = input.split("\n")

  const parsedLines = lines.map((line) => parseLine(line))

  const total = parsedLines.reduce((acc, val) => acc + val, 0)

  return total
}

/* Results */

console.time("Time")
const resultA = goA(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
