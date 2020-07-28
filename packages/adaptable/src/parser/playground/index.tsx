import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import { render } from 'react-dom';
import { parse, findPathTo, defaultFunctions } from '../src';
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
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
} from '@chakra-ui/core';
import { FunctionMap } from '../src/types';

const functions = defaultFunctions;

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

const dragImage = new Image(0, 0);
dragImage.src =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

function App() {
  const initialFocusRef = useRef();
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [
    textAreaRefCallback,
    selectionStart,
    selectionEnd,
  ] = useSelectionRange();
  const cursor = selectionStart === selectionEnd ? selectionStart : null;

  const [expr, setExpr] = useState('1 + COL("Ask")');
  const [data, setData] = useState({
    Country: 'France',
    Price: 10,
    Bid: 15.5,
    Ask: 23.21,
    IsLive: true,
  });
  const [searchColumns, setSearchColumns] = useState('');
  const [searchFunctions, setSearchFunctions] = useState('');
  let e, result, error, path;

  try {
    e = parse(expr);
    path = findPathTo(e.ast, cursor);
    result = e.evaluate({ data });
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
        document.getSelection().empty();
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
            <Box flex={1} />
            <Popover initialFocusRef={initialFocusRef} placement="bottom-end">
              <PopoverTrigger>
                <Button size="sm">Functions</Button>
              </PopoverTrigger>
              <PopoverContent zIndex={4} width={200}>
                <PopoverBody maxHeight={300} overflowY="auto" p={2}>
                  <Input
                    ref={initialFocusRef}
                    size="sm"
                    placeholder="Functions"
                    value={searchFunctions}
                    onChange={e => setSearchFunctions(e.target.value)}
                  />
                  {Object.keys(functions)
                    .filter(
                      f =>
                        f
                          .toLowerCase()
                          .indexOf(searchFunctions.toLowerCase()) !== -1
                    )
                    .map((functionName, index) =>
                      smartButton({
                        label: functionName,
                        text: `${functionName}()`,
                        key: index,
                        props: { isFullWidth: true, justifyContent: 'start' },
                      })
                    )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
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
              {functions[path[0].type] && functions[path[0].type].docs ? (
                functions[path[0].type].docs.map((doc, index) =>
                  doc.type === 'code' ? (
                    <code key={index}>
                      <pre>{doc.content}</pre>
                    </code>
                  ) : doc.type === 'paragraph' ? (
                    <p key={index}>{doc.content}</p>
                  ) : null
                )
              ) : (
                <p>
                  No docs for <b>{path[0].type}</b>
                </p>
              )}
            </Box>
          ) : null}
        </Box>
        <Box width={220} height={300} overflowY="auto">
          <Input
            size="sm"
            mb={2}
            placeholder="Columns"
            value={searchColumns}
            onChange={e => setSearchColumns(e.target.value)}
          />
          {Object.keys(data)
            .filter(
              c => c.toLowerCase().indexOf(searchColumns.toLowerCase()) !== -1
            )
            .map((column, index) => (
              <Flex key={index} direction="row">
                {smartButton({
                  label: column,
                  text: `COL("${column}")`,
                  // key: index,
                  props: {
                    isFullWidth: true,
                    justifyContent: 'start',
                    flex: 1,
                    borderRadius: 0,
                  },
                })}
                <Input
                  size="sm"
                  flex={1}
                  borderRadius={0}
                  value={data[column]}
                  onChange={e => setData({ ...data, [column]: e.target.value })}
                />
              </Flex>
            ))}
        </Box>
      </Stack>

      <Divider />

      <Tabs variant="line" flex={1}>
        <TabList>
          <Tab>Evaluator</Tab>
          <Tab>Parser</Tab>
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
              <pre>{e && e.ast && JSON.stringify(e.ast, null, 2)}</pre>
            </Code>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

render(
  <ThemeProvider>
    <ColorModeProvider value="dark">
      <CSSReset />
      <App />
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
