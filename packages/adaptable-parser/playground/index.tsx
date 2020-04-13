import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { parser } from '../src/parser';
import { evalNode } from '../src/evaluator';
import { tokenize } from '../src/tokenizer';
import { getCurrentToken, findPathTo } from '../src/utils';
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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  Button,
  ButtonGroup,
  Flex,
  Divider,
} from '@chakra-ui/core';
import { useEffect } from 'react';
import { useCallback } from 'react';

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

function useSelectionRange<
  T extends HTMLInputElement | HTMLTextAreaElement
>(): [(node: T) => void, number, number] {
  const [selectionRange, setSelectionRange] = useState<[number, number]>([
    null,
    null,
  ]);

  const updateSelectionRange = (event: KeyboardEvent | FocusEvent) => {
    const { selectionStart, selectionEnd } = event.target as T;
    if (
      selectionStart !== selectionRange[0] ||
      selectionEnd !== selectionRange[1]
    ) {
      setSelectionRange([selectionStart, selectionEnd]);
    }
  };

  const inputRef = useRef<T>();
  const inputRefCallback = useCallback((newNode: T) => {
    const oldNode = inputRef.current;

    if (oldNode) {
      oldNode.removeEventListener('keyup', updateSelectionRange);
      oldNode.removeEventListener('click', updateSelectionRange);
    }

    if (newNode) {
      newNode.addEventListener('keyup', updateSelectionRange);
      newNode.addEventListener('click', updateSelectionRange);
    }

    inputRef.current = newNode;
  }, []);

  return [inputRefCallback, selectionRange[0], selectionRange[1]];
}

const keywords = ['COL', 'SUM', 'MIN', 'MAX', 'SQRT'];

function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [inputRefCallback, selectionStart, selectionEnd] = useSelectionRange();
  const cursor = selectionStart === selectionEnd ? selectionStart : null;

  const [expr, setExpr] = useState('1 + COL("Ask")');
  const [columns, setColumns] = useState(
    JSON.stringify(
      {
        Country: 'France',
        Price: 10,
        Bid: 15.5,
        Ask: 23.21,
        IsLive: true,
      },
      null,
      2
    )
  );
  let tokens, currentToken, ast, result, error, suggestions, path, row;

  try {
    tokens = tokenize(parser, expr);
    currentToken = cursor !== null ? getCurrentToken(tokens, cursor) : null;
    if (currentToken && currentToken.type === 'FUNCTION') {
      suggestions = keywords.filter(
        keyword => keyword.indexOf(currentToken.value.toUpperCase()) === 0
      );
    } else {
      suggestions = keywords;
    }
    ast = parser.parse(expr);
    path = findPathTo(ast, cursor);
    row = JSON.parse(columns);
    result = evalNode(ast, { row });
  } catch (e) {
    error = e;
  }

  const toolbarButton = (content: string, index?: number) => (
    <Button
      key={index}
      size="xs"
      onClick={() => {
        textAreaRef.current.focus();
        document.execCommand('insertText', false, content);
        textAreaRef.current.dispatchEvent(new Event('click'));
      }}
    >
      {content}
    </Button>
  );

  const functionButton = (content: string, index: number) => (
    <Button
      key={index}
      size="xs"
      onClick={() => {
        textAreaRef.current.focus();
        if (currentToken && currentToken.type === 'FUNCTION') {
          textAreaRef.current.selectionStart = currentToken.range[0];
          textAreaRef.current.selectionEnd = currentToken.range[1];
        }
        document.execCommand('insertText', false, `${content}()`);
        textAreaRef.current.selectionStart -= 1;
        textAreaRef.current.selectionEnd -= 1;
        textAreaRef.current.dispatchEvent(new Event('click'));
      }}
    >
      {content}
    </Button>
  );

  return (
    <Stack p={4} spacing={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Adaptable Parser
      </Text>
      <Stack direction="row" spacing={6}>
        <Box flex={2}>
          <Stack direction="row" spacing={4} mb={2}>
            <ButtonGroup spacing={0}>
              {toolbarButton(' + ')}
              {toolbarButton(' - ')}
              {toolbarButton(' * ')}
              {toolbarButton(' / ')}
              {toolbarButton(' % ')}
              {toolbarButton(' ^ ')}
            </ButtonGroup>
            <ButtonGroup spacing={0}>
              {toolbarButton(' AND ')}
              {toolbarButton(' OR ')}
            </ButtonGroup>
            <ButtonGroup spacing={0}>
              {toolbarButton(' = ')}
              {toolbarButton(' != ')}
              {toolbarButton(' < ')}
              {toolbarButton(' > ')}
              {toolbarButton(' <= ')}
              {toolbarButton(' >= ')}
            </ButtonGroup>
            <ButtonGroup spacing={0}>
              {suggestions && suggestions.map(functionButton)}
            </ButtonGroup>
          </Stack>
          <Textarea
            ref={node => {
              inputRefCallback(node);
              textAreaRef.current = node;
            }}
            flex={1}
            value={expr}
            onChange={e => setExpr(e.target.value)}
            height={150}
            fontFamily="mono"
            fontSize="sm"
          />
          {currentToken ? (
            <Code display="flex" justifyContent="space-between">
              <span>
                {currentToken.type}{' '}
                {currentToken.type !== currentToken.value
                  ? currentToken.value
                  : ''}{' '}
                ({currentToken.range[0]}..{currentToken.range[1]})
              </span>
              <span>
                {path &&
                  path.map((node, index) => (
                    <span key={index}>
                      {node.type} {index < path.length - 1 ? ' => ' : ''}
                    </span>
                  ))}
              </span>
            </Code>
          ) : (
            <Code display="block">&nbsp;</Code>
          )}
          {path && path.length && (
            <Box backgroundColor="gray.600" mt={5} p={2}>
              <Text fontSize="lg" mb={1}>
                {path[0].type} Function
              </Text>
              {path[0].type === 'ADD' && (
                <Stack spacing={1}>
                  <Code display="block">
                    add(arg1: number, arg1: number): number
                  </Code>
                  <Text>Documentation for this function</Text>
                </Stack>
              )}
              {path[0].type === 'COL' && (
                <Stack spacing={1}>
                  <Code display="block">col(name: string): any</Code>
                  <Text>Documentation for this function</Text>
                  {row && (
                    <ButtonGroup spacing={0}>
                      {Object.keys(row).map((col, index) =>
                        toolbarButton(`"${col}"`, index)
                      )}
                    </ButtonGroup>
                  )}
                </Stack>
              )}
            </Box>
          )}
        </Box>

        <Tabs variant="line" flex={1}>
          <TabList>
            <Tab>Evaluator</Tab>
            <Tab>Parser</Tab>
            <Tab>Tokenizer</Tab>
            <Tab>Context</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {result && (
                <Code display="block" p={2} fontSize="sm">
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </Code>
              )}
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error.message}
                </Alert>
              )}
            </TabPanel>
            <TabPanel>
              <Code display="block" p={2} fontSize="sm">
                <pre>{ast && JSON.stringify(ast, null, 2)}</pre>
              </Code>
            </TabPanel>
            <TabPanel>
              <Code display="block" p={2} fontSize="sm">
                <pre>{tokens && JSON.stringify(tokens, null, 2)}</pre>
              </Code>
            </TabPanel>
            <TabPanel>
              <Textarea
                value={columns}
                onChange={e => setColumns(e.target.value)}
                height={150}
                fontFamily="mono"
                fontSize="sm"
                p={2}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
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
