import assert from 'assert';
import { passages } from '../data/passages.js';

assert.strictEqual(typeof passages, 'object', 'passages should be an object');

// Explicitly check the known categories
// After restructuring passages now includes several specialized categories
const required = [
  'contextInference',
  'definitionMatch',
  'synonymContrast',
  'morphologicalAffix',
  'collocationCloze',
  'grammaticalRole',
  'connectorClue'
];
const expectedLevels = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

for (const cat of required) {
  assert.ok(cat in passages, `${cat} category should exist`);
  assert.strictEqual(
    typeof passages[cat],
    'object',
    `${cat} should be an object of levels`
  );
  for (const lvl of expectedLevels) {
    assert.ok(
      Array.isArray(passages[cat][lvl]),
      `${cat}.${lvl} should be an array`
    );
  }
}

// Validate every category has arrays for all expected levels
for (const [key, value] of Object.entries(passages)) {
  assert.strictEqual(
    typeof value,
    'object',
    `Category '${key}' should be an object`
  );
  for (const lvl of expectedLevels) {
    assert.ok(
      Array.isArray(value[lvl]),
      `${key}.${lvl} should be an array`
    );
     }
}
// Verify each wordBox entry has a matching definition
for (const [catName, levels] of Object.entries(passages)) {
  for (const [lvl, arr] of Object.entries(levels)) {
    arr.forEach((p, idx) => {
      assert.ok(Array.isArray(p.wordBox), `${catName}.${lvl}[${idx}].wordBox should be an array`);
      assert.ok(Array.isArray(p.definitions), `${catName}.${lvl}[${idx}].definitions should be an array`);
      assert.strictEqual(p.wordBox.length, p.definitions.length,
        `${catName}.${lvl}[${idx}] definitions should match wordBox length`);
    });
  }
}

console.log('passages.test.js completed');
