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
function range(n) {
  return [...Array(Number(n)).keys()].map((i) => i + 1);
}

function mergeAdjacentElements(arr, idx1, idx2) {
  if (
    idx1 >= 0 &&
    idx2 >= 0 &&
    idx1 < arr.length &&
    idx2 < arr.length &&
    Math.abs(idx1 - idx2) === 1
  ) {
    const mergedElement = [...arr[idx1], ...arr[idx2]];

    const lowerIndex = Math.min(idx1, idx2);
    arr[lowerIndex] = mergedElement;

    arr.splice(lowerIndex + 1, 1);
  }
}

function solve(input) {
  input = input.split("");

  let a = input.map((v, i) => {
    if (i % 2 == 0) {
      return range(v).map((_) => String(i / 2));
    } else {
      return range(v).map((_) => ".");
    }
  });

  let maxId = Math.ceil(input.length / 2) - 1;
  // print(maxId);
  print(a);
  // print(a.flat().join(""));

  for (let id = maxId; id >= 0; id--) {
    let change = false;

    let idIdx = 0;
    for (let i = 0; i < a.length; i++) if (a[i][0] == id) idIdx = i;

    for (let i = 0; i < a.length; i++) {
      if (a[i][0] == "." && a[i].length >= a[idIdx].length && i < idIdx) {
        let left = a[i].length - a[idIdx].length;

        [a[i], a[idIdx]] = [a[idIdx], a[i]];

        if (left > 0) {
          a.splice(i + 1, 0, Array(left).fill("."));
          print(idIdx);
          a[idIdx + 1].splice(-left);

          if (a[idIdx][0] == "." && a[idIdx + 1][0] == ".")
            mergeAdjacentElements(a, idIdx, idIdx + 1);
        }
        change = true;
        break;
      }
    }
    if (change) {
      print(a);
    }
  }

  // print(a);
  a = a.flat();
  // print(a.join(""));

  let result = a
    .map((v, i) => (v != "." ? v * i : 0))
    .reduce((a, b) => a + b, 0);
  print(result);
}
