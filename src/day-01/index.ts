import * as fs from 'fs'
import * as path from 'path'

fs.readFile(path.join(__dirname, '/day_1_input.txt'), 'utf8', (_, data) => {
  const wordList = data.split('\n\n').map((word) => word.split('\n').map((w) => Number(w)))
  const calculated = wordList.map((word) => word.reduce((a, b) => a + b, 0))
  const sorted = calculated.sort((a, b) => b - a)
  // const largest = Math.max(...calculated)
  console.log({
    value: sorted[0] + sorted[1] + sorted[2],
  })
})