// Map choice point alternatives for diabolical sudoku puzzles
// deno run choices.js .475..9....1....4...24...15.3........527.418........9.27...13...6....2....1..457.
// deno run choices.js .3...1....24.3.5.....7.58...7...4.1.....8.7......579....6.5.3.7.4.......3...2..6.

import * as rules from './rules.js'
import {convert} from './convert.js'
import * as dot from './dot.js'

let query = rules.trim(Deno.args[0])
if(query.match(/0/)) query = convert(query)

// query = '.3...1....24.3.5.....7.58...7...4.1.....8.7......579....6.5.3.7.4.......3...2..6.'
// query = '.1......5..628...9.9...64..5..8..7...3..54......6.1...49...6..7...8..6...6.23...4' // difficult
// query = '.475..9....1....4...24...15.3........527.418........9.27...13...6....2....1..457.' // diabolical


dot.digraph(() => search(null,query,'start'))

function search(was,here, why) {
  const setone = (str, i, ch) => {
    const letters = Array.from(str)
    letters[i] = ch
    return letters.join('')
  }
  console.error()
  console.error('search', why)
  const there = choice(here)
  if (there.includes('.')) {
    const trying = todo(there).sort((a,b) => a.choice.length - b.choice.length)
    if (trying.length == 0) {
      console.error('%cstuck','color:red')
      dot.color(here,'pink')
      dot.rel(was,here)
    }
    else {
      console.error(`%ctrying [${trying[0].i}] = "${trying[0].choice}"`,"color:yellow")
      const digits = Array.from(trying[0].choice)
      if(was) dot.rel(was,here)
      for(const digit of digits)
        search(here,setone(there,trying[0].i,digit),`[${trying[0].i}] = ${digit}`)
    }
  } else {
    console.error("%csolved","color:green")
    if(was) {
      dot.rel(was,here)
      dot.color(there,'palegreen')
      dot.rel(here,there)
    }
  }
}

function force(query) {
  const {givens,choices} = rules.apply(query)
  const i = givens.findIndex((g,i) => g=='.' && choices[i].length==1)
  if(i>=0) givens[i] = choices[i][0]
  return givens.join('')
}

function choice(query) {
  console.error('')
  let here = query
  console.error(here)
  let there = force(here)
  while (there != here) {
    here = there
    console.error(here)
    there = force(here)
  }
  return here
}

function todo(query) {
  const {givens,choices} = rules.apply(query)
  return givens
    .map((digit,i) => (digit == '.' && choices[i].length > 1) ? {i,choice:choices[i]} : null)
    .filter(choice => choice != null)
}
