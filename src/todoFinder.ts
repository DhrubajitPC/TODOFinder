import fs from "fs";
import readline from "readline";
import { extensionCommentMap } from "./utils";

export async function hasKeyword(
  filePath: string,
  keyword: string,
  inComment: boolean
): Promise<boolean> {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  const filePathArr = filePath.split(".");
  const ext = filePathArr[filePathArr.length - 1];

  const regexp = inComment
    ? new RegExp(`${extensionCommentMap[ext]}(.+)`, "g")
    : new RegExp(keyword, "g");

  try {
    for await (const line of rl) {
      const match: Array<string> | null = line.match(regexp);
      if (!match) continue;
      const comment = match[0];
      if (comment.includes(keyword)) {
        return true;
      }
    }
  } catch (e) {
    console.error("error while reading file: ", filePath, e);
  } finally {
    rl.close();
    readStream.close();
  }
  return false;
}

export async function filterFilesForKeyword(
  files: Array<string>,
  keyword: string,
  inComment: boolean
) {
  const isKeywordInFiles: Array<boolean> = await Promise.all(
    files.map((filePath) => hasKeyword(filePath, keyword, inComment))
  );

  const filesWithTodo: Array<string> = files.filter(
    (_, i) => isKeywordInFiles[i]
  );

  return filesWithTodo;
}
