const fs = require('fs');
const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

let r = 0, c = 50;

input.split("\n").forEach((t) => {
	let d = t[0] == "L" ? -1 : 1;
	let m = Number(t.substr(1);
	while (m > 0) {
		c += d;
		if (c == -1) c = 99;
		if (c == 100) c = 0;
		if (c == 0) r++;
		m--;
	}
	console.log(t + " " + c);
});

console.log(r);
