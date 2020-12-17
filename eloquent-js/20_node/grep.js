/* Grep
 * Given regex pattern and one or more files, find pattern in files
 */
const { readdir, readFile, stat } = require("fs").promises;
const { join } = require("path");

const pattern = new RegExp(process.argv[2]);
const isMatch = async (target) => {
  return pattern.test(await readFile(target, "utf-8"));
};

const grep = async (targets, cwd = "") => {
  targets.forEach(async (target) => {
    let path = join(cwd, target);
    let stats;
    try {
      stats = await stat(path);
    } catch (error) {
      if (error.code != "ENOENT") throw error;
      console.error(`Error: file ${path} doesn't exist`);
      return;
    }

    if (stats.isDirectory()) {
      return grep(await readdir(path), path);
    }

    if (await isMatch(path)) console.log(path);
  });
};

grep(process.argv.slice(3));
