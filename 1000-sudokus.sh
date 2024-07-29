# characterize each of the 1000 sudoku puzzles
# usage: sh 1000-sudokus.sh

tail -1000 1000-sudokus.csv | while read p; do
  deno run choices.js $p 2>xx.txt >/dev/null
  deno run --allow-read=. format.js
done | sort | uniq -c | sort -n