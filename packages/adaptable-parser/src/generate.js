const fs = require('fs');
const path = require('path');
const { Parser } = require('jison');

const file = path.join(__dirname, './grammar.jison');
const grammar = fs.readFileSync(file, 'utf8');
const parser = new Parser(grammar);
const source = parser.generate();

fs.writeFileSync(path.join(__dirname, './parser.js'), source);
