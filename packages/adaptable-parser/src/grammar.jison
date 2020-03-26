/* lexical grammar */

%lex
%%

(\r?\n)+\s*           return 'NEWLINE';
[^\S\r\n]+            /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
\"[^"]+\"             return 'STRING'
"&"|"AND"             return '&'
"!="                  return '!='
">="                  return '>='
"<="                  return '<='
"="                   return '='
">"                   return '>'
"<"                   return '<'
"|"|"OR"              return '|'
"!"|NOT               return '!'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
","                   return ','
"?"                   return '?'
":"                   return ':'
"TRUE"                return 'TRUE'
"FALSE"               return 'FALSE'
[A-Z_]+               return 'FUNCTION'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '?' ':'
%left '=' '!=' '<' '<=' '>' '>='
%left '&' '|'
%left '+' '-'
%left '*' '/'
%left '^'
%left '!'
%left UMINUS

/* language grammar */

%start program

%%

program
    : EOF
        { return []; }
    | expressions EOF
        { return $1; }
    ;

expressions
    : e
        { $$ = [$1]; }
    | expressions NEWLINE
        { $$ = $1; }
    | expressions NEWLINE e
        { $$ = $1.concat([$3]); }
    ;

args
  : args ',' e { $$ = $1.concat([$3]); }
  | e { $$ = [$1]; }
  ;

e
  : e '+' e                 {$$ = { type: 'ADD', args: [$1, $3] };}
  | e '-' e                 {$$ = { type: 'SUB', args: [$1, $3] };}
  | e '*' e                 {$$ = { type: 'MUL', args: [$1, $3] };}
  | e '/' e                 {$$ = { type: 'DIV', args: [$1, $3] };}
  | e '^' e                 {$$ = { type: 'POW', args: [$1, $3] };}
  | e '|' e                 {$$ = { type: 'OR', args: [$1, $3] };}
  | '!' e                   {$$ = { type: 'NOT', args: [$2] };}
  | e '&' e                 {$$ = { type: 'AND', args: [$1, $3] };}
  | e '=' e                 {$$ = { type: 'EQ', args: [$1, $3] };}
  | e '!=' e                {$$ = { type: 'NEQ', args: [$1, $3] };}
  | e '<' e                 {$$ = { type: 'LT', args: [$1, $3] };}
  | e '<=' e                {$$ = { type: 'LTE', args: [$1, $3] };}
  | e '>' e                 {$$ = { type: 'GT', args: [$1, $3] };}
  | e '>=' e                {$$ = { type: 'GTE', args: [$1, $3] };}
  | e '?' e ':' e           {$$ = { type: 'IF', args: [$1, $3, $5] };}
  | '-' e %prec UMINUS      {$$ = -$2;}
  | '(' e ')'               {$$ = $2;}
  | TRUE                    {$$ = true;}
  | FALSE                   {$$ = false;}
  | NUMBER                  {$$ = Number($NUMBER);}
  | STRING                  {$$ = $STRING.slice(1, -1);}
  | FUNCTION '(' args ')'   {$$ = { type: $FUNCTION, args: $args };}
  ;
