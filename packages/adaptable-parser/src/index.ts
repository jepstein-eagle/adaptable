import fs from "fs";
import path from "path";
// @ts-ignore
import { Parser } from "jison";

const file = path.join(__dirname, "./grammar.jison");
const grammar = fs.readFileSync(file, "utf8");

export default new Parser(grammar);
