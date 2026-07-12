import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../public/favicon.svg", import.meta.url));
const render = (size) => sharp(svg).resize(size, size).png().toBuffer();
const [small, large, touchIcon] = await Promise.all([
  render(32),
  render(64),
  render(180),
]);

const images = [
  { size: 32, data: small },
  { size: 64, data: large },
];
const directory = Buffer.alloc(6 + images.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(images.length, 4);

let offset = directory.length;
images.forEach(({ size, data }, index) => {
  const entry = 6 + index * 16;
  directory.writeUInt8(size, entry);
  directory.writeUInt8(size, entry + 1);
  directory.writeUInt8(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(data.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});

await Promise.all([
  writeFile(
    new URL("../public/favicon.ico", import.meta.url),
    Buffer.concat([directory, ...images.map(({ data }) => data)]),
  ),
  writeFile(
    new URL("../public/apple-touch-icon.png", import.meta.url),
    touchIcon,
  ),
]);
