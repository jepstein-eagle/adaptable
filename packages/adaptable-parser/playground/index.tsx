import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { parser } from '../src/parser';
import { evalNode } from '../src/evaluator';
import { tokenize } from '../src/tokenizer';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Stack,
  Textarea,
  Alert,
  AlertIcon,
  Code,
  Box,
  Text,
} from '@chakra-ui/core';

function Panel({ title, children, ...props }) {
  return (
    <Box {...props}>
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {title}
      </Text>
      {children}
    </Box>
  );
}

function App() {
  const [expr, setExpr] = useState('1 + 1');
  const [columns, setColumns] = useState(
    JSON.stringify(
      {
        A: 'Value A',
        B: 10,
      },
      null,
      2
    )
  );
  let tokens, ast, result, error;

  try {
    tokens = tokenize(parser, expr);
    ast = parser.parse(expr);
    result = evalNode(ast, { row: JSON.parse(columns) });
  } catch (e) {
    error = e;
  }

  return (
    <Stack p={4} spacing={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Adaptable Parser
      </Text>
      <Stack direction="row" spacing={6}>
        <Panel flex={2} title="Expression">
          <Textarea
            flex={1}
            value={expr}
            onChange={e => setExpr(e.target.value)}
            height={150}
            fontFamily="mono"
            fontSize="sm"
          />
        </Panel>
        <Panel flex={1} title="Columns">
          <Textarea
            flex={1}
            value={columns}
            onChange={e => setColumns(e.target.value)}
            height={150}
            fontFamily="mono"
            fontSize="sm"
          />
        </Panel>
      </Stack>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Stack direction="row" spacing={6}>
        <Panel flex={1} title="Evaluator Output">
          <Code display="block" px={4} py={2} fontSize="sm">
            <pre>{result && JSON.stringify(result, null, 2)}</pre>
          </Code>
        </Panel>
        <Panel flex={1} title="Parser Output">
          <Code display="block" px={4} py={2} fontSize="sm">
            <pre>{ast && JSON.stringify(ast, null, 2)}</pre>
          </Code>
        </Panel>
        <Panel flex={1} title="Tokenizer Output">
          <Code display="block" px={4} py={2} fontSize="sm">
            <pre>{tokens && JSON.stringify(tokens, null, 2)}</pre>
          </Code>
        </Panel>
      </Stack>
    </Stack>
  );
}

ReactDOM.render(
  <ThemeProvider>
    <ColorModeProvider value="dark">
      <CSSReset />
      <App />
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
