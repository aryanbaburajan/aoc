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

function solve(input) {
  let p = {};
  input.split("\n").forEach((r, y) => {
    r.split("").forEach((c, x) => {
      if (c != ".")
        if (p[c] === undefined) p[c] = [[y, x]];
        else p[c].push([y, x]);
    });
  });

  new Set(
    Object.keys(input).map((f) => {
      p[f].map(([ay, ax], i) => {
        return p[f].map(([by, bx], j) => {
          if (i != j) return;
        });
      });
    })
  );
}
