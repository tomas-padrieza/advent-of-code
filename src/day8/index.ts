import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const goA = (input: string) => {
  const instructionSet = {
    R: 1,
    L: 0,
  }

  const [instructionLine, networkLines] = input.split(/\n\n/)

  const instructions = instructionLine.split("").map((i) => instructionSet[i])
  const network = {}

  const nodeLines = networkLines.split(/\n/)
  let positionNode: string = "AAA"
  let destinationNode: string = "ZZZ"

  nodeLines.forEach((line) => {
    const node = line.split(/ = /)
    network[node[0]] = node[1].replace(/\(/g, "").replace(/\)/g, "").split(/, /)
  })

  let steps = 0
  let cycle = [...instructions]

  while (positionNode !== destinationNode) {
    if (cycle.length === 0) {
      cycle = [...instructions]
    }

    const direction = cycle.shift()

    positionNode = network[positionNode][direction]

    steps++
  }

  return steps
}

const goB = (input: string) => {
  return
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
