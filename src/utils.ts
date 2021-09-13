import fsp from "fs/promises";
import fs from "fs";
import path from "path";

export const extensionCommentMap: Record<string, string> = {
  js: "//",
  jsx: "//",
  ts: "//",
  tsx: "//",
  go: "//",
  py: "#",
};

export async function getAllFilePaths(dirPath: string): Promise<Array<string>> {
  const files: Array<string> = [];

  async function populateArr(dirPath: string) {
    if (!fs.existsSync(dirPath)) return;

    try {
      const filesAndFolders = await fsp.readdir(dirPath, {
        withFileTypes: true,
      });
      const dirs: Array<string> = [];
      for (let f of filesAndFolders) {
        const fullPath = path.resolve(dirPath, f.name);
        if (f.isFile()) files.push(fullPath);
        else dirs.push(fullPath);
      }

      for (let d of dirs) {
        await populateArr(d);
      }
    } catch (e) {
      console.error(
        "Oops, something went wrong when reading the directory: ",
        e
      );
    }
  }

  await populateArr(dirPath);
  return files;
}

export function printHelp() {
  console.log(`
  ToDoFinder is a tool to search for keywords inside files inside a directory.\n
  Usage: \n
  \t --folder, -f: Path to the folder in which to search for keyword \n
  \t --keyword, -k: Keyword to search for in folder. Default is TODO \n
  \t --comment, -c: A boolean flag to search only in comments. Default is false \n
  `);
}
