import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';
import ErrorBox from '../../../components/ErrorBox';
import Textarea from '../../../components/Textarea';
import WizardPanel from '../../../components/WizardPanel';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import Input from '../../../components/Input';
import { Box, Flex } from 'rebass';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import CheckBox from '../../../components/CheckBox';
import { CalculatedColumnExpressionService } from '../../../Utilities/Services/CalculatedColumnExpressionService';
import { ICalculatedColumnExpressionService } from '../../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { AdaptableColumn } from '../../../types';
import calculatedColumn from '../../../components/icons/calculated-column';
import { evaluate, defaultFunctions, parse, findPathTo } from 'adaptable-parser';
import useSelectionRange from '../../../components/utils/useSelectionRange';
import { Dispatch, SetStateAction, useState } from 'react';
import useProperty from '../../../components/utils/useProperty';
import SimpleButton, { SimpleButtonProps } from '../../../components/SimpleButton';
import Icon from '@mdi/react';
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
} from '@mdi/js';
import { FunctionMap } from 'adaptable-parser/src/types';

export interface CalculatedColumnExpressionWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
  calculatedColumnExpressionService: ICalculatedColumnExpressionService;
}
export interface CalculatedColumnExpressionWizardState {
  ColumnExpression: string;
}

const dragImage = new Image(0, 0);
dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

interface EditorButtonProps extends SimpleButtonProps {
  data: string;
  textAreaRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>;
}
function EditorButton(props: EditorButtonProps) {
  return (
    <SimpleButton
      draggable={true}
      onDragStart={event => {
        document.getSelection().empty();
        event.dataTransfer.setData('text', props.data);
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }}
      onClick={() => {
        props.textAreaRef.current.focus();
        document.execCommand('insertText', false, props.data);
      }}
      style={{
        cursor: 'grab',
      }}
      {...props}
    />
  );
}

interface ExpressionEditorProps {
  value?: string;
  onChange?: (event: React.FormEvent) => void;
  firstRow: { [key: string]: any };
  columns: AdaptableColumn[];
  functions: FunctionMap;
}
function ExpressionEditor(props: ExpressionEditorProps) {
  const [textAreaRefCallback, textAreaRef, selectionStart, selectionEnd] = useSelectionRange();
  const cursor = selectionStart === selectionEnd ? selectionStart : null;
  const [data, setData] = useState(props.firstRow);
  let result, currentFunction;

  try {
    const expr = parse(props.value);
    result = expr.evaluate({ data });
    const path = findPathTo(expr.ast, cursor);
    currentFunction = path[0] ? path[0].type : null;
  } catch (error) {
    result = 'Error: ' + error.message;
  }

  return (
    <Flex flexDirection="row">
      <Box flex={1} mr={2}>
        <Box mb={2}>
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
          <EditorButton data="AND" textAreaRef={textAreaRef}>
            AND
          </EditorButton>
          <EditorButton data="OR" textAreaRef={textAreaRef}>
            OR
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
        </Box>
        <Box mb={2}>
          {Object.keys(props.functions).map(functionName =>
            props.functions[functionName].hidden ? null : (
              <EditorButton data={`${functionName}()`} textAreaRef={textAreaRef} key={functionName}>
                {functionName}
              </EditorButton>
            )
          )}
        </Box>
        <Textarea
          ref={textAreaRefCallback}
          value={props.value}
          placeholder="Enter expression"
          autoFocus
          spellCheck="false"
          onChange={props.onChange}
          style={{ width: '100%', height: '100px', fontFamily: 'monospace', fontSize: '1rem' }}
        />
        {currentFunction ? (
          props.functions[currentFunction].docs ? (
            props.functions[currentFunction].docs.map((doc, index) =>
              doc.type === 'code' ? (
                <code key={index}>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{doc.content}</pre>
                </code>
              ) : doc.type === 'paragraph' ? (
                <p key={index}>{doc.content}</p>
              ) : null
            )
          ) : (
            <p>
              No docs for <b>{currentFunction}</b>
            </p>
          )
        ) : null}
        <pre style={{ whiteSpace: 'pre-wrap' }}>Result: {JSON.stringify(result)}</pre>
      </Box>
      <Box height={430} style={{ overflowY: 'auto' }}>
        <FormLayout gridColumnGap="0" gridRowGap="0">
          {props.columns.map(column => (
            <FormRow
              key={column.ColumnId}
              label={
                <EditorButton
                  data={`COL('${column.ColumnId}')`}
                  textAreaRef={textAreaRef}
                  width="100%"
                >
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
      </Box>
    </Flex>
  );
}

export class CalculatedColumnExpressionWizard
  extends React.Component<
    CalculatedColumnExpressionWizardProps,
    CalculatedColumnExpressionWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnExpressionWizardProps) {
    super(props);
    this.state = { ColumnExpression: this.props.Data.ColumnExpression };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(
      this.props.GetErrorMessage()
    )
      ? null
      : 'error';

    const firstRow = this.props.Adaptable.getFirstRowNode().data;

    return (
      <Flex p={2}>
        <Box flex={1}>
          <ExpressionEditor
            value={this.state.ColumnExpression}
            onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
            firstRow={firstRow}
            columns={this.props.Columns}
            functions={defaultFunctions}
          />
          {/* {validationState ? (
            <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox>
          ) : null} */}
        </Box>
      </Flex>
    );
  }

  handleExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.IsExpressionValid(e.value);
    this.setState({ ColumnExpression: e.value }, () => this.props.UpdateGoBackState());
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression) &&
      StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage())
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    const hasChanged: boolean = this.props.Data.ColumnExpression != this.state.ColumnExpression;
    this.props.Data.ColumnExpression = this.state.ColumnExpression;

    // if its changed then lets work out the other values based on it
    if (hasChanged) {
      // workd out the correct datatype if possible
      const cleanedExpression: string = this.props.calculatedColumnExpressionService.CleanExpressionColumnNames(
        this.state.ColumnExpression,
        this.props.Columns
      );

      const dataType = this.props.calculatedColumnExpressionService.GetCalculatedColumnDataType(
        cleanedExpression
      );

      const pivotable: boolean = dataType == DataType.String;
      const aggregatable: boolean = dataType == DataType.Number;

      this.props.Data.CalculatedColumnSettings.DataType = dataType;
      this.props.Data.CalculatedColumnSettings.Pivotable = pivotable;
      this.props.Data.CalculatedColumnSettings.Aggregatable = aggregatable;
    }
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
