import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js'));

let failed = 0;
for (const file of testFiles) {
  try {
    await import(`./${file}`);
    console.log(`\u2713 ${file}`);
  } catch (e) {
    failed++;
    console.error(`\u2717 ${file}`);
    console.error(e);
  }
}

if (failed > 0) {
  console.error(`${failed} test(s) failed.`);
  process.exit(1);
} else {
  console.log('All tests passed.');
}
