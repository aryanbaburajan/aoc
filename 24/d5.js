var fs = require("fs");
var path = require("path");

var input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf8",
});
solve(input);

function print(p) {
  console.log(p);
}

function arrcmp(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function solve(input) {
  let [rules, pages] = input.split("\n\n");
  rules = rules.split("\n").map((rule) => rule.split("|"));
  pages = pages.split("\n").map((page) => page.split(","));

  let count = 0,
    result = 0;

  pages.forEach((page) => {
    const sorted = page.slice().sort((a, b) => {
      for (let i = 0; i < rules.length; i++) {
        if (rules[i][0] == a && rules[i][1] == b) return -1;
        else if (rules[i][0] == b && rules[i][1] == b) return 1;
      }
      return 0;
    });

    if (!arrcmp(page, sorted)) {
      result += Number(sorted[(sorted.length - 1) / 2]);
    }
  });

  print(count);
  print(result);
}
