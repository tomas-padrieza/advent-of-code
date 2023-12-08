import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

const minCommonMulti = (arr: number[]) => {
  const gcd = (a: number, b: number) => {
    return !b ? a : gcd(b, a % b)
  }

  const lcm = (a: number, b: number) => {
    return (a * b) / gcd(a, b)
  }

  const initArr = arr.sort((a, b) => a - b)
  var multiple = initArr[0]
  initArr.forEach((n) => {
    multiple = lcm(multiple, n)
  })

  return multiple
}

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
  const instructionSet = {
    R: 1,
    L: 0,
  }

  const [instructionLine, networkLines] = input.split(/\n\n/)
  const instructions = instructionLine.split("").map((i) => instructionSet[i])
  const network = {}

  const nodeLines = networkLines.split(/\n/)

  nodeLines.forEach((line) => {
    const node = line.split(/ = /)
    network[node[0]] = node[1].replace(/\(/g, "").replace(/\)/g, "").split(/, /)
  })

  let positionNodes = Object.keys(network).filter((node) => node[2] === "A")

  let cycle = [...instructions]

  const positionNodeMap = positionNodes.map((positionNode) => {
    let steps = 0
    while (positionNode[2] !== "Z") {
      if (cycle.length === 0) {
        cycle = [...instructions]
      }

      const direction = cycle.shift()

      positionNode = network[positionNode][direction]

      steps++
    }

    return steps
  })

  return minCommonMulti(positionNodeMap)
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
