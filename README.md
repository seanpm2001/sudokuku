# sudokuku

## deploy

Usage: ```deno run --allow-net=:8000 --allow-env --watch solve.js```

This repo is linked to Deno Deploy to publish changes globally on merge to main.

https://deno.com/deploy

The server helps you solve sudoku puzzles by showing choices satisfying two simple rules: at-most-one and at-least-one of every digit must appear in every row, column and square. Choices that violate the at-most-one rule are omitted. Alternatives to digits that must be chosen by the at-least-one rule are grayed.

https://sudokuku.deno.dev/?.3...1....24.3.5.....7.58...7...4.1.....8.7......579....6.5.3.7.4.......3...2..6.

Empty squares are dead ends. Back up the browser to make a new choice. The above rules are insufficent to solve the hardest puzzles. You can guess or look for a third rule. This program will help you find these most interesting places in the hardest puzzles without becomming a mechanical master of the simpler logic.

Each step has a unique url that you can bookmark or send to friends. Use a blank query to enter new puzzles.

## research

We've refactored the single file server into several modules and have extended this with command line drivers that research the behavior of the solver over many distinct puzzles.

Usage: ```deno run choices.js .475..9....1....4...24...15.3........527.418........9.27...13...6....2....1..457. | pbcopy```

This script writes a trace of repeatedly selecting all forced moves at once visible.
Then this operation is repeated for additional forced moves until the puzzle is sovlved or there are only unforced choices remaining.

```
search start

.3...1....24.3.5.....7.58...7...4.1.....8.7......579....6.5.3.7.4.......3...2..6.
73...1....24.3.5.....7.58.2.7...4.1.4...8.7......579....6.5.3.7.45......37..2.56.
735..1..9.24.3.5.....7.5832.7...4.1.4...8.7......579....6.5.3.7.45......37.42.56.
735..1..9824.3.5.....745832.7...4.1.4...8.7......579.4..6.58347.45......37.42.56.
735.81469824.3.5...9.745832.7...4.1.4...8.7....3.57984..6.58347.45.....837842.56.
735281469824.3.5...96745832872..4.134...8.7...13.57984..6.58347.45...2.837842.56.
735281469824.3.5..196745832872.9451345..8.7.2613257984.26.58347.45...2.837842.56.
735281469824.3.5..196745832872694513459.8.762613257984.26.58347.45...2.837842.56.
7352814698249365..196745832872694513459.8.762613257984.26.58347.45...2.837842.56.
7352814698249365..196745832872694513459.8.762613257984926.583471456..2.837842.56.
73528146982493651.1967458328726945134593817626132579849261583471456.329837842.561
735281469824936517196745832872694513459381762613257984926158347145673298378429561
solved
```

In this case the we try alternative choses in turn backtracking as necessary.

```
search start

.1......5..628...9.9...64..5..8..7...3..54......6.1...49...6..7...8..6...6.23...4
.1.9..6.54.628...9.9...64..56.8..7...3..54.6....6.1...49.156..7...84.6...6.23...4
.1.9..6.5476285..9.9...64..56.8..7...3..54.6....6.1...49.156..75..84769..6.239..4
.1.9..6.5476285319.9...64..56.8..7...3..54.6....6.1...49.156..752.84769..6.239..4
trying [0] = "23"

search [0] = 2

21.9..6.5476285319.9...64..56.8..7...3..54.6....6.1...49.156..752.84769..6.239..4
21.9..6.5476285319.9...64..56.8..7...3..54.6....6.1...49.15632752.84769..6.239..4
21.9..685476285319.9...64..56.83.7...3..54.6....6.1...498156327523847691.6.239..4
21397.685476285319.9..164..56.83.74..3..54.6....6.1...498156327523847691167239..4
213974685476285319.9.31647256.83.74..3..54.6.74.6.1..3498156327523847691167239..4
213974685476285319.9531647256.83.74..3.754.6.7486219.3498156327523847691167239..4
21397468547628531989531647256.83974.932754168748621953498156327523847691167239584
213974685476285319895316472561839742932754168748621953498156327523847691167239584
solved

search [0] = 3

31.9..6.5476285319.9...64..56.8..7...3..54.6....6.1...49.156..752.84769..6.239..4
31.9.46.5476285319.9.3.64..56.8..7...3..54.6....6.1..349.1562.752.84769..6.239..4
31.9746.5476285319.953164..56.8..74..3..54.6..4.6.1..349.1562.752.84769..6.239..4
3129746.54762853198953164..56.8..74..3..54.6..4.6.1..349.1562.752.84769..6.239..4
3129746854762853198953164..56.82.74..3..54.6..4.6.1..34981562.752.84769..6.239..4
3129746854762853198953164..56.82374..3..54.6..48671..349815623752384769..67239.84
31297468547628531989531642256.82374.732954.68948671.23498156237523847691167239584
312974685476285319895316422561823749732954168948671.23498156237523847691167239584
stuck
```

The trace is written to standard error with a graphviz dot version of the search path written to standard out.

<img width="883" alt="image" src="https://github.com/user-attachments/assets/1b33194b-31bd-455a-8d9e-77e1682be359">

Notice that the upper-left corner in these diagrams is either "." for unknown or  "2" or "3" where "2" is the correct choice.

The choices.js script will read an alternative puzzle description where unknows are represented with "0" and cells are reported in a different oreder.
Many thanks to Tomas Aschan who has shared with us a 1000 sample puzzles from [Kaggle](https://www.kaggle.com/datasets/rohanrao/sudoku).
These samples include one solution which we ignore. We can run them all with this shell command:

```
tail -1000 1000-sudokus.csv | while read p
  do deno run choices.js $p | pbcopy
  done
```
The script distinguishes the two formats by the presence of "0" characters. We thank Tomas again for offering a Python program that does the necessary conversion which we've mimiced in javascript.

We can format the trace output as a parenthesized expression representing the search tree.
Solutions will be represented by asterisks (*) and stuck paths by hyphens (-).
The tree above would be formatted as `((*)(-))`.
We provide a script, 1000-sudokus.sh, that solves and formats each sample then counts each unique result showing that near 98% are directly solved by forced moves alone and only a dozen of the puzzles that require choices have only one solution.
```
   1 (((-)(-))(*))
   1 ((*)(((*)((*)(*)))((*)((*)(*)))))
   1 ((*)((*)(-)))
   1 ((-)((*)(*)))
   5 ((-)(*))
   6 ((*)(*))
   6 ((*)(-))
 979 (*)
```
Thanks go to Nick Niemeir who helped me devise and code this compressed format.

## history

In 2005 I bought a sudoku puzzle book at the airport as I headed out cross-country to Boston.
I reached for the book expecting more idle entertainment on the return trip but found I had left it in the hotel.
I did have a laptop with me so I wrote this puzzle solver instead.

http://c2.com/~ward/sudokant.txt
