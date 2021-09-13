import { getAllFilePaths } from "../src/utils";
import path from "path";

describe("UTILS - getAllFilePaths", () => {
  it("should return an array of all the file paths inside a folder", async () => {
    const testDir = path.resolve(__dirname, "mock");
    const fileAr = await getAllFilePaths(testDir);
    expect(fileAr).toHaveLength(8);
    expect(fileAr).toEqual(
      expect.arrayContaining([
        path.resolve(__dirname, "mock", "index.ts"),
        path.resolve(__dirname, "mock", "dirA", "main.go"),
        path.resolve(__dirname, "mock", "dirA", "mock.go"),
        path.resolve(__dirname, "mock", "dirB", "abc.py"),
        path.resolve(__dirname, "mock", "dirB", "xyz.py"),
        path.resolve(__dirname, "mock", "dirC", "index.js"),
        path.resolve(__dirname, "mock", "dirC", "src", "anotherMock.js"),
        path.resolve(__dirname, "mock", "dirC", "src", "mockmodule.js"),
      ])
    );
  });

  it("should return an empty array if folder is invalid", async () => {
    const testDir = path.resolve(__dirname, "invalidfolder");
    expect(await getAllFilePaths(testDir)).toHaveLength(0);
  });
});
