import React, { useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { parser } from '../src/parser';
import { evalNode } from '../src/evaluator';
import { findPathTo } from '../src/utils';
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
  Button,
  ButtonGroup,
  Divider,
  ButtonProps,
} from '@chakra-ui/core';

function useSelectionRange<
  T extends HTMLInputElement | HTMLTextAreaElement
>(): [(node: T) => void, number, number] {
  const [range, setRange] = useState<[number, number]>([null, null]);

  const onSelectionChange = () => {
    const isActive = ref.current === document.activeElement;
    const start = isActive ? ref.current.selectionStart : null;
    const end = isActive ? ref.current.selectionEnd : null;
    setRange([start, end]);
  };

  const ref = useRef<T>();
  const refCallback = useCallback((newNode: T) => {
    const oldNode = ref.current;
    if (oldNode)
      document.removeEventListener('selectionchange', onSelectionChange);
    if (newNode)
      document.addEventListener('selectionchange', onSelectionChange);
    ref.current = newNode;
  }, []);

  return [refCallback, range[0], range[1]];
}

const functionNames = ['SUM', 'MIN', 'MAX', 'SQRT', 'YEAR', 'MONTH', 'DAY'];

const dragImage = new Image(0, 0);
dragImage.src =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [
    textAreaRefCallback,
    selectionStart,
    selectionEnd,
  ] = useSelectionRange();
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
  const columnNames = Object.keys(JSON.parse(columns));
  let ast, result, error, path, row;

  try {
    ast = parser.parse(expr);
    path = findPathTo(ast, cursor);
    row = JSON.parse(columns);
    result = evalNode(ast, { row });
  } catch (e) {
    error = e;
  }

  const smartButton = ({
    label,
    text = label,
    key,
    props,
  }: {
    label: string;
    text?: string;
    key?: any;
    props?: Partial<ButtonProps>;
  }) => (
    <Button
      size="sm"
      key={key}
      draggable={true}
      onDragStart={event => {
        event.dataTransfer.setData('text', text);
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }}
      onClick={() => {
        textAreaRef.current.focus();
        document.execCommand('insertText', false, text);
      }}
      style={{
        cursor: 'grab',
      }}
      {...props}
    >
      {label}
    </Button>
  );

  return (
    <Stack p={4} spacing={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Adaptable Parser
      </Text>
      <Stack direction="row" spacing={6}>
        <Box flex={6}>
          <Stack direction="row" spacing={4} mb={2}>
            <ButtonGroup spacing={0}>
              {smartButton({ label: '+' })}
              {smartButton({ label: '-' })}
              {smartButton({ label: '*' })}
              {smartButton({ label: '/' })}
              {smartButton({ label: '%' })}
              {smartButton({ label: '^' })}
            </ButtonGroup>
            <ButtonGroup spacing={0}>
              {smartButton({ label: 'AND' })}
              {smartButton({ label: 'OR' })}
            </ButtonGroup>
            <ButtonGroup spacing={0}>
              {smartButton({ label: '=' })}
              {smartButton({ label: '!=' })}
              {smartButton({ label: '<' })}
              {smartButton({ label: '>' })}
              {smartButton({ label: '<=' })}
              {smartButton({ label: '>=' })}
            </ButtonGroup>
          </Stack>
          <Textarea
            ref={node => {
              textAreaRefCallback(node);
              textAreaRef.current = node;
            }}
            flex={1}
            value={expr}
            onChange={e => setExpr(e.target.value)}
            height={150}
            fontFamily="mono"
            fontSize="sm"
          />

          {path && path.length ? (
            <Box backgroundColor="gray.600" mt={5} p={2}>
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
                </Stack>
              )}
            </Box>
          ) : null}
        </Box>
        <Box width={160}>
          <Text fontSize="lg" fontWeight="bold" mb={1} px={2} py={1}>
            Columns
          </Text>
          {columnNames.map((column, index) =>
            smartButton({
              label: column,
              text: `COL("${column}")`,
              key: index,
              props: { isFullWidth: true, justifyContent: 'start', mb: 1 },
            })
          )}
        </Box>
        <Box width={120}>
          <Text fontSize="lg" fontWeight="bold" mb={1} px={2} py={1}>
            Functions
          </Text>
          {functionNames.map((functionName, index) =>
            smartButton({
              label: functionName,
              text: `${functionName}()`,
              key: index,
              props: { isFullWidth: true, justifyContent: 'start', mb: 1 },
            })
          )}
        </Box>
      </Stack>

      <Divider />

      <Tabs variant="line" flex={1}>
        <TabList>
          <Tab>Evaluator</Tab>
          <Tab>Parser</Tab>
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
