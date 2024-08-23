# find the puzzles characterized a certain way
# usage: sh 1000-sudokus-find.sh '(((-)(-))(*))'

tail -1000 1000-sudokus.csv | while read p; do
  deno run choices.js $p 2>xx.txt >/dev/null
  f=`deno run --allow-read=. format.js`
  if [ "$1" == "$f" ]
  then
    echo $p
  fi  
done