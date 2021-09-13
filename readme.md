#  TODOFinder

TODOFinder is a tool to search for keywords inside files inside a directory.

## Up and Running 

Install the dependencies

```bash
npm install
```

To run pass in the directory argument

```bash
npm start -- -f [directory]

npm start -- -f [directory] -k [keyword]

npm start -- -f [directory] -k [keyword] -c
```

The different arguments

| flag            | Description              | Required | Default |
|-----------------|--------------------------|----------| ------- |
| -f, --folder    | search directory path    | true     |         |
| -k, --keyword   | keyword to search for    | false    | TODO    |
| -c, --comment   | search only in comments  | false    | false   |

example:

```bash
npm start --- -f tests -k TODO -c
```

## Improvements

The tool currently only searches for text in single commented out lines. In practice, it's possible that some languages can have multiline comment blocks. For example, in javascript we can start a comment with `//` and we can also have multiline comment:

```javascript
/*
 * i am a multiline comment
 */
```

Furthermore, there are special cases where there can be different ways of commenting in the same type of file. For example, if we are writing react code in a `.js` file:

```javascript
import React from "react";
// comment here

const App = () => <div>{/* some other comment here */}</div>;
```

Future improvement can address this use case.
