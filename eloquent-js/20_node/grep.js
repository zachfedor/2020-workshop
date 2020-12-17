/* Grep
 * Given regex pattern and one or more files, find pattern in files
 */
const { readFile } = require("fs").promises;

const pattern = new RegExp(process.argv[2]);
const targets = process.argv.slice(3);

Promise.all(
  targets.map(async (target) => {
    // TODO: check for directory
    const text = await readFile(target, "utf-8");
    return pattern.test(text) ? target : null;
  })
).then((results) => {
  results
    .filter((result) => result)
    .forEach((result) => {
      console.log(result);
    });
});
