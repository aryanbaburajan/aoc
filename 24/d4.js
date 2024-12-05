var fs = require("fs");
var path = require("path");

var input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
});
solve(input);

function print(p) {
  console.log(p);
}
function getIndicesOf(searchStr, str) {
  return [...str.matchAll(new RegExp(searchStr, "gi"))].map((a) => a.index);
}

function solve(input) {
  const h = input.split("\n");

  let result = 0;

  for (let i = 1; i < h.length - 1; i++) {
    for (let j = 1; j < h[i].length - 1; j++) {
      if (h[i][j] == "A") {
        if (
          (h[i - 1][j - 1] == "M" && h[i + 1][j + 1] == "S") ||
          (h[i - 1][j - 1] == "S" && h[i + 1][j + 1] == "M")
        ) {
          if (
            (h[i - 1][j + 1] == "M" && h[i + 1][j - 1] == "S") ||
            (h[i - 1][j + 1] == "S" && h[i + 1][j - 1] == "M")
          ) {
            result++;
          }
        }
      }
    }
  }

  print(result);
}
