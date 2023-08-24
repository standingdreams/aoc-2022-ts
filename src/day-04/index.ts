import { getText } from "../utils/general"

function outputAllNumbers(range: string) {
  const [start, end] = range.split('-').map(Number)
  const numbers = []

  for (let i = start; i <= end; i++) {
    numbers.push(i)
  }

  return numbers
}

function findRangeSizes(firstRange: number[], secondRange: number[]) {
  let largestRange
  let smallestRange

  if (firstRange.length === secondRange.length) {
    return { largestRange: firstRange, smallestRange: secondRange }
  }

  largestRange = firstRange.length > secondRange.length ? firstRange : secondRange
  smallestRange = firstRange.length < secondRange.length ? firstRange : secondRange

    return { largestRange, smallestRange }
}

function fullyContained(firstRange: number[], secondRange: number[]) {
  const { largestRange, smallestRange } = findRangeSizes(firstRange, secondRange)

  return smallestRange.every((x) => largestRange.includes(x))
}

function partiallyContained(firstRange: number[], secondRange: number[]) {
  const { largestRange, smallestRange } = findRangeSizes(firstRange, secondRange)

  return smallestRange.some((x) => largestRange.includes(x))
}

function start() {
  const data = getText(__dirname, '/input.txt')
  const elves = data.trim().split('\n');
  let fullyContainedRanges = 0
  let partiallyContainedRanges = 0

  for (const elf of elves) {
    const [first, second] = elf.split(',')
    const firstRange = outputAllNumbers(first)
    const secondRange = outputAllNumbers(second)
    const isFullyContained = fullyContained(firstRange, secondRange)
    const isPartiallyContained = partiallyContained(firstRange, secondRange)


    if (isFullyContained) {
      fullyContainedRanges++
    }
    if (isPartiallyContained) {
      partiallyContainedRanges++
    }
  }

  console.log('Part 1: ', fullyContainedRanges)
  console.log('Part 2: ', partiallyContainedRanges)
}

start()