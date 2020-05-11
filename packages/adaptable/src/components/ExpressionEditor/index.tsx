import * as React from 'react';
import { AdaptableColumn } from '../../types';
import { FunctionMap } from 'adaptable-parser/src/types';
import useSelectionRange from '../utils/useSelectionRange';
import { useState } from 'react';
import { parse, findPathTo } from 'adaptable-parser';
import OverlayTrigger from '../OverlayTrigger';
import { Flex, Box } from 'rebass';
import EditorButton from './EditorButton';
import SimpleButton from '../SimpleButton';
import { Icon } from '@mdi/react';
import Textarea from '../Textarea';
import FormLayout, { FormRow } from '../FormLayout';
import Input from '../Input';
import CheckBox from '../CheckBox';
import {
  mdiPlus,
  mdiMinus,
  mdiMultiplication,
  mdiDivision,
  mdiPercent,
  mdiExponent,
  mdiEqual,
  mdiNotEqual,
  mdiLessThan,
  mdiGreaterThan,
  mdiLessThanOrEqual,
  mdiGreaterThanOrEqual,
  mdiDrag,
  mdiFunction,
} from '@mdi/js';
import ErrorBox from '../ErrorBox';

interface ExpressionEditorProps {
  value?: string;
  onChange?: (event: React.FormEvent) => void;
  initialData: { [key: string]: any };
  columns: AdaptableColumn[];
  functions: FunctionMap;
}

function ExpressionEditor(props: ExpressionEditorProps) {
  const [textAreaRefCallback, textAreaRef, selectionStart, selectionEnd] = useSelectionRange();
  const cursor = selectionStart === selectionEnd ? selectionStart : null;
  const [data, setData] = useState(props.initialData);
  let result, error, currentFunction;

  try {
    const expr = parse(props.value);
    result = expr.evaluate({ data });
    const path = findPathTo(expr.ast, cursor);
    currentFunction = path[0] ? path[0].type : null;
  } catch (e) {
    error = e;
  }

  const functionsDropdown = (
    <OverlayTrigger
      render={() => (
        <Flex
          flexDirection="column"
          backgroundColor="white"
          p={2}
          style={{
            fontSize: 'var(--ab-font-size-2)',
            border: '1px solid var(--ab-color-primarydark)',
            borderRadius: 'var(--ab__border-radius)',
            background: 'var(--ab-color-primarylight)',
            zIndex: 1000,
          }}
        >
          {Object.keys(props.functions).map(functionName =>
            props.functions[functionName].hidden ? null : (
              <EditorButton
                data={`${functionName}()`}
                textAreaRef={textAreaRef}
                key={functionName}
                mr={1}
              >
                {functionName}
              </EditorButton>
            )
          )}
        </Flex>
      )}
      showEvent="click"
      hideEvent="blur"
    >
      <SimpleButton mr={1}>
        <Icon size="1rem" path={mdiFunction} />
      </SimpleButton>
    </OverlayTrigger>
  );

  const operatorButtons = (
    <>
      <EditorButton data="+" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiPlus} />
      </EditorButton>
      <EditorButton data="-" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiMinus} />
      </EditorButton>
      <EditorButton data="*" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiMultiplication} />
      </EditorButton>
      <EditorButton data="/" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiDivision} />
      </EditorButton>
      <EditorButton data="%" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiPercent} />
      </EditorButton>
      <EditorButton data="^" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiExponent} />
      </EditorButton>
      <EditorButton data="=" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiEqual} />
      </EditorButton>
      <EditorButton data="!=" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiNotEqual} />
      </EditorButton>
      <EditorButton data="<" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiLessThan} />
      </EditorButton>
      <EditorButton data=">" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiGreaterThan} />
      </EditorButton>
      <EditorButton data="<=" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiLessThanOrEqual} />
      </EditorButton>
      <EditorButton data=">=" textAreaRef={textAreaRef}>
        <Icon size="1rem" path={mdiGreaterThanOrEqual} />
      </EditorButton>
      <EditorButton data="AND" textAreaRef={textAreaRef}>
        AND
      </EditorButton>
      <EditorButton data="OR" textAreaRef={textAreaRef}>
        OR
      </EditorButton>
    </>
  );

  const functionDocs = currentFunction ? (
    <Box
      mt={2}
      p={2}
      style={{ background: 'var(--ab-color-primary)', borderRadius: 'var(--ab__border-radius)' }}
    >
      {props.functions[currentFunction].docs ? (
        props.functions[currentFunction].docs.map((doc, index) => (
          <Box key={index} mt={index === 0 ? 0 : 1}>
            {doc.type === 'paragraph' && doc.content}
            {doc.type === 'code' && (
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{doc.content}</pre>
            )}
          </Box>
        ))
      ) : (
        <Box>
          No docs for <b>{currentFunction}</b>
        </Box>
      )}
    </Box>
  ) : null;

  const dataTableEditor = (
    <FormLayout
      gridColumnGap="var(--ab-space-1)"
      gridRowGap="var(--ab-space-1)"
      sizes={['auto', '130px']}
      style={{ alignItems: 'stretch' }}
    >
      {props.columns.map(column => (
        <FormRow
          key={column.ColumnId}
          label={
            <EditorButton
              width="100%"
              height="100%"
              style={{ background: 'var(--ab-color-primary)', cursor: 'grab' }}
              data={`COL('${column.ColumnId}')`}
              textAreaRef={textAreaRef}
            >
              <Icon size="1rem" path={mdiDrag} style={{ marginRight: 'var(--ab-space-1)' }} />
              {column.FriendlyName}
            </EditorButton>
          }
        >
          {column.DataType === 'Number' ? (
            <Input
              type="number"
              value={data[column.ColumnId]}
              onChange={(e: React.FormEvent) =>
                setData({ ...data, [column.ColumnId]: (e.target as HTMLInputElement).value })
              }
              width="100%"
            />
          ) : column.DataType === 'String' ? (
            <Input
              type="text"
              value={data[column.ColumnId]}
              onChange={(e: React.FormEvent) =>
                setData({ ...data, [column.ColumnId]: (e.target as HTMLInputElement).value })
              }
              width="100%"
            />
          ) : column.DataType === 'Date' ? (
            <Input
              type="date"
              value={data[column.ColumnId].toISOString().substr(0, 10)}
              onChange={(e: React.FormEvent) => {
                setData({
                  ...data,
                  [column.ColumnId]: new Date((e.target as HTMLInputElement).value),
                });
              }}
              width="100%"
            />
          ) : column.DataType === 'Boolean' ? (
            <CheckBox
              checked={data[column.ColumnId]}
              onChange={checked => setData({ ...data, [column.ColumnId]: checked })}
            />
          ) : null}
        </FormRow>
      ))}
    </FormLayout>
  );

  return (
    <Flex flexDirection="row" style={{ fontSize: 'var(--ab-font-size-2)' }}>
      <Box flex={1} mx={2}>
        <Flex
          mb={2}
          p={2}
          style={{
            background: 'var(--ab-color-primarylight)',
            borderRadius: 'var(--ab__border-radius)',
          }}
        >
          {functionsDropdown}
          {operatorButtons}
        </Flex>
        <Textarea
          ref={textAreaRefCallback}
          value={props.value}
          placeholder="Enter expression"
          autoFocus
          spellCheck="false"
          onChange={props.onChange}
          style={{
            width: '100%',
            height: '100px',
            fontFamily: 'monospace',
            fontSize: '1rem',
            padding: 'var(--ab-space-2)',
          }}
        />
        {error && <ErrorBox mt={2}>{error.message}</ErrorBox>}
        {result !== undefined && (
          <Box
            mt={1}
            p={2}
            style={{
              background: 'var(--ab-color-primarylight)',
              borderRadius: 'var(--ab__border-radius)',
            }}
          >
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
              Result: <b>{JSON.stringify(result)}</b>
            </pre>
          </Box>
        )}
        {functionDocs}
      </Box>
      <Box height={450} style={{ overflowY: 'auto', paddingRight: 'var(--ab-space-2)' }}>
        <Box
          mb={1}
          p={2}
          style={{
            background: 'var(--ab-color-primarylight)',
            borderRadius: 'var(--ab__border-radius)',
          }}
        >
          This is just test data
        </Box>
        {dataTableEditor}
      </Box>
    </Flex>
  );
}

export default ExpressionEditor;
