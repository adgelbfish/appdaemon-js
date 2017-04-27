import fs from "fs";

const readFilePromise = (filePathWithName, encoding) => new Promise((resolve, reject) => {
  fs.readFile(filePathWithName, encoding, (err, content) => {
    err ? reject(err) : resolve(content)
  })
});