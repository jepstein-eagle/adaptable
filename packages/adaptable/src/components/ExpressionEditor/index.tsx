import * as React from 'react';
import { AdaptableColumn, AdaptableApi } from '../../types';

import { FunctionMap } from '../../parser/src/types';
import useSelectionRange from '../utils/useSelectionRange';
import { useState } from 'react';
import * as parser from '../../parser/src';
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
import HelpBlock from '../HelpBlock';

interface ExpressionEditorProps {
  value: string;
  onChange: (event: React.FormEvent) => void;
  initialData: { [key: string]: any };
  columns: AdaptableColumn[];
  functions: FunctionMap;
  hideHelpBlock?: boolean;
  isFullExpression?: boolean;
  api: AdaptableApi;
}

function ExpressionEditor(props: ExpressionEditorProps) {
  const [textAreaRefCallback, textAreaRef, selectionStart, selectionEnd] = useSelectionRange();
  const cursor = selectionStart === selectionEnd ? selectionStart : null;
  const [data, setData] = useState(props.initialData);
  let result, error, currentFunction;

  try {
    const expr = parser.parse(props.value || '');
    result = expr.evaluate({ node: { data } as any, api: props.api });
    const path = parser.findPathTo(expr.ast, cursor);
    currentFunction = path[0] ? path[0].type : null;
  } catch (e) {
    error = e;
  }

  const functionsDropdown = (
    <OverlayTrigger
      render={() => (
        <Flex
          flexDirection="column"
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
      <EditorButton data="IN" textAreaRef={textAreaRef}>
        IN
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
      className="ab-ExpressionEditor__columns"
      gridColumnGap="var(--ab-space-1)"
      gridRowGap="var(--ab-space-1)"
      sizes={['auto', '130px']}
      style={{ alignItems: 'stretch' }}
    >
      {props.columns
        .filter(c => !props.api.columnApi.isCalculatedColumn(c.ColumnId))
        .map(column => (
          <FormRow
            key={column.ColumnId}
            label={
              <EditorButton
                width="100%"
                height="100%"
                style={{ background: 'var(--ab-color-primary)', cursor: 'grab' }}
                data={`[${column.ColumnId}]`}
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
                  setData({
                    ...data,
                    [column.ColumnId]: Number((e.target as HTMLInputElement).value),
                  })
                }
                width="100%"
                disabled={column.ReadOnly}
              />
            ) : column.DataType === 'String' ? (
              <Input
                type="text"
                value={data[column.ColumnId]}
                onChange={(e: React.FormEvent) =>
                  setData({ ...data, [column.ColumnId]: (e.target as HTMLInputElement).value })
                }
                width="100%"
                disabled={column.ReadOnly}
              />
            ) : column.DataType === 'Date' ? (
              <Input
                type="date"
                value={new Date(data[column.ColumnId]).toISOString().substr(0, 10)}
                onChange={(e: React.FormEvent) => {
                  setData({
                    ...data,
                    [column.ColumnId]: new Date((e.target as HTMLInputElement).value),
                  });
                }}
                width="100%"
                disabled={column.ReadOnly}
              />
            ) : column.DataType === 'Boolean' ? (
              <CheckBox
                checked={data[column.ColumnId]}
                onChange={checked => setData({ ...data, [column.ColumnId]: checked })}
                disabled={column.ReadOnly}
              />
            ) : null}
          </FormRow>
        ))}
    </FormLayout>
  );

  return (
    <div>
      {' '}
      {props.hideHelpBlock !== true && (
        <HelpBlock margin={2} mb={2} p={2} style={{ fontSize: 'var(--ab-font-size-3)' }}>
          Create an Expression using a mixture (and any number) of:
          <ul>
            <li>Functions: Select from the functions dropdown or pick one displayed below</li>
            <li>
              Columns: Drag n Drop columns from the right hand side - they will resolve to
              '[column-name]'
            </li>
            <li>Static Values: Add any hardcoded values that you require for the Expression.</li>{' '}
          </ul>
          The Expression result is displayed underneath the Editor (using Test Data taken from first
          row). <br />
        </HelpBlock>
      )}{' '}
      <Flex flexDirection="row" style={{ fontSize: 'var(--ab-font-size-2)' }}>
        <Box flex={1} mx={2}>
          <Flex
            data-name="expression-toolbar"
            mb={2}
            p={2}
            style={
              {
                background: 'var(--ab-color-primarylight)',
                borderRadius: 'var(--ab__border-radius)',
                '--ab-overlay-horizontal-align': 'left',
              } as React.CSSProperties
            }
          >
            {functionsDropdown}
            {operatorButtons}
          </Flex>
          <Textarea
            ref={textAreaRefCallback}
            value={props.value || ''}
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
          />{' '}
          {props.isFullExpression !== true && (
            <HelpBlock margin={2} mb={2} p={2} style={{ fontSize: 'var(--ab-font-size-3)' }}>
              Expression must resolve to a <b>boolean </b>(i.e. true / false) value
            </HelpBlock>
          )}
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
            Test Data
          </Box>
          {dataTableEditor}
        </Box>
      </Flex>
    </div>
  );
}

export default ExpressionEditor;
