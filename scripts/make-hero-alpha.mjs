import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PNG } = require("pngjs");

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error("Usage: node make-hero-alpha.mjs input.png output.png");

const source = PNG.sync.read(fs.readFileSync(inputPath));
const { width, height, data } = source;
const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let head = 0;
let tail = 0;

function isBackground(index) {
  const offset = index * 4;
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return min >= 246 && max - min <= 10;
}

function enqueue(index) {
  if (visited[index] || !isBackground(index)) return;
  visited[index] = 1;
  queue[tail++] = index;
}

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}
for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (head < tail) {
  const index = queue[head++];
  const x = index % width;
  const y = Math.floor(index / width);
  if (x > 0) enqueue(index - 1);
  if (x + 1 < width) enqueue(index + 1);
  if (y > 0) enqueue(index - width);
  if (y + 1 < height) enqueue(index + width);
}

for (let index = 0; index < visited.length; index += 1) {
  if (visited[index]) data[index * 4 + 3] = 0;
}

// Feather only the immediate contour touching the removed background.
for (let y = 1; y < height - 1; y += 1) {
  for (let x = 1; x < width - 1; x += 1) {
    const index = y * width + x;
    if (visited[index]) continue;
    const touchesBackground = visited[index - 1] || visited[index + 1] || visited[index - width] || visited[index + width];
    if (!touchesBackground) continue;
    const offset = index * 4;
    const distanceFromWhite = Math.hypot(255 - data[offset], 255 - data[offset + 1], 255 - data[offset + 2]);
    if (distanceFromWhite < 34) data[offset + 3] = Math.max(24, Math.min(255, Math.round(distanceFromWhite * 8)));
  }
}

fs.writeFileSync(outputPath, PNG.sync.write(source));
