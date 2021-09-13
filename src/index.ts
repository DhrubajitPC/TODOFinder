import arg from "arg";
import fs from "fs";
import { filterFilesForKeyword } from "./todoFinder";
import { getAllFilePaths, printHelp } from "./utils";

const args = arg(
  {
    "--folder": String,
    "-f": "--folder",
    "--keyword": String,
    "-k": "--keyword",
    "--comment": Boolean,
    "-c": "--comment",
  },
  { permissive: false }
);

// No arguments
if (Object.entries(args).length < 2) {
  printHelp();
  process.exit(0);
}

const FOLDER_PATH = args["--folder"];
const KEYWORD = args["--keyword"] || "TODO"; // default is TODO
const ONLY_COMMENTS = args["--comment"] ?? false; // default: search for keyword in whole

if (!FOLDER_PATH) {
  console.error("You must enter a folder to search in.");
  process.exit(1);
}

if (!fs.existsSync(FOLDER_PATH)) {
  console.error("Entered folder path doesn't exist: ", FOLDER_PATH);
  process.exit(1);
}

(async function main() {
  try {
    const t1 = new Date().getTime();

    const files: Array<string> = await getAllFilePaths(FOLDER_PATH);

    const filesWithKeyword: Array<string> = await filterFilesForKeyword(
      files,
      KEYWORD,
      ONLY_COMMENTS
    );

    console.log(`Searched ${files.length} files:`);
    console.log(`Found ${filesWithKeyword.length} file(s) with ${KEYWORD}:`);

    filesWithKeyword.forEach((p) => console.log(p));

    const t2 = new Date().getTime();
    console.log(`Time taken: ${(t2 - t1) / 1000} seconds`);
  } catch (e) {
    console.error("oops, something went wrong ", e);
  }
})();
