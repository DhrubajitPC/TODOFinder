import path from "path";
import { filterFilesForKeyword, hasKeyword } from "../src/todoFinder";

describe("TODOFINDER - hasKeyword", () => {
  it("should return true if file has keyword", async () => {
    const filePath = path.resolve(__dirname, "mock", "index.ts");
    expect(await hasKeyword(filePath, "TODO", false)).toBe(true);
  });

  it("should return false if file does not have keyword", async () => {
    const filePath = path.resolve(__dirname, "mock", "index.ts");
    expect(await hasKeyword(filePath, "TO DO", false)).toBe(false);
  });

  it("should return true if file has keyword only in comments with comments flag on", async () => {
    const filePath = path.resolve(__dirname, "mock", "index.ts");
    expect(await hasKeyword(filePath, "TODO", true)).toBe(true);
  });

  it("should return false if file has keyword not in comments with comments flag on", async () => {
    const filePath = path.resolve(
      __dirname,
      "mock",
      "dirC",
      "src",
      "anotherMock.js"
    );
    expect(await hasKeyword(filePath, "TODO", true)).toBe(false);
  });
});

describe("TODOFINDER - filterFilesForKeyword", () => {
  const files = [
    path.resolve(__dirname, "mock", "index.ts"),
    path.resolve(__dirname, "mock", "dirA", "main.go"),
    path.resolve(__dirname, "mock", "dirB", "abc.py"),
    path.resolve(__dirname, "mock", "dirC", "src", "anotherMock.js"),
  ];

  it("should return a array of files with keyword", async () => {
    expect(await filterFilesForKeyword(files, "TODO", false)).toHaveLength(3);
    expect(await filterFilesForKeyword(files, "TODO", true)).toHaveLength(2);
  });
});
