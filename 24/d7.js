var fs = require("fs");
var path = require("path");

var input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
});

const start = performance.now();
solve(input);
const end = performance.now();
console.log(`execution time: ${(end - start) / 1000} seconds`);

function print(p) {
  console.log(p);
}

function test(final, ops, t, cur) {
  print(t + " != " + final);

  if (t > final) return false;
  else if (t == final && cur == ops.length - 1) return true;
  else if (cur == ops.length) return false;
  else {
    return (
      test(final, ops, (cur == 0 ? 1 : t) * ops[cur], cur + 1) ||
      test(final, ops, t + ops[cur], cur + 1)
    );
  }
}

function solve(input) {
  let result = 0;
  input.split("\n").forEach((eq) => {
    let final = Number(eq.split(":")[0]);
    let ops = eq
      .split(":")[1]
      .split(" ")
      .map((i) => Number(i))
      .splice(1);
    print(eq);

    let t = test(final, ops, 0, 0);

    if (t) result += final;
  });

  print(result);
}
