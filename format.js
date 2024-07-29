const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("xx.txt");
const lines = decoder.decode(data).split(/\n/)

let stack = []
let out = []

for (const line of lines) {
  if(line.startsWith('search [')) {
    const cell = line.split(/\[|\]/)[1]
    if(!stack.includes(cell)) {
      out.push('(')
      stack.push(cell)
    } else {
      while(stack[stack.length-1] != cell) {
        stack.pop()
        out.push(')')
      }
    }
  } else if (line.startsWith('solved')) {
    out.push('(*)')
  } else if (line.startsWith('stuck')) {
    out.push('(-)')

  }
}

while(stack.length){
  out.push(')')
  stack.pop()
}

console.log(out.join(''))