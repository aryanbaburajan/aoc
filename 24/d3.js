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
  let result = 0;
  let i = getIndicesOf("mul\\(", input);
  let dont = getIndicesOf("don't\\(\\)", input);
  let does = getIndicesOf("do\\(\\)", input);

  let d = new Array(input.length);
  let flag = true;
  for (let j = 0; j < d.length; j++) {
    if (dont.includes(j)) flag = false;
    if (does.includes(j)) flag = true;
    d[j] = flag;
  }

  i.forEach((j) => {
    if (d[j] == false) return;

    j += 4;
    let fO = "",
      sO = "";
    while (input[j] != ",") {
      fO += input[j];
      if (/^\d+$/.test(input[j]) == false) return;
      j++;
    }
    if (input[j] != ",") return;
    j++;
    while (input[j] != ")") {
      sO += input[j];
      if (/^\d+$/.test(input[j]) == false) return;
      j++;
    }
    if (input[j] != ")") return;
    result += parseInt(fO) * parseInt(sO);
  });
  print(result);
}
