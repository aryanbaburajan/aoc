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

// TODO: Use raycasting to optimize this

function solve(input) {
  let map = input.split("\n").map((row) => row.split(""));

  let height = map.length,
    width = map[0].length;

  let iX, iY;

  map.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col == "^") {
        iY = i;
        iX = j;
      }
    });
  });

  let route = [];

  function testLoop(tMap) {
    let x = iX,
      y = iY;
    let dirX = 0,
      dirY = -1;

    let path = new Set();

    let setRoute = false;
    if (route.length == 0) setRoute = true;

    while (true) {
      cur = [x, y, dirX, dirY].join(",");

      if (path.has(cur)) return true;
      path.add(cur);

      if (setRoute)
        if (!route.some((arr) => arr.every((val, i) => val === [x, y][i])))
          route.push([x, y]);

      if (
        x + dirX < 0 ||
        y + dirY < 0 ||
        x + dirX >= width ||
        y + dirY >= height
      )
        return false;

      if (tMap[y + dirY][x + dirX] == "#") {
        if (dirY == 1) {
          dirX = -1;
          dirY = 0;
        } else if (dirY == -1) {
          dirX = 1;
          dirY = 0;
        } else if (dirX == 1) {
          dirY = 1;
          dirX = 0;
        } else if (dirX == -1) {
          dirY = -1;
          dirX = 0;
        }
        continue;
      }

      x += dirX;
      y += dirY;
    }
  }

  testLoop(map);

  let result = 0;

  route.forEach(([bx, by], i) => {
    if (bx == iX && by == iY) return;

    let temp = map.map(function (arr) {
      return arr.slice();
    });

    temp[by][bx] = "#";
    const test = testLoop(temp);

    if (test) result++;
  });

  print(result);
}
