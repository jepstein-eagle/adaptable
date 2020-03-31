/* lexical grammar */

%lex
%options ranges

%{

yy.node = function(type, args, location) {
  return {
    type,
    args,
    range: location.range
  }
}

%}

%%

(\r?\n)+\s*           return 'NEWLINE';
[^\S\r?\n]+            /* skip whitespace */
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
"%"                   return '%'
"^"                   return '^'
"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
","                   return ','
"?"                   return '?'
":"                   return ':'
"TRUE"                return 'TRUE'
"FALSE"               return 'FALSE'
[a-zA-Z_]+            return 'FUNCTION'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '?' ':'
%left '=' '!=' '<' '<=' '>' '>='
%left '&' '|'
%left '+' '-'
%left '*' '/' '%'
%left '^'
%left '!'
%left UMINUS

/* language grammar */

%start program

%%

program
  : EOF                     { return []; }
  | expressions EOF         { return $1; }
  ;

expressions
  : e { $$ = [$1]; }
  | expressions NEWLINE     { $$ = $1; }
  | expressions NEWLINE e   { $$ = $1.concat([$3]); }
  ;

args
  : e                       { $$ = [$1]; }
  | args ',' e              { $$ = $1.concat([$3]); }
  ;

e
  /* literal */
  : TRUE                    { $$ = true; }
  | FALSE                   { $$ = false; }
  | NUMBER                  { $$ = Number($NUMBER); }
  | STRING                  { $$ = $STRING.slice(1, -1); }
  | '[' args ']'            { $$ = $2; }
  /* math */
  | e '+' e                 { $$ = yy.node('ADD', [$1, $3], @$); }
  | e '-' e                 { $$ = yy.node('SUB', [$1, $3], @$); }
  | e '*' e                 { $$ = yy.node('MUL', [$1, $3], @$); }
  | e '/' e                 { $$ = yy.node('DIV', [$1, $3], @$); }
  | e '%' e                 { $$ = yy.node('MOD', [$1, $3], @$); }
  | e '^' e                 { $$ = yy.node('POW', [$1, $3], @$); }
  /* logic */
  | e '|' e                 { $$ = yy.node('OR', [$1, $3], @$); }
  | e '&' e                 { $$ = yy.node('AND', [$1, $3], @$); }
  | '!' e                   { $$ = yy.node('NOT', [$2], @$); }
  | e '?' e ':' e           { $$ = yy.node('IF', [$1, $3, $5], @$); }
  /* compare */
  | e '=' e                 { $$ = yy.node('EQ', [$1, $3], @$); }
  | e '!=' e                { $$ = yy.node('NEQ', [$1, $3], @$); }
  | e '<' e                 { $$ = yy.node('LT', [$1, $3], @$); }
  | e '<=' e                { $$ = yy.node('LTE', [$1, $3], @$); }
  | e '>' e                 { $$ = yy.node('GT', [$1, $3], @$); }
  | e '>=' e                { $$ = yy.node('GTE', [$1, $3], @$); }
  /* other */
  | FUNCTION '(' args ')'   { $$ = yy.node($FUNCTION.toUpperCase(), $args, @$); }
  | '-' e %prec UMINUS      { $$ = -$2; }
  | '(' e ')'               { $$ = $2; }
  ;
