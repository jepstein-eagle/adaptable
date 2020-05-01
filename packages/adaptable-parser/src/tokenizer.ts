import { Token } from './types';

export function tokenize(parser: any, input: string) {
  const tokens: Token[] = [];
  const lexer = parser.lexer;

  lexer.setInput(input);

  while (!lexer.done) {
    const id = lexer.lex();
    const location = lexer.matched.length;

    tokens.push({
      type: parser.terminals_[id],
      value: lexer.yytext,
      range: [location - lexer.yytext.length, location],
    });
  }

  // remove eof
  tokens.pop();

  return tokens;
}
