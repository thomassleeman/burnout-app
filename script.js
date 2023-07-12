const fs = require("fs");
const path = require("path");

const serviceAccount = fs
  .readFileSync(path.join(__dirname, "_adminCredentials.json"))
  .toString();

console.log(JSON.stringify(serviceAccount).replace(/\\/g, "\\\\"));
