import * as React from 'react';
import { AdaptableColumn, AdaptableApi } from '../../types';
import { FunctionMap } from '../../parser/src/types';
import useSelectionRange from '../utils/useSelectionRange';
import { useState } from 'react';
import * as parser from '../../parser/src';
import OverlayTrigger from '../OverlayTrigger';
import { Flex, Box } from 'rebass';
import EditorButton from './EditorButton';
import Textarea from '../Textarea';
import FormLayout, { FormRow } from '../FormLayout';
import Input from '../Input';
import CheckBox from '../CheckBox';
import ErrorBox from '../ErrorBox';
import HelpBlock from '../HelpBlock';
import { ButtonFunction } from '../../View/Components/Buttons/ButtonFunction';
import SimpleButton from '../SimpleButton';

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
  const [showColumnIds, setShowColumnIds] = useState(false);
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
      <SimpleButton icon="function" mr={1}></SimpleButton>
    </OverlayTrigger>
  );

  const operatorButtons = (
    <>
      <EditorButton data="+" textAreaRef={textAreaRef} icon="plus" />
      <EditorButton data="-" textAreaRef={textAreaRef} icon="minus" />
      <EditorButton data="*" textAreaRef={textAreaRef} icon="multiplication" />
      <EditorButton data="/" textAreaRef={textAreaRef} icon="division" />
      <EditorButton data="%" textAreaRef={textAreaRef} icon="percent" />
      <EditorButton data="^" textAreaRef={textAreaRef} icon="exponent" />
      <EditorButton data="=" textAreaRef={textAreaRef} icon="equal" />
      <EditorButton data="!=" textAreaRef={textAreaRef} icon="not-equal" />
      <EditorButton data="<" textAreaRef={textAreaRef} icon="less-than" />
      <EditorButton data=">" textAreaRef={textAreaRef} icon="greater-than" />
      <EditorButton data="<=" textAreaRef={textAreaRef} icon={'less-than-or-equal'} />
      <EditorButton data=">=" textAreaRef={textAreaRef} icon={'greater-than-or-equal'} />
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
                style={{
                  background: 'var(--ab-color-primary)',
                  cursor: 'grab',
                  marginRight: 'var(--ab-space-1)',
                }}
                data={`[${column.ColumnId}]`}
                data-name="column"
                textAreaRef={textAreaRef}
                icon="drag"
              >
                <Flex flexDirection="column" alignItems="start">
                  {showColumnIds ? `[${column.ColumnId}]` : column.FriendlyName}
                </Flex>
              </EditorButton>
            }
          >
            {column.DataType === 'Number' ? (
              <Input
                type="number"
                data-name="column-input"
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
                data-name="column-input"
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
                data-name="column-input"
                value={
                  data[column.ColumnId]
                    ? new Date(data[column.ColumnId]).toISOString().substr(0, 10)
                    : ''
                }
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
                data-name="column-input"
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
    <Flex flex={1} style={{ overflow: 'auto' }} flexDirection="column">
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
      )}
      <Flex flex={1} flexDirection="row" style={{ fontSize: 'var(--ab-font-size-2)' }}>
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
            className="ab-ExpressionEditor__textarea"
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
          {props.isFullExpression !== true && (
            <HelpBlock mt={2} mb={2} p={2} style={{ fontSize: 'var(--ab-font-size-3)' }}>
              This Expression must resolve to a <b>boolean </b>(i.e. true / false) value
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
                Result (using Test Data): <b>{JSON.stringify(result)}</b>
              </pre>
            </Box>
          )}
          {functionDocs}
        </Box>
        <Box mb={2} style={{ overflowY: 'auto', paddingRight: 'var(--ab-space-2)' }}>
          <Box
            mb={1}
            p={2}
            backgroundColor="primarylight"
            style={{
              borderRadius: 'var(--ab__border-radius)',
            }}
          >
            Test Data
            <CheckBox
              checked={showColumnIds}
              onChange={checked => setShowColumnIds(checked)}
              style={{ float: 'right', margin: 0 }}
            >
              Show Column IDs
            </CheckBox>
          </Box>
          {dataTableEditor}
        </Box>
      </Flex>
    </Flex>
  );
}

export default ExpressionEditor;
