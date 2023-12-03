import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

let total = 0

const goA = (input: string) => {
  const lines = input.split("\n")
  const symbols = lines.map((line) => line.split(""))

  lines.forEach((line, lineIdx) => {
    const dec = /\d+/g

    let nums = dec.exec(line)
    while (nums !== null) {
      let numValid = false

      const num = nums[0]

      // Lines before&after
      for (const linePos of [lineIdx - 1, lineIdx + 1]) {
        if (lines[linePos] !== undefined) {
          for (let i = nums.index - 1; i < dec.lastIndex + 1; i++) {
            if (symbols[linePos] && symbols[linePos][i]) {
              if (
                symbols[linePos][i] !== "." &&
                symbols[linePos][i].match(/^[0-9]$/g) === null
              ) {
                numValid = true
              }
            }
          }
        }
      }

      // Symbols before&after
      for (const symbolPos of [nums.index - 1, dec.lastIndex]) {
        if (
          symbols[lineIdx][symbolPos] !== undefined &&
          symbols[lineIdx][symbolPos] !== "."
        ) {
          numValid = true
        }
      }

      if (numValid) {
        total += Number(num)
      }

      // go to next
      nums = dec.exec(line)
    }
  })

  return total
}

const goB = (input) => {
  const lines = input.split("\n")
  const symbols = lines.map((line) => line.split(""))
  const adjNums: Record<string, number[]> = {}

  lines.forEach((line, lineIdx) => {
    const dec = /\d+/g

    let nums = dec.exec(line)
    while (nums !== null) {
      for (const linePos of [lineIdx - 1, lineIdx + 1]) {
        if (lines[linePos] !== undefined) {
          for (let i = nums.index - 1; i < dec.lastIndex + 1; i++) {
            if (symbols[linePos] && symbols[linePos][i]) {
              if (symbols[linePos][i] === "*") {
                adjNums[`${linePos}${i}`] = adjNums[`${linePos}${i}`]
                  ? [...adjNums[`${linePos}${i}`], Number(nums[0])]
                  : [Number(nums[0])]
              }
            }
          }
        }
      }

      // Symbols before&after
      for (const symbolPos of [nums.index - 1, dec.lastIndex]) {
        if (symbols[lineIdx][symbolPos] === "*") {
          adjNums[`${lineIdx}${symbolPos}`] = adjNums[`${lineIdx}${symbolPos}`]
            ? [...adjNums[`${lineIdx}${symbolPos}`], Number(nums[0])]
            : [Number(nums[0])]
        }
      }

      // go to next
      nums = dec.exec(line)
    }
  })

  let total = 0
  for (const key of Object.keys(adjNums)) {
    if (adjNums[key].length == 2) {
      total += adjNums[key][0] * adjNums[key][1]
    }
  }

  return total
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
