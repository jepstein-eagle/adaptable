import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { parse } from '../src/parser';
import { evalNode } from '../src/evaluator';
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
  let ast, result, error;

  try {
    ast = parse(expr);
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
        <Panel flex={1} title="Expression">
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
        {result && (
          <Panel flex={1} title="Evaluator Output">
            <Code display="block" px={4} py={2} fontSize="sm">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </Code>
          </Panel>
        )}
        {ast && (
          <Panel flex={1} title="Parser Output">
            <Code display="block" px={4} py={2} fontSize="sm">
              <pre>{JSON.stringify(ast, null, 2)}</pre>
            </Code>
          </Panel>
        )}
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
